-- SQL Editor > New query

drop table if exists posts;
drop function if exists count_posts;

create table posts (
  id bigint generated by default as identity primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  published_at timestamptz,
  user_id uuid references users(id) on delete cascade,
  profile_id uuid references profiles(id),
  post_type text default 'post'::text,
  status text default 'draft'::text,
  password varchar(255),
  slug text,
  title text,
  content text,
  excerpt text,
  thumbnail_url text,
  views integer default 0,
  is_ban boolean default false,
  banned_until timestamptz,
  metadata jsonb,
  unique(user_id, slug)
);
comment on column posts.post_type is 'post, revision';
comment on column posts.status is 'publish, future, draft, pending, private, trash';

-- Index the table
create index posts_slug_idx on posts using btree (slug);
create index posts_post_type_idx on public.posts using btree (post_type, status, created_at, id);

-- Secure the table
alter table posts enable row level security;

-- Add row-level security
create policy "Public posts are viewable by everyone." on posts for select to authenticated, anon using ( true );
create policy "Users can insert their own post." on posts for insert to authenticated with check ( auth.uid() = user_id );
create policy "Users can update their own post." on posts for update to authenticated using ( auth.uid() = user_id );
create policy "Users can delete their own post." on posts for delete to authenticated using ( auth.uid() = user_id );

-- Update a column timestamp on every update.
create extension if not exists moddatetime schema extensions;

-- assuming the table name is "posts", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
drop trigger if exists handle_updated_at on posts;

create trigger handle_updated_at before update on posts
  for each row execute procedure moddatetime (updated_at);
