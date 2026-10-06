import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioWaveform, Baby, Ear, Headphones, MessagesSquare, Moon, ShieldCheck, Stethoscope, Wrench, type LucideIcon } from "lucide-react";
import { GradientCard, type CardGradient } from "@/components/ui/gradient-card";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import PageHero from "@/components/PageHero";
import { Button, Container, Eyebrow, Heading, Placeholder } from "@/components/ui";
import { categoryHref, getCategory, pageCategories } from "@/lib/services";
import { photos } from "@/lib/photos";

// Decorative corner icon for each service's "What we offer" cards.
const serviceIcons: Record<string, LucideIcon> = {
  "hearing-tests": Ear,
  "hearing-aid-fitting": Headphones,
  "repair-maintenance": Wrench,
  tinnitus: AudioWaveform,
  pediatric: Baby,
  "speech-therapy": MessagesSquare,
  "snoring-sleep-apnea": Moon,
  "ear-protection": ShieldCheck,
  "ear-care": Stethoscope,
};
const cardGradients: CardGradient[] = ["rose", "sand", "blush", "peach"];
const badgeColors = ["#E3000F", "#C4000D", "#FF6B74", "#7A1820"];

export function generateStaticParams() {
  return pageCategories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCategory(slug);
  return c ? { title: c.title, description: c.intro } : {};
}

export default async function ServiceCategoryPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const c = getCategory(slug);
  if (!c) notFound();

  const others = pageCategories.filter((o) => o.slug !== c.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={`Service ${c.num}`}
        title={c.title}
        intro={c.intro}
        aside={
          c.photo ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <Image
                src={photos[c.photo].src}
                alt={photos[c.photo].alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 540px, 100vw"
                className={`object-cover ${photos[c.photo].position}`}
              />
            </div>
          ) : (
            <Placeholder label={c.imageLabel ?? "Service photo"} dark className="aspect-[4/3] rounded-[28px]" />
          )
        }
      >
        <Button href="/book-appointment">Book an appointment</Button>
        <Button href="/services" variant="outline-light">
          All services
        </Button>
      </PageHero>

      {/* Who it's for */}
      {c.milestones ? (
        <section className="py-16 md:py-24">
          <Container className="flex flex-col gap-10">
            <div className="flex max-w-[760px] flex-col gap-4">
              <Eyebrow>Who needs it</Eyebrow>
              <Heading>Milestones to watch. If your child misses one, get a check.</Heading>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.milestones.map((m) => (
                <div key={m.age} className="flex flex-col gap-3 rounded-[20px] border border-line bg-white p-6 shadow-card">
                  <span className="font-display text-xl font-extrabold text-brand-dark">{m.age}</span>
                  <ul className="flex flex-col gap-2">
                    {m.signs.map((s) => (
                      <li key={s} className="flex gap-2 text-[15px] leading-relaxed text-ink-2">
                        <span className="text-brand">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        c.who && (
          <section className="py-16 md:py-24">
            <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div className="flex flex-col gap-4">
                <Eyebrow>Who needs it</Eyebrow>
                <Heading>{c.whoTitle}</Heading>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.who.map((w) => (
                  <li key={w} className="flex gap-3 rounded-2xl border border-line bg-white p-5 text-base leading-relaxed shadow-card">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm text-brand-dark">✓</span>
                    {w}
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )
      )}

      {/* Sub-services */}
      <section className="bg-white py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>What we offer</Eyebrow>
            <Heading>{c.subs.length} services under {c.title}</Heading>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.subs.map((s, i) => {
              const Icon = serviceIcons[c.slug] ?? Ear;
              return (
                <GradientCard
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-32 target:ring-2 target:ring-brand"
                  gradient={cardGradients[i % cardGradients.length]}
                  badgeText={`${c.num} · ${String(i + 1).padStart(2, "0")}`}
                  badgeColor={badgeColors[i % badgeColors.length]}
                  title={s.name}
                  description={s.desc}
                  ctaText="Book this service"
                  ctaHref="/book-appointment"
                  icon={<Icon strokeWidth={1.5} />}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      {c.faqs && (
        <section className="py-16 md:py-24">
          <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <Eyebrow>FAQs</Eyebrow>
              <Heading>Questions people ask</Heading>
              <p className="text-base leading-relaxed text-ink-3">Can&apos;t find your answer? Call any branch or message us on WhatsApp.</p>
            </div>
            <FaqList faqs={c.faqs} />
          </Container>
        </section>
      )}

      {/* Other services */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <Heading className="md:text-4xl">Other services</Heading>
            <Link href="/services" className="font-bold text-brand-dark">
              View all services →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={categoryHref(o)}
                className="flex flex-col gap-2 rounded-[20px] border border-line bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:text-ink"
              >
                <span className="font-display text-sm font-extrabold tracking-[0.12em] text-brand">{o.num}</span>
                <span className="text-lg font-bold">{o.title}</span>
                <span className="text-sm leading-relaxed text-ink-3">{o.short}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner title="Ready to book? Visit any of our 3 branches" text="Book online, or call the branch nearest to you." />
    </>
  );
}
