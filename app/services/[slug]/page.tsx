import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import PageHero from "@/components/PageHero";
import ShortPlayer from "@/components/ShortPlayer";
import { Button, Container, Eyebrow, Heading, Placeholder } from "@/components/ui";
import { categoryHref, getCategory, pageCategories } from "@/lib/services";
import { byTopic } from "@/lib/videos";
import { photos } from "@/lib/photos";

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

  const videos = c.videoTopics ? byTopic(...c.videoTopics) : [];
  const others = pageCategories.filter((o) => o.slug !== c.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: c.title }]}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.subs.map((s) => (
              <div id={s.slug} key={s.slug} className="flex scroll-mt-32 flex-col gap-2 rounded-[20px] border border-line bg-cream p-6 target:border-brand target:bg-brand-soft">
                <span className="text-lg font-bold">{s.name}</span>
                <span className="text-[15px] leading-relaxed text-ink-3">{s.desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit steps */}
      {c.steps && (
        <section className="bg-maroon py-16 text-white md:py-24">
          <Container className="flex flex-col gap-12">
            <div className="flex max-w-[760px] flex-col gap-4">
              <Eyebrow dark>Your visit</Eyebrow>
              <Heading className="text-white">What to expect, step by step</Heading>
            </div>
            <ol className={`grid gap-8 sm:grid-cols-2 lg:gap-6 ${c.steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
              {c.steps.map((st, i) => (
                <li key={st.title} className="flex flex-col gap-3 border-t-2 border-maroon-line pt-5">
                  <span className="font-display text-4xl text-blush">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xl font-bold">{st.title}</span>
                  <span className="text-base leading-normal text-blush-soft">{st.desc}</span>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

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

      {/* Related videos */}
      {videos.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Watch</Eyebrow>
              <Heading>Short videos from our team</Heading>
            </div>
            <div className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none]">
              {videos.map((v) => (
                <div key={v.id} className="flex w-[220px] shrink-0 snap-start flex-col gap-2.5">
                  <ShortPlayer video={v} />
                  <span className="text-base leading-snug font-semibold">{v.title}</span>
                </div>
              ))}
            </div>
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
