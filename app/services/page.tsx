import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";
import { categories, categoryHref, subHref } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Hearing tests, hearing aid fitting, repairs, tinnitus care, children's hearing and speech therapy, snoring and sleep apnea, custom ear protection and ear care in Kochi.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="11 specialities, one clinical standard."
        intro="Choose a service to see what it involves, who it helps and what to expect at your visit."
      />

      <section className="py-14 md:py-20">
        {/* Hover-reveal grid: hovering one card de-emphasises the others (adapted from the hover-reveal cards component). */}
        <Container className="group/cards grid gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <article
              id={c.slug}
              key={c.slug}
              className={cn(
                "relative flex scroll-mt-28 flex-col gap-5 rounded-[22px] border border-line bg-white p-6 shadow-card md:p-8",
                "transition-all duration-500 ease-in-out motion-reduce:transition-none",
                "group-hover/cards:scale-[0.97] group-hover/cards:opacity-60 group-hover/cards:blur-[2px]",
                "hover:z-10 hover:scale-[1.03]! hover:opacity-100! hover:blur-none! hover:shadow-[0_24px_60px_rgba(31,26,27,0.14)]",
                "focus-within:z-10 focus-within:scale-[1.03]! focus-within:opacity-100! focus-within:blur-none!"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-sm font-extrabold tracking-[0.12em] text-brand">{c.num}</span>
                  <h2 className="font-display text-2xl leading-tight font-extrabold tracking-[-0.01em] md:text-[26px]">
                    <Link href={categoryHref(c)} className="hover:text-brand-dark">
                      {c.title}
                    </Link>
                  </h2>
                  <p className="text-base leading-relaxed text-ink-3">{c.short}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {c.subs.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={subHref(c, s)}
                      className="inline-flex rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-maroon hover:bg-brand hover:text-white"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={categoryHref(c)} className="mt-auto self-start font-bold text-brand-dark">
                {c.externalHref ? "Browse hearing aids →" : "View service →"}
              </Link>
            </article>
          ))}
        </Container>
      </section>

      <CtaBanner title="Not sure which service you need?" text="Start with a full hearing test. We'll guide you from there." />
    </>
  );
}
