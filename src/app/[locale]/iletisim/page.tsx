import { getTranslations, setRequestLocale } from "next-intl/server";
import { Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("label") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const socials = [
    { name: "YouTube", href: siteConfig.youtube.channelUrl, Icon: Youtube },
    { name: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram },
    { name: "LinkedIn", href: siteConfig.socials.linkedin, Icon: Linkedin },
    { name: "X", href: siteConfig.socials.x, Icon: Twitter },
  ];

  return (
    <div className="wrap pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-muted">{t("intro")}</p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.06em] text-muted">
              <Mail size={14} className="text-copper" /> {t("emailTitle")}
            </h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-2 inline-block text-lg font-semibold transition-colors hover:text-copper"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.06em] text-muted">
              {t("socialTitle")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-copper hover:text-copper"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.06em] text-muted">
              <MapPin size={14} className="text-copper" /> {t("locationTitle")}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              {t("locationText")}
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <iframe
                title={t("locationTitle")}
                src="https://www.google.com/maps?q=%C4%B0T%C3%9C+Maden+Fak%C3%BCltesi+Ayaza%C4%9Fa&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.06em] text-muted">
            {t("formTitle")}
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
