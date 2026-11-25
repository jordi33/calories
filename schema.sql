create table profiles (id text primary key, name text not null, goal int not null default 2500);
create table days (id text primary key, pid text not null, date date not null, items jsonb not null default '[]', w numeric);
alter table profiles enable row level security;
alter table days enable row level security;
create policy "open" on profiles for all using (true) with check (true);
create policy "open" on days for all using (true) with check (true);
alter publication supabase_realtime add table profiles, days;
insert into profiles values ('jordi','Jordi',2200),('lila','Lila',2000);
