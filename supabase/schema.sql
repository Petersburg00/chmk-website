-- =============================================================
-- CHMK Web Sitesi - Supabase Semasi
-- Supabase Dashboard > SQL Editor'de bu dosyanin tamamini calistirin.
-- =============================================================

-- ETKINLIKLER ---------------------------------------------------
create table if not exists public.etkinlikler (
  id          uuid primary key default gen_random_uuid(),
  baslik_tr   text not null,
  baslik_en   text not null default '',
  aciklama_tr text not null default '',
  aciklama_en text not null default '',
  tarih       timestamptz not null,
  konum       text,
  poster_url  text,
  link        text,
  yayinda     boolean not null default true,
  created_at  timestamptz not null default now()
);

-- DUYURULAR -----------------------------------------------------
create table if not exists public.duyurular (
  id         uuid primary key default gen_random_uuid(),
  baslik_tr  text not null,
  baslik_en  text not null default '',
  icerik_tr  text not null default '',
  icerik_en  text not null default '',
  tarih      timestamptz not null,
  created_at timestamptz not null default now()
);

-- UYELIK BASVURULARI -------------------------------------------
create table if not exists public.uyelik_basvurulari (
  id         uuid primary key default gen_random_uuid(),
  ad_soyad   text not null,
  ogrenci_no text not null,
  bolum      text not null,
  sinif      text not null,
  eposta     text not null,
  telefon    text not null,
  motivasyon text,
  kvkk_onay  boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS -----------------------------------------------------------
alter table public.etkinlikler        enable row level security;
alter table public.duyurular          enable row level security;
alter table public.uyelik_basvurulari enable row level security;

-- Ziyaretciler sadece yayindaki etkinlikleri gorur
create policy "anon yayindaki etkinlikleri okur"
  on public.etkinlikler for select
  to anon
  using (yayinda = true);

-- Ziyaretciler tum duyurulari gorur
create policy "anon duyurulari okur"
  on public.duyurular for select
  to anon
  using (true);

-- Ziyaretciler sadece basvuru ekleyebilir (KVKK onayi zorunlu), okuyamaz
create policy "anon basvuru ekler"
  on public.uyelik_basvurulari for insert
  to anon
  with check (kvkk_onay = true);

-- Giris yapmis yoneticiler her seye tam erisir
create policy "auth etkinlikler tam erisim"
  on public.etkinlikler for all
  to authenticated
  using (true) with check (true);

create policy "auth duyurular tam erisim"
  on public.duyurular for all
  to authenticated
  using (true) with check (true);

create policy "auth basvurular tam erisim"
  on public.uyelik_basvurulari for all
  to authenticated
  using (true) with check (true);

-- POSTER DEPOSU (Storage) ---------------------------------------
insert into storage.buckets (id, name, public)
values ('posters', 'posters', true)
on conflict (id) do nothing;

create policy "posterler herkese acik okunur"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'posters');

create policy "yoneticiler poster yukler"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'posters');

create policy "yoneticiler poster siler"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'posters');
