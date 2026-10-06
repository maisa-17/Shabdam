import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { PrismaHero } from "@/components/ui/prisma-hero";
import VideoSpotlight from "@/components/VideoSpotlight";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";
import { TestimonialsMinimal } from "@/components/ui/minimal-testimonial";
import { site } from "@/lib/site";
import { brandLogos, featuredServices } from "@/lib/home";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { photos } from "@/lib/photos";
import googleReviewsIcon from "@/public/google-reviews.svg";
import googleReviewsStacked from "@/public/google-reviews-stacked.svg";
import { reviews } from "@/lib/reviews";
import { byTopic } from "@/lib/videos";

export default function Home() {
  return (
    <>
      {/* Hero — pulled up under the floating header */}
      <PrismaHero />

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
            </div>
            <Button href={site.links.youtube} variant="outline-light" size="sm" className="shrink-0 self-start md:self-auto">
              Visit our YouTube channel
            </Button>
          </div>
          <VideoSpotlight videos={byTopic("education", "hearing-aids", "care", "story")} />
        </Container>
      </section>

      {/* Brands */}
      <div className="py-16 md:py-[72px]">
        <Container>
          <MarqueeLogoScroller
            title={`Genuine hearing aids from ${brandLogos.length} global brands`}
            description=""
            logos={brandLogos}
            speed="slow"
            
          />
        </Container>
      </div>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Testimonials</Eyebrow>
              <Heading>Trusted by families across Kochi</Heading>
            </div>
            <a
              href={site.links.googleReviews}
              className="inline-flex items-center gap-3 self-start rounded-full border border-line bg-white py-2 pr-5 pl-3 text-[17px] font-bold text-brand-dark shadow-card md:self-auto"
            >
              <Image src={googleReviewsIcon} alt="" unoptimized className="h-9 w-auto" />
              Read all reviews on Google →
            </a>
          </div>
          {/* Testimonial card with a matching-height Google reviews card beside it (stacked on mobile) */}
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="min-w-0 rounded-[28px] border border-line bg-white p-6 shadow-card md:p-12">
              <TestimonialsMinimal testimonials={reviews.map((r) => ({ quote: r.text, name: r.name, role: `${r.branch} branch` }))} />
            </div>
            <a
              href={site.links.googleReviews}
              aria-label="Read our reviews on Google"
              className="relative flex min-h-[300px] items-center justify-center transition-transform hover:-translate-y-1"
            >
              <Image src={googleReviewsStacked} alt="Google reviews, 5 stars" unoptimized className="absolute inset-0 size-full object-contain" />
            </a>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
