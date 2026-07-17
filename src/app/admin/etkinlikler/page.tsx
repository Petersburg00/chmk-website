"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { Etkinlik } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-copper";
const labelCls =
  "mb-1 block text-xs font-semibold tracking-wider text-muted";

type FormState = {
  baslik_tr: string;
  baslik_en: string;
  aciklama_tr: string;
  aciklama_en: string;
  tarih: string;
  konum: string;
  link: string;
  yayinda: boolean;
};

function toInputValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const emptyForm = (): FormState => ({
  baslik_tr: "",
  baslik_en: "",
  aciklama_tr: "",
  aciklama_en: "",
  tarih: toInputValue(new Date().toISOString()),
  konum: "",
  link: "",
  yayinda: true,
});

export default function AdminEtkinliklerPage() {
  const supabase = getBrowserClient();
  const [items, setItems] = useState<Etkinlik[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("etkinlikler")
      .select("*")
      .order("tarih", { ascending: false });
    setItems((data as Etkinlik[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setForm(emptyForm());
    setPosterFile(null);
    setError(null);
    setEditingId("new");
  }

  function startEdit(item: Etkinlik) {
    setForm({
      baslik_tr: item.baslik_tr,
      baslik_en: item.baslik_en,
      aciklama_tr: item.aciklama_tr,
      aciklama_en: item.aciklama_en,
      tarih: toInputValue(item.tarih),
      konum: item.konum ?? "",
      link: item.link ?? "",
      yayinda: item.yayinda,
    });
    setPosterFile(null);
    setError(null);
    setEditingId(item.id);
  }

  async function save() {
    if (!supabase || !editingId) return;
    if (!form.baslik_tr.trim() || !form.tarih) {
      setError("Türkçe başlık ve tarih zorunludur.");
      return;
    }
    setSaving(true);
    setError(null);

    let posterUrl: string | null = null;
    if (posterFile) {
      const path = `${Date.now()}-${posterFile.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("posters")
        .upload(path, posterFile);
      if (uploadError) {
        setError("Poster yüklenemedi: " + uploadError.message);
        setSaving(false);
        return;
      }
      posterUrl = supabase.storage.from("posters").getPublicUrl(path)
        .data.publicUrl;
    }

    const payload: Record<string, unknown> = {
      baslik_tr: form.baslik_tr.trim(),
      baslik_en: form.baslik_en.trim(),
      aciklama_tr: form.aciklama_tr.trim(),
      aciklama_en: form.aciklama_en.trim(),
      tarih: new Date(form.tarih).toISOString(),
      konum: form.konum.trim() || null,
      link: form.link.trim() || null,
      yayinda: form.yayinda,
    };
    if (posterUrl) payload.poster_url = posterUrl;

    const { error: saveError } =
      editingId === "new"
        ? await supabase.from("etkinlikler").insert(payload)
        : await supabase.from("etkinlikler").update(payload).eq("id", editingId);

    if (saveError) {
      setError("Kaydedilemedi: " + saveError.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setEditingId(null);
    load();
  }

  async function togglePublished(item: Etkinlik) {
    if (!supabase) return;
    await supabase
      .from("etkinlikler")
      .update({ yayinda: !item.yayinda })
      .eq("id", item.id);
    load();
  }

  async function remove(item: Etkinlik) {
    if (!supabase) return;
    if (!confirm(`"${item.baslik_tr}" silinsin mi? Bu işlem geri alınamaz.`))
      return;
    await supabase.from("etkinlikler").delete().eq("id", item.id);
    load();
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
        <h1 className="text-2xl font-bold">Etkinlikler</h1>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-copper-dark"
        >
          <Plus size={16} /> Yeni Etkinlik
        </button>
      </div>

      {editingId && (
        <div className="mb-10 rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-5 font-bold">
            {editingId === "new" ? "Yeni etkinlik" : "Etkinliği düzenle"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Başlık (TR) *</span>
              <input
                className={inputCls}
                value={form.baslik_tr}
                onChange={(e) =>
                  setForm({ ...form, baslik_tr: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className={labelCls}>Başlık (EN)</span>
              <input
                className={inputCls}
                value={form.baslik_en}
                onChange={(e) =>
                  setForm({ ...form, baslik_en: e.target.value })
                }
              />
            </label>
            <label className="block md:col-span-1">
              <span className={labelCls}>Açıklama (TR)</span>
              <textarea
                rows={3}
                className={inputCls}
                value={form.aciklama_tr}
                onChange={(e) =>
                  setForm({ ...form, aciklama_tr: e.target.value })
                }
              />
            </label>
            <label className="block md:col-span-1">
              <span className={labelCls}>Açıklama (EN)</span>
              <textarea
                rows={3}
                className={inputCls}
                value={form.aciklama_en}
                onChange={(e) =>
                  setForm({ ...form, aciklama_en: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className={labelCls}>Tarih ve saat *</span>
              <input
                type="datetime-local"
                className={inputCls}
                value={form.tarih}
                onChange={(e) => setForm({ ...form, tarih: e.target.value })}
              />
            </label>
            <label className="block">
              <span className={labelCls}>Konum</span>
              <input
                className={inputCls}
                value={form.konum}
                onChange={(e) => setForm({ ...form, konum: e.target.value })}
                placeholder="İTÜ Maden Fakültesi, Amfi A"
              />
            </label>
            <label className="block">
              <span className={labelCls}>Bağlantı (kayıt formu vb.)</span>
              <input
                className={inputCls}
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
              />
            </label>
            <label className="block">
              <span className={labelCls}>Poster (görsel)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPosterFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-copper file:px-4 file:py-2 file:text-xs file:font-bold file:text-white"
              />
            </label>
            <label className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={form.yayinda}
                onChange={(e) =>
                  setForm({ ...form, yayinda: e.target.checked })
                }
                className="h-4 w-4 accent-copper"
              />
              <span className="text-sm">Yayında (sitede görünsün)</span>
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-copper">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full bg-copper px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-copper-dark disabled:opacity-50"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="rounded-full border border-line px-6 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted">Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">
          Henüz etkinlik yok. &quot;Yeni Etkinlik&quot; ile ekleyin.
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-3 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.baslik_tr}</p>
                <p className="text-xs text-muted">
                  {new Date(item.tarih).toLocaleString("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  {item.konum ? ` · ${item.konum}` : ""}
                </p>
              </div>
              <button
                onClick={() => togglePublished(item)}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  item.yayinda
                    ? "bg-copper/15 text-copper"
                    : "bg-line text-muted"
                }`}
              >
                {item.yayinda ? "Yayında" : "Taslak"}
              </button>
              <button
                onClick={() => startEdit(item)}
                aria-label="Düzenle"
                className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => remove(item)}
                aria-label="Sil"
                className="rounded-full p-2 text-muted transition-colors hover:text-copper"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
