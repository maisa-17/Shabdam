import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { Button, Container, Eyebrow, Heading, Icon } from "@/components/ui";
import { TestimonialsMinimal } from "@/components/ui/minimal-testimonial";
import { aboutStats, facilities, storyParagraphs, timeline, values } from "@/lib/about";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Shabdham is a Kochi hearing and speech centre built on careful testing, honest advice and long-term aftercare, with branches in Thoppumpady, Thrippunithura and Aluva.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Shabdham"
        title="Hearing care, done properly."
        intro="A Kochi hearing and speech centre built on careful testing, honest advice and care that continues long after your first visit."
      >
        <Button href="/book-appointment">Book a hearing test</Button>
        <Button href="/services" variant="outline-light">
          Our services
        </Button>
      </PageHero>

      {/* Story + stats */}
      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow>Our story</Eyebrow>
            <Heading>From one clinic to three branches</Heading>
            {storyParagraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((s) => (
              <div key={s.small} className="flex flex-col gap-1.5 rounded-[20px] border border-line bg-white p-6 shadow-card">
                <span className="font-display text-2xl font-extrabold break-words text-brand-dark sm:text-3xl md:text-4xl">{s.big}</span>
                <span className="text-base text-ink-3">{s.small}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>Our journey</Eyebrow>
            <Heading>Growing with Kochi</Heading>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {timeline.map((t) => (
              <li key={t.title} className="relative flex flex-col gap-2 border-t-2 border-brand pt-5">
                <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-brand" aria-hidden />
                <span className="font-display text-2xl font-extrabold text-brand-dark">{t.year}</span>
                <span className="text-lg font-bold">{t.title}</span>
                <span className="text-[15px] leading-relaxed text-ink-3">{t.desc}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-maroon py-16 text-white md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-4">
            <Eyebrow dark>Our approach</Eyebrow>
            <Heading className="text-white">What every patient can expect</Heading>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/5 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-blush">
                  <Icon d={v.icon} size={22} />
                </span>
                <span className="text-xl font-bold">{v.title}</span>
                <span className="text-base leading-relaxed text-blush-soft">{v.desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Facilities */}
      <section className="bg-white py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-4">
            <Eyebrow>Facilities</Eyebrow>
            <Heading>Equipment for accurate, scientific results</Heading>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-[20px] border border-line bg-cream p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <Icon d={f.icon} size={22} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-bold">{f.title}</span>
                  <span className="text-[15px] leading-relaxed text-ink-3">{f.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>Patient stories</Eyebrow>
            <Heading>In our patients&apos; words</Heading>
          </div>
          <TestimonialsMinimal testimonials={reviews.map((r) => ({ quote: r.text, name: r.name, role: `${r.branch} branch` }))} />
        </Container>
      </section>

      {/* Branches */}
      <section className="bg-white py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Our branches</Eyebrow>
              <Heading>Visit a branch near you</Heading>
            </div>
            <Button href="/contact" variant="outline" className="self-start md:self-auto">
              Contact & directions
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {site.branches.map((b) => (
              <div key={b.name} className="flex flex-col gap-3 rounded-[20px] border border-line bg-cream p-6">
                <span className="font-display text-2xl font-extrabold">{b.name}</span>
                <span className="text-[15px] leading-relaxed text-ink-2">{b.address}</span>
                <span className="text-sm text-ink-4">Landmark: {b.landmark}</span>
                <a href={b.phoneHref} className="mt-1 inline-flex items-center gap-2 font-bold text-brand-dark">
                  <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" size={18} />
                  {b.phone}
                </a>
                <Link href="/book-appointment" className="text-[15px] font-bold text-ink hover:text-brand-dark">
                  Book at {b.name} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-16 md:pt-24">
        <CtaBanner title="Ready to hear better?" text="Book a hearing test at any of our three branches across Kochi." />
      </div>
    </>
  );
}
