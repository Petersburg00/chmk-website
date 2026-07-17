import { Youtube } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function YouTubeFeature({
  title,
  subscribeLabel,
}: {
  title: string;
  subscribeLabel: string;
}) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-black">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${siteConfig.youtube.featuredVideoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <h3 className="display text-2xl md:text-3xl">{title}</h3>
        <a
          href={siteConfig.youtube.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-copper-dark"
        >
          <Youtube size={18} /> {subscribeLabel}
        </a>
      </div>
    </div>
  );
}
