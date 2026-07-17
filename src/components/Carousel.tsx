"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Share2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type Slide = {
  image: string;
  title: string;
  text: string;
  href: string;
  cta: string;
};

export default function Carousel({
  slides,
  shareLabel,
  copiedLabel,
}: {
  slides: Slide[];
  shareLabel: string;
  copiedLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [copied, setCopied] = useState(false);
  const slide = slides[index];

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + slides.length) % slides.length);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: slide.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      /* kullanici iptal etti */
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-[#0c0a08] text-white">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0"
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="wrap relative flex h-full flex-col justify-end pb-14">
        <h2 className="display max-w-3xl text-4xl md:text-6xl">{slide.title}</h2>
        <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">
          {slide.text}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-black transition-colors hover:bg-copper hover:text-white"
          >
            {slide.cta} <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            onClick={share}
            aria-label={shareLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-copper hover:text-copper"
          >
            <Share2 size={16} />
          </button>
          {copied && (
            <span className="text-xs text-white/70">{copiedLabel}</span>
          )}
        </div>
      </div>

      {/* Slayt numarasi */}
      <div
        className="display absolute right-5 top-6 text-5xl text-white/25 md:right-10 md:text-7xl"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Oklar */}
      <div className="absolute bottom-14 right-5 flex gap-2 md:right-10">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-copper hover:text-copper"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-copper hover:text-white"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
