import { useTranslations } from "next-intl";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { key: "about", href: "/hakkimizda" },
  { key: "team", href: "/ekip" },
  { key: "events", href: "/etkinlikler" },
  { key: "media", href: "/medya" },
  { key: "contact", href: "/iletisim" },
] as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <img src="/images/logo-dark.png" alt="CHMK" className="h-10 w-auto dark:hidden" /><img src="/images/logo-light.png" alt="CHMK" className="hidden h-10 w-auto dark:block" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            {t("footer.tagline")}
          </p>

          <div className="mt-6">
            <a
              href={siteConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-copper-dark"
            >
              <Youtube size={18} /> YouTube
            </a>
            <div className="mt-3 flex items-center gap-3 text-muted">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-copper"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-copper"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="transition-colors hover:text-copper"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.06em] text-muted">
            {t("footer.linksTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-copper"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.06em] text-muted">
            {t("footer.contactTitle")}
          </h3>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-4 block text-sm transition-colors hover:text-copper"
          >
            {siteConfig.contactEmail}
          </a>
          <Link
            href="/uye-ol"
            className="mt-6 inline-flex rounded-full border border-copper px-5 py-2.5 text-sm font-bold text-copper transition-colors hover:bg-copper hover:text-white"
          >
            {t("footer.joinCta")}
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-muted">
          <span>
            © {new Date().getFullYear()} CHMK. {t("footer.rights")}
          </span>
          <span className="tracking-[0.06em]">İTÜ</span>
        </div>
      </div>
    </footer>
  );
}
