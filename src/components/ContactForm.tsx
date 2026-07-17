"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-copper";

/** Backend gerektirmeyen basit form: mesaji mailto ile e-posta uygulamasinda acar. */
export default function ContactForm() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const open = () => {
    const subject = encodeURIComponent(`[Web] ${name || "İletişim"}`);
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className={inputCls}
          placeholder={t("form.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={inputCls}
          type="email"
          placeholder={t("form.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <textarea
        className={`${inputCls} min-h-32 resize-y`}
        placeholder={t("form.message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="button"
        onClick={open}
        className="justify-self-start rounded-full border border-copper px-6 py-3 text-sm font-bold text-copper transition-colors hover:bg-copper hover:text-white"
      >
        {t("form.send")}
      </button>
      <p className="text-xs text-muted">{t("formNote")}</p>
    </div>
  );
}
