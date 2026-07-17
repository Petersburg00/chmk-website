"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, usePathname } from "@/i18n/navigation";

const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/hakkimizda" },
  { key: "team", href: "/ekip" },
  { key: "events", href: "/etkinlikler" },
  { key: "media", href: "/medya" },
  { key: "join", href: "/uye-ol" },
  { key: "contact", href: "/iletisim" },
] as const;

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-copper hover:text-copper"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}

function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "tr" ? "en" : "tr";

  return (
    <Link
      href={pathname}
      locale={other}
      aria-label={label}
      className="flex h-9 items-center rounded-full border border-line px-3 text-xs font-semibold tracking-wide transition-colors hover:border-copper hover:text-copper"
    >
      {other}
    </Link>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa degisince menuyu kapat
  useEffect(() => setOpen(false), [pathname]);

  // Menu acikken arkaplan kaydirmayi kilitle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label="CHMK: Ana Sayfa" className="logo-chip">
            <Image
              src="/images/logo.png"
              alt="CHMK"
              width={104}
              height={44}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle label={t("themeToggle")} />
            <LocaleSwitch label={t("langToggle")} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="ml-1 flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-bold tracking-[0.2em] text-background transition-colors hover:bg-copper hover:text-white"
            >
              {t("menu")}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[90] flex flex-col bg-[#0c0a08] text-[#f2ede3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="wrap flex h-16 items-center justify-between md:h-20">
              <span className="logo-chip">
                <Image
                  src="/images/logo.png"
                  alt="CHMK"
                  width={104}
                  height={44}
                  className="h-8 w-auto"
                />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 items-center rounded-full border border-white/25 px-4 text-xs font-bold tracking-[0.2em] transition-colors hover:border-copper hover:text-copper"
              >
                {t("close")}
              </button>
            </div>

            <nav className="wrap flex flex-1 flex-col justify-center gap-1 py-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-1.5 text-4xl transition-colors hover:text-copper sm:text-5xl md:text-6xl"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="wrap pb-8 text-xs tracking-[0.06em] text-white/40">
              CHMK • İTÜ
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
