-- Flowmark tasks table + owner-only RLS (docs 53–57 intent)

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 500),
  description text not null default '' check (char_length(description) <= 4000),
  status text not null default 'inbox'
    check (status in ('inbox', 'todo', 'in_progress', 'completed', 'cancelled')),
  priority text not null default 'none'
    check (priority in ('none', 'low', 'medium', 'high')),
  due_date date,
  due_time time,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  deleted_at timestamptz,
  constraint due_time_requires_date check (due_time is null or due_date is not null)
);

create index if not exists tasks_owner_deleted_idx on public.tasks (owner_id, deleted_at);

alter table public.tasks enable row level security;

drop policy if exists tasks_select_own on public.tasks;
create policy tasks_select_own on public.tasks
  for select to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists tasks_insert_own on public.tasks;
create policy tasks_insert_own on public.tasks
  for insert to authenticated
  with check (owner_id = (select auth.uid()));

drop policy if exists tasks_update_own on public.tasks;
create policy tasks_update_own on public.tasks
  for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists tasks_delete_own on public.tasks;
create policy tasks_delete_own on public.tasks
  for delete to authenticated
  using (owner_id = (select auth.uid()));
