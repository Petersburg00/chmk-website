"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase-browser";

type FormState = {
  ad_soyad: string;
  ogrenci_no: string;
  bolum: string;
  sinif: string;
  eposta: string;
  telefon: string;
  motivasyon: string;
  kvkk_onay: boolean;
};

const EMPTY: FormState = {
  ad_soyad: "",
  ogrenci_no: "",
  bolum: "",
  sinif: "",
  eposta: "",
  telefon: "",
  motivasyon: "",
  kvkk_onay: false,
};

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-copper";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wider text-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-copper">{error}</span>}
    </label>
  );
}

export default function MembershipForm() {
  const t = useTranslations("join");
  const tc = useTranslations("common");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const classOptions = [
    { value: "Hazırlık", label: t("classOptions.prep") },
    { value: "1", label: t("classOptions.y1") },
    { value: "2", label: t("classOptions.y2") },
    { value: "3", label: t("classOptions.y3") },
    { value: "4", label: t("classOptions.y4") },
    { value: "Lisansüstü", label: t("classOptions.grad") },
  ];

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: typeof errors = {};
    const required: (keyof FormState)[] = [
      "ad_soyad",
      "ogrenci_no",
      "bolum",
      "sinif",
      "eposta",
      "telefon",
    ];
    for (const key of required) {
      if (!String(form[key]).trim()) next[key] = t("errors.required");
    }
    if (form.eposta && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.eposta)) {
      next.eposta = t("errors.email");
    }
    if (!form.kvkk_onay) next.kvkk_onay = t("errors.kvkk");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    const supabase = getBrowserClient();
    if (!supabase) {
      setStatus("error");
      setErrors({ kvkk_onay: undefined });
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("uyelik_basvurulari").insert({
      ad_soyad: form.ad_soyad.trim(),
      ogrenci_no: form.ogrenci_no.trim(),
      bolum: form.bolum.trim(),
      sinif: form.sinif,
      eposta: form.eposta.trim(),
      telefon: form.telefon.trim(),
      motivasyon: form.motivasyon.trim() || null,
      kvkk_onay: true,
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-copper/50 bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-copper text-white">
          <Check size={26} />
        </div>
        <h2 className="display mt-5 text-2xl">{t("successTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("successText")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("fields.name")} error={errors.ad_soyad}>
          <input
            className={inputCls}
            value={form.ad_soyad}
            onChange={(e) => set("ad_soyad", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label={t("fields.studentNo")} error={errors.ogrenci_no}>
          <input
            className={inputCls}
            value={form.ogrenci_no}
            onChange={(e) => set("ogrenci_no", e.target.value)}
            inputMode="numeric"
          />
        </Field>
        <Field label={t("fields.department")} error={errors.bolum}>
          <input
            className={inputCls}
            value={form.bolum}
            onChange={(e) => set("bolum", e.target.value)}
          />
        </Field>
        <Field label={t("fields.classYear")} error={errors.sinif}>
          <select
            className={inputCls}
            value={form.sinif}
            onChange={(e) => set("sinif", e.target.value)}
          >
            <option value="" disabled hidden />
            {classOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("fields.email")} error={errors.eposta}>
          <input
            type="email"
            className={inputCls}
            value={form.eposta}
            onChange={(e) => set("eposta", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label={t("fields.phone")} error={errors.telefon}>
          <input
            type="tel"
            className={inputCls}
            value={form.telefon}
            onChange={(e) => set("telefon", e.target.value)}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label={t("fields.motivation")}>
        <textarea
          className={`${inputCls} min-h-28 resize-y`}
          value={form.motivasyon}
          onChange={(e) => set("motivasyon", e.target.value)}
          placeholder={t("fields.motivationPlaceholder")}
        />
      </Field>

      <div className="rounded-xl border border-line bg-surface p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.kvkk_onay}
            onChange={(e) => set("kvkk_onay", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#b06c3b]"
          />
          <span className="text-xs leading-relaxed text-muted">
            <strong className="mb-0.5 block text-foreground">
              {t("kvkkLabel")}
            </strong>
            {t("kvkkText")}
          </span>
        </label>
        {errors.kvkk_onay && (
          <p className="mt-2 text-xs text-copper">{errors.kvkk_onay}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-copper">
          {getBrowserClient() ? t("errors.generic") : tc("configMissing")}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="rounded-full bg-copper px-8 py-4 text-sm font-bold tracking-[0.02em] text-white transition-colors hover:bg-copper-dark disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </div>
  );
}
