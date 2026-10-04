import type { Faq } from "@/lib/services";

// Expandable questions using native <details>, so it works without JavaScript.
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-line bg-white px-6 py-5 shadow-card open:pb-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl leading-none text-brand-dark transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-base leading-relaxed text-ink-3">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
