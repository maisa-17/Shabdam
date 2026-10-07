"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/hearing-aids";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Enquiry form. There is no backend yet, so submitting opens WhatsApp with the details filled in.

const topics = ["Hearing test", "Hearing aids", "Repair / service", "Prices", "Something else"];

const field =
  "w-full rounded-xl border border-line bg-cream px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-4/70 focus:border-brand-dark focus:bg-white focus:ring-4 focus:ring-brand/10";
const label = "text-[13px] font-bold tracking-[0.08em] text-ink-4 uppercase";

// A row of pill-shaped radio buttons.
function Pills({ name, options, value, onChange }: { name: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20",
            value === o ? "border-maroon bg-maroon text-white" : "border-line bg-white text-ink-2 hover:border-brand-dark hover:text-brand-dark"
          )}
        >
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
          {o}
        </label>
      ))}
    </div>
  );
}

export default function EnquiryForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [branch, setBranch] = useState<string>(site.branches[0].name);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      "Hi Shabdham, I have an enquiry.",
      `Topic: ${topic}`,
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Branch: ${branch}`,
      `Message: ${d.get("message") || "-"}`,
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7">
      <fieldset className="flex flex-col gap-3">
        <legend className={cn(label, "mb-3")}>What&apos;s it about?</legend>
        <Pills name="topic" options={topics} value={topic} onChange={setTopic} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={label}>Full name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+\s\-]{8,15}"
            title="Enter a valid phone number"
            placeholder="+91"
            className={field}
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={cn(label, "mb-3")}>Preferred branch</legend>
        <Pills name="branch" options={site.branches.map((b) => b.name)} value={branch} onChange={setBranch} />
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className={label}>
          Message <span className="font-medium tracking-normal normal-case">(optional)</span>
        </span>
        <textarea name="message" rows={4} className={cn(field, "resize-none")} placeholder="Tell us a little more" />
      </label>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-4" aria-live="polite">
          {sent ? "WhatsApp has opened with your message — just press send." : "Your enquiry opens in WhatsApp, ready to send."}
        </p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border-2 border-brand bg-brand px-7 py-3.5 text-[17px] font-bold text-white transition-colors hover:border-brand-dark hover:bg-brand-dark"
        >
          Send enquiry
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
