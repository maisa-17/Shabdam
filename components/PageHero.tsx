import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

// Dark header for inner pages, pulled up under the floating navbar like the home hero.
export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-[radial-gradient(circle_at_80%_40%,#3a0a0e_0%,#170507_60%,#0c0204_100%)] md:-mt-24">
      <div
        className={`mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-20 ${aside ? "lg:grid-cols-[1.1fr_1fr] lg:gap-14" : ""}`}
      >
        <div className="flex flex-col gap-6">
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className="bg-[linear-gradient(100deg,#ffffff_45%,#ff6b74_80%,#e3000f_100%)] bg-clip-text pb-1 font-display text-[42px] leading-[1.02] font-extrabold tracking-[-0.035em] text-transparent md:text-[60px]">
            {title}
          </h1>
          {intro && <p className="max-w-[620px] text-lg leading-relaxed text-[#e9cfd1] md:text-[19px]">{intro}</p>}
          {children && <div className="flex flex-wrap gap-4">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
