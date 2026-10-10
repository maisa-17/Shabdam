import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import { PrismaHero } from "@/components/ui/prisma-hero";
import VideoSpotlight from "@/components/VideoSpotlight";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";
import InkOrbitTestimonials from "@/components/ui/ink-orbit-testimonials";
import { site } from "@/lib/site";
import { brandLogos, featuredServices } from "@/lib/home";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { photos } from "@/lib/photos";
import googleReviewsIcon from "@/public/google-reviews.webp";
import { reviews } from "@/lib/reviews";
import { byTopic } from "@/lib/videos";

// Brand colours for the testimonials component (it is themed through CSS variables).
const testimonialTheme = {
  "--it-page": "transparent",
  "--it-hatch": "transparent",
  "--it-paper": "#ffffff",
  "--it-card": "#fbf7f5",
  "--it-raise": "#ffffff",
  "--it-ink": "#1f1a1b",
  "--it-soft": "#4a3f40",
  "--it-muted": "#6a5557",
  "--it-faint": "#e3000f",
  "--it-line": "#f0e6e4",
  "--it-line-strong": "#e6d6d4",
  "--it-bracket": "#e3000f",
  "--it-sans": "var(--font-sans)",
  "--it-shadow": "none",
  padding: 0,
} as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* Hero — pulled up under the floating header */}
      <PrismaHero />

      {/* Services */}
      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Our expertise</Eyebrow>
              <Heading>Care for every hearing need</Heading>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 self-start rounded-full bg-ink py-2 pr-2 pl-6 font-bold text-white transition-colors hover:bg-brand hover:text-white md:self-auto"
            >
              View all 9 services
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-colors group-hover:bg-white group-hover:text-brand">
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-45" strokeWidth={2.2} />
              </span>
            </Link>
          </div>

          {/* Expanding photo strip (CSS only): the hovered panel widens; the first is open until the strip is hovered. */}
          <ul className="group/strip flex flex-col gap-3 lg:h-[480px] lg:flex-row">
            {featuredServices.slice(0, 4).map((s, i) => (
              <li
                key={s.title}
                className={`relative h-44 min-w-0 overflow-hidden rounded-[28px] bg-maroon transition-[flex-grow] duration-700 ease-[cubic-bezier(.44,0,.56,1)] motion-reduce:transition-none lg:h-auto lg:basis-0 lg:grow lg:hover:grow-[2.6]! ${
                  i === 0 ? "lg:grow-[2.6] lg:group-hover/strip:grow" : ""
                }`}
              >
                <Link href={s.href} className="group absolute inset-0 isolate flex flex-col justify-between p-5 text-white hover:text-white md:p-7">
                  {s.photo && (
                    <Image
                      src={photos[s.photo].src}
                      loading={i === 0 ? "eager" : "lazy"}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className={`-z-10 object-cover transition-transform duration-700 group-hover:scale-105 ${photos[s.photo].position}`}
                    />
                  )}
                  <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,5,7,0.05)_0%,rgba(23,5,7,0.25)_45%,rgba(23,5,7,0.88)_100%)]" />
                  <span className="self-start rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[13px] font-bold tracking-[0.1em] backdrop-blur-sm">
                    0{i + 1}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="min-w-0 font-display text-2xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[28px] lg:text-[22px] xl:text-[26px]">{s.title}</span>
                    {/* On desktop the arrow only shows on the open panel, so narrow panels keep room for the title */}
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white lg:group-hover:flex! ${
                        i === 0 ? "lg:group-hover/strip:hidden" : "lg:hidden"
                      }`}
                    >
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
        <Container className="flex flex-col items-center gap-8">
          <InkOrbitTestimonials
            theme="light"
            tag="Testimonials"
            title={"Trusted by *families*\nacross Kochi."}
            testimonials={reviews.map((r) => ({ quote: r.text.join(" "), name: r.name, role: `${r.branch} branch` }))}
            logos={[]}
            avatarStyle="initials"
            className="[&_.it-h2]:font-display! [&_.it-h2]:font-extrabold! [&_.it-sec]:rounded-[22px] [&_.it-tag]:rounded-full [&_.it-tag]:font-bold [&_.it-tag]:tracking-[0.1em] [&_.it-tag]:uppercase [&_.it-quote]:min-h-0! [&_blockquote]:line-clamp-8 [&_.it-tframe]:border-0! [&_.it-c]:hidden! [&_.it-quote]:rounded-[20px]"
            style={testimonialTheme}
          />
          <a
            href={site.links.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-3 text-[17px] font-bold text-brand-dark shadow-card"
          >
            <Image src={googleReviewsIcon} alt="" unoptimized className="h-9 w-auto" />
            Read all reviews on Google →
          </a>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
