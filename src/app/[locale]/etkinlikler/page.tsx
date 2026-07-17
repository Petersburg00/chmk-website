import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionLabel from "@/components/SectionLabel";
import EventCard from "@/components/EventCard";
import { getDuyurular, getEtkinlikler } from "@/lib/data";
import { formatDate, pick } from "@/lib/format";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  return { title: t("label") };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("events");

  const [events, announcements] = await Promise.all([
    getEtkinlikler(),
    getDuyurular(),
  ]);

  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.tarih).getTime() >= now)
    .sort((a, b) => +new Date(a.tarih) - +new Date(b.tarih));
  const past = events.filter((e) => new Date(e.tarih).getTime() < now);

  return (
    <div className="wrap pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-muted">{t("intro")}</p>

      {events.length === 0 && (
        <p className="mt-14 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          {t("empty")}
        </p>
      )}

      {upcoming.length > 0 && (
        <section className="mt-16">
          <SectionLabel>{t("upcoming")}</SectionLabel>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale}
                detailsLabel={t("detailsLink")}
              />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="mt-16">
          <SectionLabel>{t("past")}</SectionLabel>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale}
                detailsLabel={t("detailsLink")}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-20">
        <SectionLabel>{t("announcementsTitle")}</SectionLabel>
        {announcements.length ? (
          <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {announcements.map((a) => (
              <li key={a.id} className="p-6">
                <p className="text-xs text-muted">
                  {formatDate(a.tarih, locale)}
                </p>
                <h3 className="mt-1 font-bold">
                  {pick(locale, a.baslik_tr, a.baslik_en)}
                </h3>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">
                  {pick(locale, a.icerik_tr, a.icerik_en)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">{t("announcementsEmpty")}</p>
        )}
      </section>
    </div>
  );
}
