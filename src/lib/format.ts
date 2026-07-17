export function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      dateStyle: "long",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function pick(locale: string, tr: string, en: string): string {
  return locale === "en" && en.trim() ? en : tr;
}
