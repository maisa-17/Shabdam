"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/hearing-aids";
import { site } from "@/lib/site";

// Enquiry form. There is no backend yet, so submitting opens WhatsApp with the details filled in.

const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-brand-dark focus:ring-2 focus:ring-brand/20";

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      "Hi Shabdham, I have an enquiry.",
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Branch: ${d.get("branch")}`,
      `Message: ${d.get("message") || "-"}`,
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold">
          Full name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold">
          Phone number
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{8,15}" title="Enter a valid phone number" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-bold">
        Branch
        <select name="branch" className={field} defaultValue={site.branches[0].name}>
          {site.branches.map((b) => (
            <option key={b.name}>{b.name}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold">
        Message
        <textarea name="message" rows={4} className={field} placeholder="Appointments, prices, repairs or anything else" />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center self-start rounded-[10px] border-2 border-brand bg-brand px-7 py-3.5 text-[17px] font-bold text-white transition-colors hover:border-brand-dark hover:bg-brand-dark"
      >
        Send enquiry
      </button>
      <p className="text-sm text-ink-4" aria-live="polite">
        {sent ? "WhatsApp has opened with your message — just press send." : "Your enquiry opens in WhatsApp, ready to send."}
      </p>
    </form>
  );
}
