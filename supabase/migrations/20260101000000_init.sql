-- ===================================================================
-- Nexus AI — initial schema
--
-- Provides the minimum tables, RLS, and triggers for the marketing
-- site + client dashboard to operate against Supabase.
--
-- Apply with the Supabase CLI:
--   supabase db push
-- Or paste into the SQL editor.
-- ===================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------
-- Profiles
-- One row per auth.users row, created automatically on sign-up.
-- -------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique,
  full_name   text,
  avatar_url  text,
  role        text not null default 'member' check (role in ('member', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles read self" on public.profiles;
create policy "profiles read self" on public.profiles
  for select using (auth.uid() = id or role = 'admin');

drop policy if exists "profiles update self" on public.profiles;
create policy "profiles update self" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles read admin" on public.profiles;
create policy "profiles read admin" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Trigger: provision a profile when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- -------------------------------------------------------------------
-- Projects + memberships
-- -------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  description text,
  status      text not null default 'planning'
              check (status in ('planning', 'in_progress', 'review', 'completed', 'archived')),
  progress    int  not null default 0 check (progress between 0 and 100),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_owner_id_idx on public.projects(owner_id);
create index if not exists projects_status_idx   on public.projects(status);

alter table public.projects enable row level security;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create table if not exists public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  role       text not null default 'viewer'
             check (role in ('owner', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

alter table public.project_members enable row level security;

-- RLS — project visibility:
--   * owner sees their projects
--   * any member sees the project they are a member of
--   * admins see everything
drop policy if exists "projects read" on public.projects;
create policy "projects read" on public.projects
  for select using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.project_members m
      where m.project_id = projects.id and m.user_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "projects insert" on public.projects;
create policy "projects insert" on public.projects
  for insert with check (owner_id = auth.uid());

drop policy if exists "projects update" on public.projects;
create policy "projects update" on public.projects
  for update using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.project_members m
      where m.project_id = projects.id and m.user_id = auth.uid() and m.role in ('owner','editor')
    )
  );

drop policy if exists "projects delete" on public.projects;
create policy "projects delete" on public.projects
  for delete using (owner_id = auth.uid());

drop policy if exists "project_members read" on public.project_members;
create policy "project_members read" on public.project_members
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.projects p where p.id = project_members.project_id and p.owner_id = auth.uid()
    )
  );

drop policy if exists "project_members write" on public.project_members;
create policy "project_members write" on public.project_members
  for all using (
    exists (
      select 1 from public.projects p where p.id = project_members.project_id and p.owner_id = auth.uid()
    )
  );

-- -------------------------------------------------------------------
-- Activity log
-- -------------------------------------------------------------------
create table if not exists public.project_activity (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  actor_id    uuid references public.profiles(id) on delete set null,
  action      text not null,
  payload     jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists project_activity_project_id_idx on public.project_activity(project_id, created_at desc);

alter table public.project_activity enable row level security;

drop policy if exists "activity read" on public.project_activity;
create policy "activity read" on public.project_activity
  for select using (
    exists (
      select 1 from public.projects p
      where p.id = project_activity.project_id and (
        p.owner_id = auth.uid()
        or exists (
          select 1 from public.project_members m
          where m.project_id = p.id and m.user_id = auth.uid()
        )
      )
    )
  );

-- -------------------------------------------------------------------
-- Newsletter signups (used by /api/newsletter when Resend is absent)
-- -------------------------------------------------------------------
create table if not exists public.newsletter_signups (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  source     text,
  ip_hash    text,
  created_at timestamptz not null default now()
);

-- Write-only for anon users; no read access.
alter table public.newsletter_signups enable row level security;

drop policy if exists "newsletter insert anon" on public.newsletter_signups;
create policy "newsletter insert anon" on public.newsletter_signups
  for insert with check (true);

-- -------------------------------------------------------------------
-- Seed admin (idempotent)
-- -------------------------------------------------------------------
-- Promote the first user to admin so the dashboard has someone with access.
-- This is intentionally permissive only on a fresh DB; subsequent users will
-- inherit the default 'member' role.
do $$
declare
  v_count int;
begin
  select count(*) into v_count from public.profiles;
  if v_count = 1 then
    update public.profiles set role = 'admin';
  end if;
end $$;
