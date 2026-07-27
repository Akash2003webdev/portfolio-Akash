-- Run this in Supabase Dashboard -> SQL Editor

-- 1. Projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  tech text[] not null default '{}',
  live_url text,
  github_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone can view projects (public portfolio site)
create policy "Public can view projects"
  on public.projects for select
  using (true);

-- Only logged-in users (your admin) can insert/update/delete
create policy "Authenticated users can insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on public.projects for update
  to authenticated
  using (true);

create policy "Authenticated users can delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- 2. Storage bucket for project images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public can view project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Authenticated users can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

create policy "Authenticated users can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

create policy "Authenticated users can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
