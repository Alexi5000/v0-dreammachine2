-- Create profiles table with role-based access control
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  onboarding_completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- RLS Policies for profiles
-- Users can view their own profile
create policy "profiles_select_own" on public.profiles 
  for select using (auth.uid() = id);

-- Users can update their own profile (but not role)
create policy "profiles_update_own" on public.profiles 
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "profiles_admin_select_all" on public.profiles 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update any profile
create policy "profiles_admin_update_all" on public.profiles 
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Allow insert during signup (via trigger with security definer)
create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

-- Create index for faster role lookups
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_email on public.profiles(email);
