"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { thumb, watchUrl, type Video } from "@/lib/videos";
import ShortPlayer from "./ShortPlayer";

export default function VideoSpotlight({ videos }: { videos: Video[] }) {
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState(false);
  const featured = videos[current];
  const side = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  // On desktop, match the player height to the "Up next" column beside it (width follows 9:16).
  useEffect(() => {
    const el = side.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => setHeight(wide.matches ? el.offsetHeight : null);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    wide.addEventListener("change", update);
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
      <div
        className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0 lg:max-w-none"
        style={height ? { height, width: (height * 9) / 16 } : undefined}
      >
        <ShortPlayer key={featured.id} video={featured} autoplay={chosen} className="h-full w-full rounded-[22px]" />
      </div>
      <div ref={side} className="flex w-full min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold tracking-[0.1em] text-blush uppercase">Now showing · {featured.meta}</span>
          <span className="font-display text-2xl font-extrabold text-white md:text-[28px]">{featured.title}</span>
          <a href={watchUrl(featured.id)} target="_blank" rel="noopener noreferrer" className="self-start text-[15px] font-bold text-blush-soft hover:text-white">
            Watch on YouTube ↗
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[15px] font-bold tracking-[0.1em] text-blush uppercase">Up next</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {videos.map((v, i) =>
              i === current ? null : (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setCurrent(i);
                    setChosen(true);
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                >
                  <span className="relative h-24 w-[54px] shrink-0 overflow-hidden rounded-lg bg-maroon-2">
                    <Image src={thumb(v.id)} alt="" fill sizes="54px" className="object-cover" />
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-base leading-snug font-bold text-white">{v.title}</span>
                    <span className="text-sm text-blush-soft">{v.meta}</span>
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
