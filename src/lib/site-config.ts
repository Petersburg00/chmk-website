/**
 * TODO: Kulubun gercek linkleriyle doldurun.
 * Tum sosyal medya ve video referanslari tek yerden yonetilir.
 */
export const siteConfig = {
  contactEmail: "chmk@itu.edu.tr", // TODO: gercek e-posta
  youtube: {
    channelUrl: "https://www.youtube.com/@chmk", // TODO
    featuredVideoId: "dQw4w9WgXcQ", // TODO: one cikan video ID'si
  },
  socials: {
    instagram: "https://instagram.com/chmk_itu", // TODO
    linkedin: "https://linkedin.com/company/chmk", // TODO
    x: "https://x.com/chmk_itu", // TODO
  },
  foundedYear: 2008, // kurulus yili: sayi bolumu her yil otomatik guncellenir
};

export function clubAge(): number {
  return Math.max(1, new Date().getFullYear() - siteConfig.foundedYear);
}
