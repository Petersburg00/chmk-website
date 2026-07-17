"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Download, Trash2 } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { Basvuru } from "@/lib/types";

function csvCell(value: string | null | undefined): string {
  const v = (value ?? "").toString();
  if (/[";\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export default function AdminBasvurularPage() {
  const supabase = getBrowserClient();
  const [items, setItems] = useState<Basvuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("uyelik_basvurulari")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as Basvuru[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(item: Basvuru) {
    if (!supabase) return;
    if (!confirm(`${item.ad_soyad} başvurusu silinsin mi?`)) return;
    await supabase.from("uyelik_basvurulari").delete().eq("id", item.id);
    load();
  }

  function exportCsv() {
    const header = [
      "Ad Soyad",
      "Öğrenci No",
      "Bölüm / Fakülte",
      "Sınıf",
      "E-posta",
      "Telefon",
      "Motivasyon",
      "KVKK Onayı",
      "Başvuru Tarihi",
    ];
    const rows = items.map((b) => [
      b.ad_soyad,
      b.ogrenci_no,
      b.bolum,
      b.sinif,
      b.eposta,
      b.telefon,
      b.motivasyon ?? "",
      b.kvkk_onay ? "Evet" : "Hayır",
      new Date(b.created_at).toLocaleString("tr-TR"),
    ]);
    // \uFEFF (BOM) + ";" ayraci: Turkce Excel dogru acar
    const csv =
      "\uFEFF" +
      [header, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chmk-basvurular-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!supabase)
    return (
      <p className="rounded-xl border border-copper/40 bg-copper/10 p-4 text-sm text-copper">
        Supabase yapılandırması eksik. .env.local dosyasını kontrol edin.
      </p>
    );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Üyelik Başvuruları</h1>
          <p className="mt-1 text-sm text-muted">
            Toplam {items.length} başvuru
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={items.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-copper-dark disabled:opacity-50"
        >
          <Download size={16} /> CSV İndir
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">
          Henüz başvuru yok.
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {items.map((b) => {
            const open = openId === b.id;
            return (
              <li key={b.id}>
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <button
                    onClick={() => setOpenId(open ? null : b.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">
                        {b.ad_soyad}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {b.bolum} · {b.sinif} ·{" "}
                        {new Date(b.created_at).toLocaleDateString("tr-TR")}
                      </span>
                    </span>
                  </button>
                  <button
                    onClick={() => remove(b)}
                    aria-label="Sil"
                    className="rounded-full p-2 text-muted transition-colors hover:text-copper"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {open && (
                  <div className="grid gap-2 border-t border-line bg-background/50 p-4 text-sm sm:grid-cols-2">
                    <p>
                      <span className="text-muted">Öğrenci No:</span>{" "}
                      {b.ogrenci_no}
                    </p>
                    <p>
                      <span className="text-muted">E-posta:</span> {b.eposta}
                    </p>
                    <p>
                      <span className="text-muted">Telefon:</span> {b.telefon}
                    </p>
                    <p>
                      <span className="text-muted">KVKK:</span>{" "}
                      {b.kvkk_onay ? "Onaylandı" : "Onaylanmadı"}
                    </p>
                    {b.motivasyon && (
                      <p className="sm:col-span-2">
                        <span className="text-muted">Motivasyon:</span>{" "}
                        {b.motivasyon}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
