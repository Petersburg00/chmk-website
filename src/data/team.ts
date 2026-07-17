/**
 * Ekip verisi. Fotograflar icin photo alanina "/images/team/ad-soyad.jpg"
 * gibi bir yol verin (dosyayi public/images/team/ altina koyun).
 * LinkedIn linklerini gercek profillerle degistirin.
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
  { name: "Prof. Dr. Gülay Bulut", roleKey: "advisor", linkedin: "#" },
];

// Uc kisilik yonetim seridi: baskan, baskan yardimcisi, denetim kurulu baskani
export const leadership: TeamMember[] = [
  { name: "Berat Öztürk", roleKey: "president", linkedin: "#" },
  { name: "Duru Kırmızı", roleKey: "vicePresident", linkedin: "#" },
  { name: "Enes Berk Işık", roleKey: "auditHead", linkedin: "#" },
];

export const board: TeamMember[] = [
  { name: "İbrahim Akar", roleKey: "boardMember", linkedin: "#" },
  { name: "Abdurrahim Esad Korkmaz", roleKey: "boardMember", linkedin: "#" },
  { name: "Bilal Ergüler", roleKey: "boardMember", linkedin: "#" },
  { name: "Davut Giray Şerabatır", roleKey: "boardMember", linkedin: "#" },
  { name: "Muhammed Uğur Öztekin", roleKey: "boardMember", linkedin: "#" },
  { name: "Yunus Emre Yıldırım", roleKey: "boardMember", linkedin: "#" },
  { name: "Buse Kanay", roleKey: "boardMember", linkedin: "#" },
  { name: "Muhammet Kaan Tarı", roleKey: "boardMember", linkedin: "#" },
];

export const audit: TeamMember[] = [
  { name: "Fikri Yetimoğlu", roleKey: "auditMember", linkedin: "#" },
  { name: "Hızır Kadir Potur", roleKey: "auditMember", linkedin: "#" },
  { name: "Harun Cem Ersoy", roleKey: "auditMember", linkedin: "#" },
  { name: "Hubeyb Çelik", roleKey: "auditMember", linkedin: "#" },
];
