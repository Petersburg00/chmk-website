# CHMK Sitesi Yönetim Rehberi

Bu rehber kod bilmeyen kulüp yöneticileri içindir. Her şey tarayıcıdan yapılır, hiçbir program kurulmaz.

## Sistem nasıl çalışıyor

- Sitenin kaynağı: github.com/Petersburg00/chmk-website
- GitHub'da yaptığın her Commit'ten sonra Vercel siteyi 1-2 dakika içinde otomatik yeniden yayınlar. Senin ekstra bir şey yapman gerekmez.
- Etkinlik, duyuru ve başvurular için kod gerekmez. Bunlar sitenin /admin panelinden yönetilir.

## Harita: hangi şey nerede

| Değiştirmek istediğin | Dosya veya yer |
|---|---|
| Sitedeki tüm Türkçe yazılar | messages/tr.json |
| İngilizce çeviriler | messages/en.json |
| Ekip üyeleri, roller, LinkedIn linkleri | src/data/team.ts |
| Ekip fotoğrafları | public/images/team/ klasörü |
| E-posta, sosyal medya linkleri, YouTube kanalı ve öne çıkan video | src/lib/site-config.ts |
| Arka plan görselleri | public/images/hero.jpg, carousel-1.jpg, carousel-2.jpg |
| Logo | public/images/logo-dark.png (açık zemin için), logo-light.png (koyu zemin için) |
| Sekme ikonu ve uygulama ikonları | public/ içindeki favicon*, android-chrome*, apple-touch-icon.png |
| Etkinlikler, duyurular, üyelik başvuruları | Kod değil: siteadresi/admin |

## GitHub'da dosya düzenlemenin genel yolu

1. Dosyaya tıkla, sağ üstteki kalem ikonuna bas (Edit this file).
2. Değişikliği yap.
3. Sağ üstte yeşil "Commit changes" butonuna bas, açılan pencerede tekrar "Commit changes".
4. 1-2 dakika bekle. Siteyi Ctrl+Shift+R ile yenile (önbelleği atlar).

## Metin değiştirme

Örnek: ana sayfadaki slogan.

1. messages/tr.json dosyasını aç, değiştirmek istediğin yazıyı Ctrl+F ile bul.
2. Sadece tırnak içindeki yazıyı değiştir. Tırnakları ve satır sonundaki virgülü silme.
3. Aynı değişikliğin İngilizcesini messages/en.json içinde yap.

Kural: bu dosyalarda her satır `"anahtar": "değer",` biçimindedir. Bir listenin son elemanında virgül olmaz. Yapıyı bozarsan site yayınlanmaz; çözümü aşağıda "Bir şey bozulursa" kısmında.

## Ekip: üye ekleme

src/data/team.ts dosyasında üyenin ait olduğu listeyi bul (leadership, board, audit veya advisor) ve listeye şu bloğu ekle:

```ts
{
  name: "Ad Soyad",
  roleKey: "boardMember",
  photo: "/images/team/ad-soyad.jpg",
  linkedin: "https://www.linkedin.com/in/kullanici/",
},
```

- roleKey seçenekleri: advisor, president, vicePresident, boardMember, auditHead, auditMember
- Rol yazılarının kendisi messages/tr.json ve en.json içinde team.roles altındadır.
- photo ve linkedin satırları isteğe bağlıdır. Fotoğraf yoksa o satırı hiç yazma, sitede baş harfli avatar çıkar.
- Bloğun sonundaki virgüle dikkat: her `},` ile biter.

## Ekip: üye çıkarma ve rol değiştirme

- Çıkarma: üyenin `{` ile başlayıp `},` ile biten bloğunu komple sil.
- Rol değiştirme: roleKey değerini yukarıdaki seçeneklerden biriyle değiştir.
- Sıra değiştirme: blokları kes yapıştır ile listede taşıyabilirsin, sitede aynı sırayla görünür.

## Fotoğraf ekleme ve değiştirme

1. Fotoğrafı kare kırp, yaklaşık 600x600 piksel, jpg, 200 KB altı olsun. squoosh.app bu iş için yeterli.
2. Dosya adı Türkçe karaktersiz ve tireli olsun: ad-soyad.jpg
3. GitHub'da public/images/team klasörüne gir. Add file, Upload files, dosyayı sürükle, Commit changes.
4. Aynı isimle yüklersen eskisinin üzerine yazar. Yeni üyeyse team.ts'ye photo satırını da ekle.

## Görsel değiştirme (arka planlar, logo)

public/images klasörüne aynı dosya adıyla Upload files yap, üzerine yazar. Arka planlar için ideal boyut 1920x1080 jpg. Logoda iki dosya olduğunu unutma: logo-dark.png açık zeminde, logo-light.png koyu zeminde görünür.

## Link, e-posta ve video değiştirme

src/lib/site-config.ts dosyasında ilgili satırın tırnak içini değiştir. Öne çıkan videoyu değiştirmek için featuredVideoId değerine YouTube linkindeki v= sonrasındaki kodu yaz. Örnek: watch?v=ABC12345 ise değer ABC12345.

## Etkinlik ve duyuru yönetimi (kodsuz)

1. siteadresi/admin/login adresine git, yönetici e-posta ve şifresiyle gir.
2. Etkinlikler, Yeni Etkinlik: Türkçe başlık ve tarih zorunlu, İngilizce alanlar boş kalabilir. Poster yükleyebilirsin. "Yayında" kapalıysa etkinlik sitede görünmez, taslak olarak durur.
3. Duyurular aynı mantıkla çalışır.
4. Başvurular sekmesinde üyelik başvurularını görür, CSV İndir ile Excel'e aktarırsın.
5. Yeni yönetici eklemek: supabase.com'da projeye gir, Authentication, Users, Add user. "Auto Confirm User" işaretli olsun.

## Bir şey bozulursa

Belirti: değişiklik siteye yansımadı veya Vercel'de deploy "Failed" görünüyor.

- En hızlı çözüm: vercel.com'da projeye gir, Deployments, çalışan son deploy'un yanındaki üç nokta, Instant Rollback. Site anında eski haline döner.
- Kalıcı çözüm: GitHub'da bozduğun dosyayı aç, History butonuna bas, önceki sürümü aç, içeriğini kopyala, dosyayı Edit ile açıp yapıştır, Commit et.
- Hataların çoğu json dosyasında eksik veya fazla virgül ya da silinen bir tırnaktır. Vercel'deki hata mesajında hangi dosya ve satır olduğu yazar.

## Altın kurallar

1. Türkçe bir metni değiştirdiysen İngilizcesini de değiştir.
2. Tırnaklara ve virgüllere dokunma, sadece içeriği değiştir.
3. Her seferinde tek değişiklik yap, yayını kontrol et, sonra devam et.
4. Emin olamadığın büyük değişikliklerde önce sorup sonra yap.
