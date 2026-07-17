import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionLabel from "@/components/SectionLabel";
import MembershipForm from "@/components/MembershipForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "join" });
  return { title: t("label") };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("join");

  return (
    <div className="wrap max-w-3xl pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 text-muted">{t("intro")}</p>
      <div className="mt-12">
        <MembershipForm />
      </div>
    </div>
  );
}
