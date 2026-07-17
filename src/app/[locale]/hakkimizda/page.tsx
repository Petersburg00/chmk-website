import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionLabel from "@/components/SectionLabel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("label") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="wrap pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-muted">{t("intro")}</p>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-8 md:col-span-2">
          <SectionLabel>{t("whatLabel")}</SectionLabel>
          <h2 className="display text-2xl md:text-3xl">{t("whatTitle")}</h2>
          <p className="mt-4 max-w-3xl text-muted">{t("whatText")}</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-8">
          <h2 className="display text-2xl">{t("missionTitle")}</h2>
          <p className="mt-4 text-muted">{t("missionText")}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-8">
          <h2 className="display text-2xl">{t("visionTitle")}</h2>
          <p className="mt-4 text-muted">{t("visionText")}</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-8 md:col-span-2">
          <h2 className="display text-2xl">{t("historyTitle")}</h2>
          <p className="mt-4 max-w-3xl text-muted">{t("historyText")}</p>
        </div>
      </div>
    </div>
  );
}
