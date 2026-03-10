-- Auto-create profile on user signup with admin role for specific email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    -- Admin role for Alex@techtideai.io, user role for everyone else
    case 
      when lower(new.email) = 'alex@techtideai.io' then 'admin'
      else 'user'
    end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop existing trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
