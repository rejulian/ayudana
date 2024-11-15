# Ayudana
Aplicación para ayudar a los voluntarios a encontrar alojamiento y asi ayudar en las zonas afectadas por la DANA en España.

## Instalación


```bash
npm install

npm run dev
```

Modifica el archivo `env.example` por `env.local` y cambia los valores de las variables por tus credenciales de [Supabase](https://supabase.com/).

Crea las tablas profile y accommodations :

```sql
create table
  public.profiles (
    id uuid not null references auth.users on delete cascade,
    full_name text,
    email text unique,
    avatar_url text,
    primary key (id)
  );

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for insert
with
  check (auth.uid () = id);

create policy "Users can update own profile." on profiles
for update
  using (auth.uid () = id);

create function public.handle_new_user () returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'email'
    );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();
```

```sql
CREATE TABLE accommodations (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    contact TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access"
ON accommodations FOR SELECT
USING (true);

-- Create a policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert"
ON accommodations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create a policy to allow authenticated users to delete their own accommodation
CREATE POLICY "Enable delete for users based on user_id"
on accommodations
as PERMISSIVE
for DELETE
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);
```