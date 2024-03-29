-- SQL Editor > New query
-- https://supabase.com/docs/guides/auth/managing-user-data

drop table if exists profiles;

create table profiles (
  id uuid not null references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  username varchar(255) not null references accounts (username) on update cascade,
  email varchar(255),
  name text,
  avatar_url text,
  bio text
);

-- Secure the table
alter table profiles enable row level security;

-- Add row-level security
create policy "Public profiles are viewable by everyone." on profiles for select to authenticated, anon using ( true );
-- create policy "Users can insert their own profile." on profiles for insert to authenticated with check ( auth.uid() = id );
create policy "Users can update their own profile." on profiles for update to authenticated using ( auth.uid() = id );
-- create policy "Users can delete their own profile." on profiles for delete to authenticated using ( auth.uid() = id );

-- Update a column timestamp on every update.
create extension if not exists moddatetime schema extensions;

-- assuming the table name is "profiles", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
drop trigger if exists handle_updated_at on profiles;

create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);
