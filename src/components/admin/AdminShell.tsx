"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";

const NAV = [
  { href: "/admin/etkinlikler", label: "Etkinlikler" },
  { href: "/admin/duyurular", label: "Duyurular" },
  { href: "/admin/basvurular", label: "Başvurular" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  async function handleSignOut() {
    const supabase = getBrowserClient();
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/admin/etkinlikler" className="flex items-center gap-3">
            <img src="/images/logo-dark.svg" alt="CHMK" className="h-7 w-auto dark:hidden" /><img src="/images/logo-light.svg" alt="CHMK" className="hidden h-7 w-auto dark:block" />
            <span className="text-sm font-bold tracking-wide">
              Yönetim
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-copper text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ExternalLink size={15} /> Siteye dön
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-copper"
            >
              <LogOut size={15} /> Çıkış
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
