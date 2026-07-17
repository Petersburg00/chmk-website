import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  GraduationCap,
  Handshake,
  Mic,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getEtkinlikler } from "@/lib/data";
import { clubAge } from "@/lib/site-config";
import SectionLabel from "@/components/SectionLabel";
import YouTubeFeature from "@/components/YouTubeFeature";
import EventCard from "@/components/EventCard";
import Carousel from "@/components/Carousel";

export const revalidate = 120;

const featureIcons = {
  trips: Factory,
  seminars: Mic,
  trainings: GraduationCap,
  industry: Handshake,
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const events = (await getEtkinlikler()).slice(0, 3);
  const age = clubAge();

  const slides = [
    {
      image: "/images/carousel-1.jpg",
      title: t("home.carousel.s1Title"),
      text: t("home.carousel.s1Text"),
      href: "/hakkimizda",
      cta: t("common.viewCase"),
    },
    {
      image: "/images/carousel-2.jpg",
      title: t("home.carousel.s2Title"),
      text: t("home.carousel.s2Text"),
      href: "/etkinlikler",
      cta: t("common.viewCase"),
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-svh items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/55 to-[#0c0a08]/25" />
        <div className="wrap relative pb-20 pt-40 text-white">
          <h1 className="display max-w-4xl text-4xl sm:text-6xl md:text-7xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            {t("home.heroText")}
          </p>
          <Link
            href="/uye-ol"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-bold tracking-[0.02em] text-white transition-colors hover:bg-copper-dark"
          >
            {t("home.heroCta")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* HAKKIMIZDA KISA */}
      <section className="wrap py-20 md:py-28">
        <SectionLabel>{t("home.aboutLabel")}</SectionLabel>
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-14">
          <h2 className="display text-3xl md:text-5xl">
            {t("home.aboutTitle")}
          </h2>
          <div className="md:pt-2">
            <p className="text-muted">{t("home.aboutText")}</p>
            <Link
              href="/hakkimizda"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:underline"
            >
              {t("home.aboutLink")} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* BASKAN + ISTATISTIK */}
      <section className="border-y border-line bg-surface">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <SectionLabel>{t("home.teamLabel")}</SectionLabel>
            <p className="display text-3xl md:text-4xl">
              {t("home.teamTitle")}
            </p>
            <Link
              href="/ekip"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-copper px-7 py-3.5 text-sm font-bold text-copper transition-colors hover:bg-copper hover:text-white"
            >
              {t("home.teamCta")} <ArrowRight size={17} />
            </Link>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-semibold tracking-[0.08em] text-muted">
              • {t("home.statLabel")}
            </p>
            <p className="display text-[7rem] leading-none text-copper md:text-[11rem]">
              {String(age).padStart(2, "0")}
            </p>
            <p className="text-sm text-muted">{t("home.statText")}</p>
          </div>
        </div>
      </section>

      {/* SENI NELER BEKLIYOR */}
      <section className="wrap py-20 md:py-28">
        <SectionLabel>{t("home.featuresLabel")}</SectionLabel>
        <h2 className="display mb-10 max-w-2xl text-3xl md:text-5xl">
          {t("home.featuresTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(featureIcons) as (keyof typeof featureIcons)[]).map(
            (key) => {
              const Icon = featureIcons[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-copper/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper/15 text-copper">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">
                    {t(`home.features.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {t(`home.features.${key}.text`)}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* ONE CIKAN VIDEO */}
      <section className="wrap pb-20 md:pb-28">
        <SectionLabel>{t("home.videoLabel")}</SectionLabel>
        <YouTubeFeature
          title={t("home.videoTitle")}
          subscribeLabel={t("media.subscribe")}
        />
      </section>

      {/* GUNCEL ETKINLIKLER */}
      <section className="border-t border-line bg-surface">
        <div className="wrap py-20 md:py-28">
          <SectionLabel>{t("home.eventsLabel")}</SectionLabel>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-3xl md:text-5xl">
              {t("home.eventsTitle")}
            </h2>
            <Link
              href="/etkinlikler"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:underline"
            >
              {t("home.eventsAll")} <ArrowUpRight size={16} />
            </Link>
          </div>
          {events.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  locale={locale}
                  detailsLabel={t("events.detailsLink")}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
              {t("home.eventsEmpty")}
            </p>
          )}
        </div>
      </section>

      {/* FULL-BLEED CAROUSEL */}
      <Carousel
        slides={slides}
        shareLabel={t("common.share")}
        copiedLabel={t("common.linkCopied")}
      />
    </>
  );
}
