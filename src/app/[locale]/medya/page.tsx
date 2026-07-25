import { getTranslations, setRequestLocale } from "next-intl/server";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import YouTubeFeature from "@/components/YouTubeFeature";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: t("label") };
}

const others = [
  { name: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram },
  { name: "LinkedIn", href: siteConfig.socials.linkedin, Icon: Linkedin },
  { name: "X", href: siteConfig.socials.x, Icon: Twitter },
];

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");
  const th = await getTranslations("home");

  return (
    <div className="wrap pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-muted">{t("intro")}</p>

      {/* YouTube on planda */}
      <div className="mt-12">
        <YouTubeFeature title={th("videoTitle")} subscribeLabel={t("subscribe")} />
      </div>

      {/* Diger platformlar ikincil */}
      <section className="mt-16 border-t border-line pt-10">
        <h2 className="text-xs font-semibold tracking-[0.06em] text-muted">
          {t("othersTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("othersText")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {others.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-copper hover:text-copper"
            >
              <Icon size={16} /> {name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
