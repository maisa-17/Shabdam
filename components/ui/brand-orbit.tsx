import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Logos placed around two arcs with a centre badge; light sweeps round the arcs on hover.
// Adapted from the integrations-5 section: logo positions are computed so any number of logos fits.

type OrbitLogo = { src?: string; alt: string };

// Spread `count` points over the upper arc of a ring between two angles (degrees, 180 = left, 0 = right).
// The inner ring uses a narrower span so its logos sit between the outer ones instead of on top of them.
function arcPoints(count: number, from: number, to: number) {
  return Array.from({ length: count }, (_, i) => {
    const deg = count === 1 ? 90 : from - (i * (from - to)) / (count - 1);
    const rad = (deg * Math.PI) / 180;
    return { left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 - 50 * Math.sin(rad)}%` };
  });
}

function LogoCard({ logo, className, style }: { logo: OrbitLogo; className?: string; style?: React.CSSProperties }) {
  return (
    <li
      style={style}
      className={cn(
        "absolute z-30 flex h-9 w-17 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-xl border border-line bg-white px-2 py-1.5 shadow-md shadow-black/5 transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-28 sm:rounded-2xl sm:px-3 sm:py-2 lg:h-18 lg:w-40 lg:px-4",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- small brand SVGs of varying proportions */}
      <img src={logo.src} alt={logo.alt} className="max-h-full w-full object-contain" />
    </li>
  );
}

function Ring({ logos, inner = false }: { logos: OrbitLogo[]; inner?: boolean }) {
  const points = inner ? arcPoints(logos.length, 135, 45) : arcPoints(logos.length, 150, 30);
  const box = inner ? "inset-x-[17%] top-[21%] scale-90" : "inset-x-0 top-0";
  return (
    <>
      {/* Static ring: a top border fading out down the sides */}
      <div aria-hidden className={cn("absolute aspect-square rounded-full border-t border-ink/10 bg-linear-to-b from-ink/[0.06] to-transparent to-25%", box)} />
      {/* Light sweep, shown and spinning on hover */}
      <div
        aria-hidden
        className={cn(
          "absolute z-10 aspect-square animate-spin rounded-full border-t border-brand/20 bg-linear-to-b to-transparent to-25% opacity-0 transition-opacity duration-500 [animation-duration:3.5s] group-hover:opacity-100 motion-reduce:animate-none [@media(hover:none)]:opacity-100",
          inner ? "from-blush/30" : "from-brand/15",
          box
        )}
      />
      <ul className={cn("absolute aspect-square", box)}>
        {logos.map((logo, i) => (
          <LogoCard key={logo.alt} logo={logo} style={points[i]} />
        ))}
      </ul>
    </>
  );
}

function CenterBadge({ center }: { center: OrbitLogo }) {
  return (
    <div className="relative z-20 rounded-full border border-line bg-sand p-1">
      <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-black/10 shadow-xl shadow-black/10 sm:size-20 md:size-24">
        {/* eslint-disable-next-line @next/next/no-img-element -- small square icon */}
        <img src={center.src} alt={center.alt} className="size-full object-cover" />
      </div>
    </div>
  );
}

export function BrandOrbit({
  logos,
  center,
  title,
  description,
  action,
  className,
}: {
  logos: OrbitLogo[];
  center: OrbitLogo;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  // Outer ring gets the larger half.
  const split = Math.ceil(logos.length / 2);

  return (
    <div className={cn("mx-auto max-w-5xl", className)}>
      <div className="group relative mx-auto mt-10 aspect-2/1 max-w-xl max-sm:mx-5 sm:mt-14 lg:max-w-3xl">
        <Ring logos={logos.slice(0, split)} />
        <Ring logos={logos.slice(split)} inner />
        <div className="absolute inset-x-0 bottom-0 mx-auto my-2 flex w-fit justify-center">
          <CenterBadge center={center} />
        </div>
      </div>
      <div className="relative z-20 mx-auto mt-12 flex max-w-lg flex-col items-center gap-5 bg-linear-to-t from-cream from-55% text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-balance md:text-4xl">{title}</h2>
        {description && <p className="text-lg leading-relaxed text-ink-3">{description}</p>}
        {action}
      </div>
    </div>
  );
}
