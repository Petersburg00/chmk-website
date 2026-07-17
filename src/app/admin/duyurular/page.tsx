"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { Duyuru } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-copper";
const labelCls =
  "mb-1 block text-xs font-semibold tracking-wider text-muted";

type FormState = {
  baslik_tr: string;
  baslik_en: string;
  icerik_tr: string;
  icerik_en: string;
  tarih: string;
};

const emptyForm = (): FormState => ({
  baslik_tr: "",
  baslik_en: "",
  icerik_tr: "",
  icerik_en: "",
  tarih: new Date().toISOString().slice(0, 10),
});

export default function AdminDuyurularPage() {
  const supabase = getBrowserClient();
  const [items, setItems] = useState<Duyuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("duyurular")
      .select("*")
      .order("tarih", { ascending: false });
    setItems((data as Duyuru[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setForm(emptyForm());
    setError(null);
    setEditingId("new");
  }

  function startEdit(item: Duyuru) {
    setForm({
      baslik_tr: item.baslik_tr,
      baslik_en: item.baslik_en,
      icerik_tr: item.icerik_tr,
      icerik_en: item.icerik_en,
      tarih: item.tarih.slice(0, 10),
    });
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

    const payload = {
      baslik_tr: form.baslik_tr.trim(),
      baslik_en: form.baslik_en.trim(),
      icerik_tr: form.icerik_tr.trim(),
      icerik_en: form.icerik_en.trim(),
      tarih: new Date(form.tarih + "T09:00:00").toISOString(),
    };

    const { error: saveError } =
      editingId === "new"
        ? await supabase.from("duyurular").insert(payload)
        : await supabase.from("duyurular").update(payload).eq("id", editingId);

    if (saveError) {
      setError("Kaydedilemedi: " + saveError.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setEditingId(null);
    load();
  }

  async function remove(item: Duyuru) {
    if (!supabase) return;
    if (!confirm(`"${item.baslik_tr}" silinsin mi?`)) return;
    await supabase.from("duyurular").delete().eq("id", item.id);
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
        <h1 className="text-2xl font-bold">Duyurular</h1>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-copper-dark"
        >
          <Plus size={16} /> Yeni Duyuru
        </button>
      </div>

      {editingId && (
        <div className="mb-10 rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-5 font-bold">
            {editingId === "new" ? "Yeni duyuru" : "Duyuruyu düzenle"}
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
            <label className="block">
              <span className={labelCls}>İçerik (TR)</span>
              <textarea
                rows={4}
                className={inputCls}
                value={form.icerik_tr}
                onChange={(e) =>
                  setForm({ ...form, icerik_tr: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className={labelCls}>İçerik (EN)</span>
              <textarea
                rows={4}
                className={inputCls}
                value={form.icerik_en}
                onChange={(e) =>
                  setForm({ ...form, icerik_en: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className={labelCls}>Tarih *</span>
              <input
                type="date"
                className={inputCls}
                value={form.tarih}
                onChange={(e) => setForm({ ...form, tarih: e.target.value })}
              />
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
          Henüz duyuru yok.
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.baslik_tr}</p>
                <p className="text-xs text-muted">
                  {new Date(item.tarih).toLocaleDateString("tr-TR", {
                    dateStyle: "long",
                  })}
                </p>
              </div>
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
