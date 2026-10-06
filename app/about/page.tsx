import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { Container, Icon, PillButton } from "@/components/ui";
import { Reveal } from "@/components/ui/reveal";
import { facilities, storyParagraphs, timeline } from "@/lib/about";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Shabdham is a Kochi hearing and speech centre built on careful testing, honest advice and long-term aftercare, with branches in Thoppumpady, Thrippunithura and Aluva.",
};

const h2 = "font-display text-[clamp(38px,5.2vw,68px)] leading-[0.98] font-semibold tracking-[-0.045em]";

// Numbered section label: "01 — Our story".
function Label({ n, children, dark = false }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <span className={`flex items-center gap-3 text-[13px] font-bold tracking-[0.14em] uppercase ${dark ? "text-[#ffb3b8]" : "text-brand-dark"}`}>
      <span className="font-display">{n}</span>
      <span className={`h-px w-10 ${dark ? "bg-[#ffb3b8]/60" : "bg-brand-dark/50"}`} />
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Shabdham"
        title="Hearing care, done properly."
        intro="A Kochi hearing and speech centre built on careful testing, honest advice and care that continues long after your first visit."
      />

      {/* Story */}
      <section className="py-20 md:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex flex-col gap-7 lg:col-span-5">
            <Label n="01">Our story</Label>
            <h2 className={h2}>From one clinic to three branches.</h2>
            {storyParagraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="relative pb-10 sm:pb-16 lg:col-span-6 lg:col-start-7">
            <div className="relative h-[420px] overflow-hidden rounded-[28px] md:h-[560px]">
              <Image
                src={photos.fitting.src}
                alt={photos.fitting.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 100vw"
                className={`object-cover ${photos.fitting.position}`}
              />
            </div>
            <div className="absolute bottom-0 -left-4 hidden h-[220px] w-[46%] overflow-hidden rounded-3xl border-8 border-cream sm:block md:-left-10">
              <Image src={photos.booth.src} alt={photos.booth.alt} fill placeholder="blur" sizes="260px" className={`object-cover ${photos.booth.position}`} />
            </div>
            <div className="absolute -top-6 right-6 flex h-28 w-28 rotate-[-8deg] flex-col items-center justify-center rounded-full bg-brand text-center text-white shadow-[0_16px_40px_rgba(227,0,15,0.35)] md:h-32 md:w-32">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase">Since</span>
              <span className="font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">{timeline[0].year}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 md:py-32">
        <Container className="flex flex-col gap-14 md:gap-20">
          <Reveal className="flex flex-col gap-6">
            <Label n="02">Our journey</Label>
            <h2 className={h2}>Growing with Kochi.</h2>
          </Reveal>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {timeline.map((t, i) => {
              const last = i === timeline.length - 1;
              return (
                <li key={t.title}>
                  <Reveal delay={i * 0.1} className="relative flex h-full flex-col gap-3 border-l-2 border-line pl-6 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-6 lg:pl-0">
                    <span className="absolute top-0 -left-[7px] flex h-3 w-3 lg:-top-[7px] lg:left-0" aria-hidden>
                      {last && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />}
                      <span className={`relative h-3 w-3 rounded-full ${last ? "bg-brand" : "bg-ink"}`} />
                    </span>
                    <span className={`font-display text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[52px] ${last ? "text-brand" : "text-ink"}`}>{t.year}</span>
                    <span className="text-lg font-bold">{t.title}</span>
                    <span className="text-[15px] leading-relaxed text-ink-3">{t.desc}</span>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Facilities */}
      <section className="relative overflow-hidden bg-[#1A0406] py-20 text-[#EFE9DD] md:py-32">
        <div className="pointer-events-none absolute -top-60 -right-40 h-[620px] w-[620px] rounded-full bg-[#C4000D] opacity-40 blur-[120px]" aria-hidden />
        <Container className="relative flex flex-col gap-14 md:gap-20">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-6">
              <Label n="03" dark>
                Facilities
              </Label>
              <h2 className={`${h2} max-w-[720px]`}>Equipment for accurate, scientific results.</h2>
            </div>
            <p className="max-w-[360px] text-lg leading-relaxed text-[#e9cfd1]/80">Every test and fitting is measured, not guessed — so your hearing aid is set for your ears.</p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Reveal className="relative min-h-[360px] overflow-hidden rounded-[24px] md:col-span-2 lg:col-span-1 lg:row-span-3">
              <Image src={photos.child.src} alt={photos.child.alt} fill placeholder="blur" sizes="(min-width: 1024px) 380px, 100vw" className={`object-cover ${photos.child.position}`} />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,3,5,.9)_0%,rgba(16,3,5,0)_60%)]" />
              <p className="absolute right-6 bottom-6 left-6 font-display text-2xl leading-tight font-semibold tracking-[-0.02em]">From newborn screening to adult fittings.</p>
            </Reveal>
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.1} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E3000F]/20 text-[#FF6B74]">
                      <Icon d={f.icon} size={22} />
                    </span>
                    <span className="font-display text-sm text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{f.title}</span>
                  <span className="text-[15px] leading-relaxed text-[#e9cfd1]/75">{f.desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Branches */}
      <section className="bg-white py-20 md:py-32">
        <Container className="flex flex-col gap-12 md:gap-16">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="flex flex-col gap-6">
              <Label n="04">Our branches</Label>
              <h2 className={h2}>Visit a branch near you.</h2>
            </div>
            <PillButton href="/contact" tone="dark" className="self-start md:self-auto">
              Contact &amp; directions
            </PillButton>
          </Reveal>

          <ul className="border-b border-line">
            {site.branches.map((b, i) => (
              <li key={b.name}>
                <Reveal delay={i * 0.08}>
                  <div className="grid gap-4 border-t border-line py-8 md:grid-cols-[72px_1fr_1.4fr_auto] md:items-center md:gap-8">
                    <span className="font-display text-sm font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{b.name}</span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[15px] leading-relaxed text-ink-2">{b.address}</span>
                      <span className="text-sm text-ink-4">Landmark: {b.landmark}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-3 md:justify-end">
                      <a
                        href={b.phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[15px] font-bold text-ink transition-colors hover:border-brand hover:text-brand-dark"
                      >
                        <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" size={16} />
                        {b.phone}
                      </a>
                      <Link href="/book-appointment" className="rounded-full bg-brand px-4 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-brand-dark hover:text-white">
                        Book here
                      </Link>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="pt-16 md:pt-24">
        <CtaBanner title="Ready to hear better?" text="Book a hearing test at any of our three branches across Kochi." />
      </div>
    </>
  );
}
