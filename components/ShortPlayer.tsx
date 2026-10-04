import { embed, type Video } from "@/lib/videos";

// A 9:16 YouTube Short embedded with the YouTube player.
export default function ShortPlayer({
  video,
  autoplay = false,
  className = "",
}: {
  video: Video;
  autoplay?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[9/16] overflow-hidden rounded-[18px] bg-ink ${className}`}>
      <iframe
        src={embed(video.id, autoplay)}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
