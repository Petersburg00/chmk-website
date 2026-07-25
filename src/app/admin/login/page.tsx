"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = getBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
      setLoading(false);
      return;
    }
    router.replace("/admin/etkinlikler");
    router.refresh();
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8">
        <div className="mb-6 flex items-center gap-3">
          <img src="/images/logo-dark.svg" alt="CHMK" className="h-8 w-auto dark:hidden" /><img src="/images/logo-light.svg" alt="CHMK" className="hidden h-8 w-auto dark:block" />
          <div>
            <p className="font-bold">CHMK Yönetim Paneli</p>
            <p className="text-xs text-muted">Sadece yetkili kullanıcılar</p>
          </div>
        </div>

        {!supabase && (
          <p className="mb-4 rounded-xl border border-copper/40 bg-copper/10 p-3 text-xs text-copper">
            Supabase yapılandırması eksik. .env.local dosyasına
            NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY ekleyin.
          </p>
        )}

        <div className="grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wider text-muted">
              E-posta
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-copper"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wider text-muted">
              Şifre
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-copper"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-xs text-copper">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !supabase}
            className="rounded-xl bg-copper py-3 text-sm font-bold text-white transition-colors hover:bg-copper-dark disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
}
