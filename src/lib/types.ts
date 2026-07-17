export type Etkinlik = {
  id: string;
  baslik_tr: string;
  baslik_en: string;
  aciklama_tr: string;
  aciklama_en: string;
  tarih: string; // ISO
  konum: string;
  poster_url: string | null;
  link: string | null;
  yayinda: boolean;
  created_at: string;
};

export type Duyuru = {
  id: string;
  baslik_tr: string;
  baslik_en: string;
  icerik_tr: string;
  icerik_en: string;
  tarih: string;
  created_at: string;
};

export type Basvuru = {
  id: string;
  ad_soyad: string;
  ogrenci_no: string;
  bolum: string;
  sinif: string;
  eposta: string;
  telefon: string;
  motivasyon: string | null;
  kvkk_onay: boolean;
  created_at: string;
};
