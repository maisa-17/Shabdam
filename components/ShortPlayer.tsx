"use client";

import Image from "next/image";
import { useState } from "react";
import { embed, thumb, type Video } from "@/lib/videos";

// A 9:16 YouTube Short. Shows the thumbnail with a play button and only loads the
// YouTube player (about 1 MB of scripts) once it's clicked, or straight away when `autoplay` is set.
export default function ShortPlayer({
  video,
  autoplay = false,
  className = "",
}: {
  video: Video;
  autoplay?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(autoplay);

  return (
    <div className={`relative aspect-9/16 overflow-hidden rounded-[18px] bg-ink ${className}`}>
      {playing ? (
        <iframe
          src={embed(video.id, true)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${video.title}`} className="group absolute inset-0 h-full w-full">
          <Image src={thumb(video.id)} alt="" fill sizes="(min-width: 1024px) 320px, 300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_rgba(227,0,15,0.45)] transition-transform duration-300 group-hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>        </button>
      )}
    </div>
  );
}
