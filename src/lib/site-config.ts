/**
 * Kulubun iletisim ve sosyal medya bilgileri tek yerden yonetilir.
 */
export const siteConfig = {
  contactEmail: "chmkitu@gmail.com",
  youtube: {
    channelUrl: "https://www.youtube.com/@CevherHaz%C4%B1rlama",
    featuredVideoId: "35ufxL7SEVQ",
  },
  socials: {
    instagram: "https://www.instagram.com/ituchmk/",
    linkedin: "https://www.linkedin.com/company/ituchmk",
    x: "https://x.com/ituchmk",
  },
  foundedYear: 2008, // kurulus yili: sayi bolumu her yil otomatik guncellenir
};

export function clubAge(): number {
  return Math.max(1, new Date().getFullYear() - siteConfig.foundedYear);
}
