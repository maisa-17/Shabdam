import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import ParticleHero from "@/components/ParticleHero";
import VideoSpotlight from "@/components/VideoSpotlight";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";
import { TestimonialsMinimal } from "@/components/ui/minimal-testimonial";
import { site } from "@/lib/site";
import { featuredServices, processSteps } from "@/lib/home";
import { photos } from "@/lib/photos";
import { reviews } from "@/lib/reviews";
import { byTopic } from "@/lib/videos";

export default function Home() {
  return (
    <>
      {/* Hero — pulled up under the floating header */}
      <ParticleHero />

      {/* Services */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Our expertise</Eyebrow>
              <Heading>Care for every hearing need</Heading>
            </div>
            <Button href="/services" variant="outline" className="self-start md:self-auto">
              View all 11 services
            </Button>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-transform hover:-translate-y-1 hover:text-ink"
              >
                {s.photo ? (
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={photos[s.photo].src}
                      alt={photos[s.photo].alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${photos[s.photo].position}`}
                    />
                  </div>
                ) : (
                  <div className="flex h-[220px] items-center justify-center border-b border-dashed border-sand-line bg-sand text-[13px] uppercase tracking-[0.08em] text-ink-4">
                    {s.img}
                  </div>
                )}
                <span className="flex flex-col gap-2.5 px-7 pt-6 pb-7">
                  <span className="font-display text-[22px] font-extrabold tracking-[-0.01em]">{s.title}</span>
                  <span className="text-base leading-relaxed text-ink-3">{s.desc}</span>
                  <span className="mt-1 font-bold text-brand-dark">Learn more →</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Video spotlight */}
      <section id="spotlight" className="bg-maroon py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
            <div className="flex max-w-[760px] flex-col gap-4">
              <Eyebrow dark>Video spotlight</Eyebrow>
              <Heading className="text-white">See how Shabdham helps people hear again</Heading>
              <p className="text-lg leading-relaxed text-blush-soft">Short videos from our team on hearing loss, the right hearing aid for you, and how to care for it.</p>
            </div>
            <Button href={site.links.youtube} variant="outline-light" size="sm" className="shrink-0 self-start md:self-auto">
              Visit our YouTube channel
            </Button>
          </div>
          <VideoSpotlight videos={byTopic("education", "hearing-aids", "care", "story")} />
        </Container>
      </section>

      {/* Brands */}
      <section className="bg-white py-16 md:py-[72px]">
        <Container className="grid items-center gap-10 lg:grid-cols-[420px_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Eyebrow>Hearing aids</Eyebrow>
            <Heading className="md:text-4xl">Genuine hearing aids from 6 global brands</Heading>
            <Button href="/hearing-aids" variant="outline" className="self-start">
              Explore hearing aids
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {site.brands.map((b) => (
              <span key={b} className="flex h-[84px] items-center justify-center rounded-[14px] border border-dashed border-sand-line bg-cream font-bold text-ink-4">
                {b} logo
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-maroon py-16 text-white md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex max-w-[780px] flex-col gap-4">
            <Eyebrow dark>Systematic &amp; scientific</Eyebrow>
            <Heading className="text-white">Every patient follows the same proven 5-step process</Heading>
            <p className="text-lg leading-relaxed text-blush-soft">No guesswork and no pressure to buy. Each recommendation is based on your test results.</p>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((st) => (
              <li key={st.num} className="flex flex-col gap-3 border-t-2 border-maroon-line pt-5">
                <span className="font-display text-4xl text-blush">{st.num}</span>
                <span className="text-xl font-bold">{st.title}</span>
                <span className="text-base leading-normal text-blush-soft">{st.desc}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Testimonials</Eyebrow>
              <Heading>Trusted by families across Kochi</Heading>
            </div>
            <a href={site.links.googleReviews} className="text-[17px] font-bold text-brand-dark">
              Read all reviews on Google →
            </a>
          </div>
          <TestimonialsMinimal testimonials={reviews.map((r) => ({ quote: r.text, name: r.name, role: `${r.branch} branch` }))} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
