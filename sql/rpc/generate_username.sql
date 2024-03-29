-- SQL Editor > New query
-- select generate_username('username@example.com');

drop function if exists generate_username;

create or replace function generate_username(email text)
returns text language plpgsql
security definer
as $$
declare
  new_username text;
  username_exists boolean;
begin
  -- generate username based on email address
  new_username := lower(split_part(email, '@', 1));

  -- check if username already exists in accounts table
  select exists(select 1 from accounts where username = new_username) into username_exists;

  -- increase username length gradually if needed
  while username_exists loop
    new_username := new_username || '_' || to_char(trunc(random()*1000000), 'fm000000');
    select exists(select 1 from accounts where username = new_username) into username_exists;
  end loop;

  return new_username;
end;
$$;
