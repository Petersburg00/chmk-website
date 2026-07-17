# CHMK Web Sitesi

İTÜ Cevher Hazırlama Mühendisliği Kulübü'nün resmi web sitesi.

**Teknolojiler:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (TR/EN) · Supabase · Framer Motion

## Özellikler

- Karanlık tema varsayılan, açık/karanlık geçişi
- Türkçe varsayılan, İngilizce çevirisi hazır (`/en`)
- Tam ekran menü, kaydırmalı vitrin (carousel), logo açılış ekranı
- Sayfalar: Ana Sayfa, Hakkımızda, Ekip, Etkinlikler, Medya, Üye Ol, İletişim
- Yönetim paneli (`/admin`): etkinlik ve duyuru ekleme/düzenleme, üyelik başvurularını görüntüleme ve CSV indirme
- Üyelik formu KVKK onayıyla doğrudan Supabase'e kaydolur

## Kurulum

### 1. Bağımlılıklar

```bash
npm install
npm run dev   # http://localhost:3000
```

Supabase ayarlanmadan da site çalışır; etkinlik listeleri boş görünür, formlar uyarı verir.

### 2. Supabase projesi

1. [supabase.com](https://supabase.com) üzerinde yeni proje oluşturun.
2. **SQL Editor**'e gidin, `supabase/schema.sql` dosyasının tamamını yapıştırıp çalıştırın. Bu; tabloları (`etkinlikler`, `duyurular`, `uyelik_basvurulari`), güvenlik kurallarını (RLS) ve `posters` depolama alanını oluşturur.
3. **Project Settings > API**'den `Project URL` ve `anon public` anahtarını kopyalayın.

### 3. Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın ve doldurun:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://chmk.example.com
```

### 4. Yönetici hesabı

1. Supabase Dashboard > **Authentication > Users > Add user**.
2. E-posta ve şifre girin, "Auto Confirm User" işaretleyin.
3. `/admin/login` adresinden bu bilgilerle giriş yapın.

Kayıt (sign-up) tamamen kapalıdır; yöneticiler yalnızca Dashboard'dan eklenir.

### 5. Vercel'e yayınlama

1. Projeyi GitHub'a itin.
2. [vercel.com](https://vercel.com) > New Project > depoyu seçin.
3. Environment Variables bölümüne `.env.local` içeriğini ekleyin.
4. Deploy. Alan adınızı bağladıktan sonra `NEXT_PUBLIC_SITE_URL` değerini güncelleyin.

## İçerik değiştirme listesi (yayına almadan önce)

| Ne | Nerede |
|---|---|
| İletişim e-postası, sosyal medya linkleri, YouTube kanal + öne çıkan video ID, kuruluş yılı | `src/lib/site-config.ts` |
| Hero ve carousel görselleri (şu an üretilmiş yer tutucular) | `public/images/hero.jpg`, `carousel-1.jpg`, `carousel-2.jpg` |
| Ekip fotoğrafları ve LinkedIn linkleri | `src/data/team.ts` (`photo` alanına `/images/team/isim.jpg` gibi yol verin) |
| Hakkımızda, misyon, vizyon, tarihçe, KVKK metinleri | `messages/tr.json` ve `messages/en.json` |
| Logo / favicon | `public/images/logo.png`, `src/app/icon.png` |

Notlar:

- **KVKK metni** (`join.kvkkText`) yer tutucudur; yayına almadan önce kulüp danışmanı veya hukuk birimiyle gözden geçirin.
- CSV dışa aktarma `;` ayracı ve BOM kullanır; Türkçe Excel'de doğru açılır.
- İletişim formu arka uç gerektirmez, `mailto:` ile e-posta uygulamasını açar.
- Beyaz zeminli logo koyu temada "chip" içinde gösterilir. Şeffaf/koyu zemin varyantınız varsa `Header.tsx` ve `Footer.tsx` içindeki `logo-chip` sarmalayıcısını kaldırabilirsiniz.

## Komutlar

```bash
npm run dev     # gelistirme
npm run build   # uretim derlemesi
npm run start   # uretim sunucusu
npm run lint    # lint
```
