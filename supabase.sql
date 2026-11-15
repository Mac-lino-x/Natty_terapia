create table if not exists acessos (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

create table if not exists pre_atendimento (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nome_cliente text not null,
  telefone text,
  tecnica_desejada text not null,
  nivel_dor int check (nivel_dor between 0 and 10),
  sintomas_queixas text,
  restricoes_medicas text,
  respostas_pre text,
  consentimento_lgpd boolean not null default false
);

create table if not exists avaliacoes (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nome_cliente text not null,
  tecnica text not null,
  nota_estrelas int check (nota_estrelas between 1 and 5),
  respostas_pos text,
  feedback text
);

alter table pre_atendimento add column if not exists consentimento_lgpd boolean not null default false;

alter table acessos         enable row level security;
alter table pre_atendimento enable row level security;
alter table avaliacoes      enable row level security;

drop policy if exists "anon insere" on acessos;
drop policy if exists "anon insere" on pre_atendimento;
drop policy if exists "anon insere" on avaliacoes;

create policy "anon insere" on acessos         for insert to anon with check (true);
create policy "anon insere" on pre_atendimento for insert to anon with check (consentimento_lgpd = true);
create policy "anon insere" on avaliacoes      for insert to anon with check (true);

drop policy if exists "admin le" on acessos;
drop policy if exists "admin le" on pre_atendimento;
drop policy if exists "admin le" on avaliacoes;

create policy "admin le" on acessos         for select to authenticated using (true);
create policy "admin le" on pre_atendimento for select to authenticated using (true);
create policy "admin le" on avaliacoes      for select to authenticated using (true);

alter publication supabase_realtime add table pre_atendimento;
alter publication supabase_realtime add table avaliacoes;