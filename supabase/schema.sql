-- Estudio de Mateo — esquema de base de datos
-- Ejecutar en el SQL Editor de Supabase (o via `supabase db query < supabase/schema.sql`).
--
-- Tablas:
--   usuarios  -> perfil publico ligado 1:1 a auth.users
--   notas     -> notas personales por capitulo/versiculo
--   progreso  -> checklist de capitulos leidos

-- ============================================================
-- usuarios
-- ============================================================

create table if not exists public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  nombre text,
  created_at timestamptz not null default now()
);

alter table public.usuarios enable row level security;

create policy "usuarios: select propio"
on public.usuarios for select
to authenticated
using ((select auth.uid()) = id);

create policy "usuarios: update propio"
on public.usuarios for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- Crea automaticamente el perfil cuando se registra un usuario nuevo en auth.users.
-- security definer es necesario porque el trigger corre como supabase_auth_admin,
-- que no tiene permiso de insert sobre public.usuarios. Se revoca el execute
-- directo para que solo pueda dispararse desde el trigger, no ser llamada como API.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.usuarios (id, email, nombre)
  values (new.id, new.email, new.raw_user_meta_data ->> 'nombre');
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- helper: mantiene updated_at al dia
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- notas
-- ============================================================

create table if not exists public.notas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios (id) on delete cascade,
  capitulo integer not null check (capitulo between 1 and 28),
  versiculo integer check (versiculo is null or versiculo > 0),
  contenido text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notas_usuario_capitulo_idx
  on public.notas (usuario_id, capitulo);

alter table public.notas enable row level security;

drop trigger if exists notas_set_updated_at on public.notas;
create trigger notas_set_updated_at
  before update on public.notas
  for each row execute function public.set_updated_at();

create policy "notas: select propias"
on public.notas for select
to authenticated
using ((select auth.uid()) = usuario_id);

create policy "notas: insert propias"
on public.notas for insert
to authenticated
with check ((select auth.uid()) = usuario_id);

create policy "notas: update propias"
on public.notas for update
to authenticated
using ((select auth.uid()) = usuario_id)
with check ((select auth.uid()) = usuario_id);

create policy "notas: delete propias"
on public.notas for delete
to authenticated
using ((select auth.uid()) = usuario_id);

-- ============================================================
-- progreso
-- ============================================================

create table if not exists public.progreso (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios (id) on delete cascade,
  capitulo integer not null check (capitulo between 1 and 28),
  completado boolean not null default true,
  completado_en timestamptz not null default now(),
  unique (usuario_id, capitulo)
);

alter table public.progreso enable row level security;

create policy "progreso: select propio"
on public.progreso for select
to authenticated
using ((select auth.uid()) = usuario_id);

create policy "progreso: insert propio"
on public.progreso for insert
to authenticated
with check ((select auth.uid()) = usuario_id);

create policy "progreso: update propio"
on public.progreso for update
to authenticated
using ((select auth.uid()) = usuario_id)
with check ((select auth.uid()) = usuario_id);

create policy "progreso: delete propio"
on public.progreso for delete
to authenticated
using ((select auth.uid()) = usuario_id);

-- ============================================================
-- grants (necesario para exponer las tablas via Data API a `authenticated`)
-- ============================================================

grant select, update on public.usuarios to authenticated;
grant select, insert, update, delete on public.notas to authenticated;
grant select, insert, update, delete on public.progreso to authenticated;
