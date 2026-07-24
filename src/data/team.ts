/**
 * Ekip verisi. Fotograflar icin photo alanina "/images/team/ad-soyad.jpg"
 * gibi bir yol verin (dosyayi public/images/team/ altina koyun).
 * NOT: Asil/yedek ayrimi bilerek yok, herkes esit uye olarak listelenir.
 */
export type TeamMember = {
  name: string;
  roleKey:
    | "advisor"
    | "president"
    | "vicePresident"
    | "boardMember"
    | "auditHead"
    | "auditMember";
  photo?: string;
  linkedin?: string;
};

export const advisor: TeamMember[] = [
  {
    name: "Prof. Dr. Gülay Bulut",
    roleKey: "advisor",
    linkedin: "https://www.linkedin.com/in/g%C3%BClay-bulut-3612225a/",
  },
];

// Uc kisilik yonetim seridi: baskan, baskan yardimcisi, denetim kurulu baskani
export const leadership: TeamMember[] = [
  {
    name: "Berat Öztürk",
    roleKey: "president",
    linkedin: "https://www.linkedin.com/in/berat-%C3%B6zt%C3%BCrk-75002a28b/",
  },
  {
    name: "Duru Kırmızı",
    roleKey: "vicePresident",
    linkedin: "https://www.linkedin.com/in/duru-k%C4%B1rm%C4%B1z%C4%B1/",
  },
  {
    name: "Enes Berk Işık",
    roleKey: "auditHead",
    linkedin: "https://www.linkedin.com/in/enesberkisik/",
  },
];

export const board: TeamMember[] = [
  {
    name: "İbrahim Akar",
    roleKey: "boardMember",
    linkedin: "https://www.linkedin.com/in/ibrahim-akar-889195323/",
  },
  {
    name: "Abdurrahim Esad Korkmaz",
    roleKey: "boardMember",
    linkedin:
      "https://www.linkedin.com/in/abdurrahim-esad-korkmaz-063884358/",
  },
  {
    name: "Bilal Ergüler",
    roleKey: "boardMember",
    linkedin: "https://www.linkedin.com/in/bilal-erg%C3%BCler-2b733333b/",
  },
  {
    name: "Davut Giray Şerabatır",
    roleKey: "boardMember",
    linkedin:
      "https://www.linkedin.com/in/davut-giray-%C5%9Ferabatir-b5b3202b9/",
  },
  {
    name: "Muhammed Uğur Öztekin",
    roleKey: "boardMember",
    // TODO: LinkedIn linki eklenecek
  },
  {
    name: "Yunus Emre Yıldırım",
    roleKey: "boardMember",
    linkedin: "https://www.linkedin.com/in/yunus-emre-yildirim-/",
  },
  {
    name: "Buse Kanay",
    roleKey: "boardMember",
    linkedin: "https://www.linkedin.com/in/buse-kanay-1a8644263/",
  },
  {
    name: "Muhammet Kaan Tarı",
    roleKey: "boardMember",
    linkedin: "https://www.linkedin.com/in/kaan-tar%C4%B1-651275293/",
  },
];

export const audit: TeamMember[] = [
  {
    name: "Fikri Yetimoğlu",
    roleKey: "auditMember",
    linkedin: "https://www.linkedin.com/in/fikriytm/",
  },
  {
    name: "Hızır Kadir Potur",
    roleKey: "auditMember",
    linkedin: "https://www.linkedin.com/in/h%C4%B1z%C4%B1r-kadir-potur-58145a250/",
  },
  {
    name: "Harun Cem Ersoy",
    roleKey: "auditMember",
    linkedin: "https://www.linkedin.com/in/harun-cem-ersoy-84450229b/",
  },
  {
    name: "Hubeyb Çelik",
    roleKey: "auditMember",
    linkedin: "https://www.linkedin.com/in/hubeyb-%C3%A7elik-916a663b6/",
  },
];
