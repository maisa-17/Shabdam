import { brandLogos } from "@/lib/home";

// Compact, borderless brand strip for in-page use (the home page uses the larger MarqueeLogoScroller card).
// Shares the .logo-marquee keyframes in globals.css: pauses on hover, stops under prefers-reduced-motion.

export default function BrandMarquee() {
  // Each half of the track must be wider than the viewport for the loop to stay seamless.
  const base = [...brandLogos, ...brandLogos];

  return (
    <div
      className="w-full overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <ul
        aria-label="Brands we fit"
        className="logo-marquee flex w-max items-center gap-14 pr-14 md:gap-20 md:pr-20"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        {/* Rendered twice so the -50% translate loops seamlessly; the copies are hidden from screen readers. */}
        {[...base, ...base].map((b, index) => (
          <li key={index} aria-hidden={index >= brandLogos.length || undefined} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- small brand SVGs of varying proportions */}
            <img
              src={b.src}
              alt={index >= brandLogos.length ? "" : b.alt}
              className="h-9 w-auto max-w-[130px] object-contain transition-transform duration-500 hover:scale-110 md:h-10"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
