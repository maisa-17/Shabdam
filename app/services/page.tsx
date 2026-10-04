import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { Button, Container } from "@/components/ui";
import { categories, categoryHref, subHref } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Hearing tests, hearing aid fitting, repairs, tinnitus care, children's hearing and speech therapy, snoring and sleep apnea, custom ear protection and ear care in Kochi.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Our services"
        title="11 specialities, one clinical standard."
        intro="Choose a service to see what it involves, who it helps and what to expect at your visit."
      >
        <Button href="/book-appointment">Not sure? Book a hearing test</Button>
      </PageHero>

      {/* Quick jump */}
      <nav aria-label="Service categories" className="sticky top-20 z-30 border-b border-line bg-cream/95 backdrop-blur md:top-24">
        <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink hover:border-brand-dark hover:text-brand-dark"
            >
              {c.title}
            </a>
          ))}
        </Container>
      </nav>

      <section className="py-14 md:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <article
              id={c.slug}
              key={c.slug}
              className="flex scroll-mt-48 flex-col gap-5 rounded-[22px] border border-line bg-white p-6 shadow-card md:p-8"
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
