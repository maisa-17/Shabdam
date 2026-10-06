import React from "react";
import { cn } from "@/lib/utils";

// Infinitely scrolling logo strip, adapted from the marquee-logo-scroller component.
// Pauses on hover; each tile reveals a gradient on hover. Keyframes live in globals.css (.logo-marquee).

interface Logo {
  /** Logo image. Without one, the alt text is shown as a wordmark. */
  src?: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
  /** Optional call to action shown under the description. */
  action?: React.ReactNode;
}

const durationMap = {
  normal: "40s",
  slow: "80s",
  fast: "15s",
};

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = "normal", action, className, ...props }, ref) => {
    // Each half of the track must be wider than the viewport for the loop to stay seamless.
    const base = logos.length < 10 ? [...logos, ...logos] : logos;

    return (
      <section
        ref={ref}
        aria-label={title}
        className={cn("w-full overflow-hidden rounded-[28px] border border-line bg-white text-ink", className)}
        {...props}
      >
        {/* Header */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col items-center gap-4 border-b border-line pb-6 text-center md:pb-8">
            <h2 className="max-w-[820px] font-display text-3xl font-extrabold tracking-[-0.025em] text-balance md:text-4xl">{title}</h2>
            {description && <p className="max-w-[620px] text-lg leading-relaxed text-balance text-ink-3">{description}</p>}
            {action}
          </div>
        </div>

        {/* Marquee */}
        <div
          className="w-full overflow-hidden pb-6 md:pb-8"
          style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
        >
          <ul
            className="logo-marquee flex w-max items-center gap-4 py-4 pr-4"
            style={{ "--marquee-duration": durationMap[speed] } as React.CSSProperties}
          >
            {/* Rendered twice so the -50% translate loops seamlessly; the copy is hidden from screen readers. */}
            {[...base, ...base].map((logo, index) => (
              <li
                key={index}
                aria-hidden={index >= logos.length || undefined}
                className="group relative flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cream"
              >
                {/* Gradient revealed on hover */}
                <div
                  style={{ "--from": logo.gradient.from, "--via": logo.gradient.via, "--to": logo.gradient.to } as React.CSSProperties}
                  className="absolute inset-0 scale-150 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                />
                {logo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logos are small SVGs of unknown size
                  <img src={logo.src} alt={logo.alt} className="relative h-3/4 w-auto object-contain" />
                ) : (
                  <span className="relative font-display text-2xl font-extrabold tracking-[-0.02em] text-ink-2 transition-colors duration-500 group-hover:text-white">
                    {logo.alt}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };
