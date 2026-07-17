import { Calendar, ExternalLink, MapPin } from "lucide-react";
import type { Etkinlik } from "@/lib/types";
import { formatDate, pick } from "@/lib/format";

export default function EventCard({
  event,
  locale,
  detailsLabel,
}: {
  event: Etkinlik;
  locale: string;
  detailsLabel: string;
}) {
  const title = pick(locale, event.baslik_tr, event.baslik_en);
  const desc = pick(locale, event.aciklama_tr, event.aciklama_en);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-copper/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-copper/30 via-olive/20 to-gold/20">
        {event.poster_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.poster_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="display flex h-full items-center justify-center p-6 text-center text-xl text-foreground/60">
            {title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold leading-snug">{title}</h3>
        <p className="flex items-center gap-2 text-xs text-muted">
          <Calendar size={14} className="text-copper" />
          {formatDate(event.tarih, locale)}
        </p>
        {event.konum && (
          <p className="flex items-center gap-2 text-xs text-muted">
            <MapPin size={14} className="text-copper" /> {event.konum}
          </p>
        )}
        {desc && (
          <p className="mt-1 line-clamp-3 text-sm text-muted">{desc}</p>
        )}
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-copper hover:underline"
          >
            {detailsLabel} <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
