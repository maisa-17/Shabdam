// Hearing aid catalogue for the /hearing-aids page. Values in [brackets] still need confirming with the clinic.

import { site } from "./site";

export type AidType = "BTE" | "RIC" | "ITE" | "ITC" | "CIC" | "IIC";

export type HearingAidStyle = { code: string; name: string; desc: string };

export type HearingAid = {
  name: string;
  brand: (typeof site.brands)[number];
  type: AidType;
  tags: string[];
  price: string;
};

export const perks = ["Free hearing aid trial", "Free 3rd-year warranty", "EMI options [confirm]"];

export const styles: HearingAidStyle[] = [
  { code: "BTE", name: "Behind-the-Ear", desc: "Powerful and durable. Suits mild to profound loss." },
  { code: "RIC", name: "Receiver-in-Canal", desc: "Small, discreet and very popular." },
  { code: "ITE", name: "In-the-Ear", desc: "Custom-made shell, easy to handle." },
  { code: "ITC", name: "In-the-Canal", desc: "Custom and smaller, partly in the canal." },
  { code: "CIC", name: "Completely-in-Canal", desc: "Sits deep in the canal, barely visible." },
  { code: "IIC", name: "Invisible-in-Canal", desc: "The most discreet option available." },
];

export const hearingAids: HearingAid[] = [
  { name: "[Model name]", brand: "Signia", type: "RIC", tags: ["Rechargeable", "Bluetooth"], price: "From ₹[PRICE]" },
  { name: "[Model name]", brand: "Phonak", type: "RIC", tags: ["Rechargeable", "Bluetooth"], price: "From ₹[PRICE]" },
  { name: "[Model name]", brand: "Widex", type: "RIC", tags: ["AI sound", "App control"], price: "From ₹[PRICE]" },
  { name: "[Model name]", brand: "ReSound", type: "BTE", tags: ["Power", "Bluetooth"], price: "From ₹[PRICE]" },
  { name: "[Model name]", brand: "Starkey", type: "CIC", tags: ["Invisible", "Custom"], price: "From ₹[PRICE]" },
  { name: "[Model name]", brand: "Oticon", type: "RIC", tags: ["Rechargeable", "Bluetooth"], price: "From ₹[PRICE]" },
];

export const accessories = [
  { name: "TV Streamers", desc: "Stream TV sound straight to your hearing aids." },
  { name: "Remote Microphones", desc: "Hear a speaker clearly across a noisy room." },
  { name: "Wireless Accessories", desc: "Phone clips, remotes and other add-ons." },
  { name: "Charging Cases", desc: "Spare and travel chargers for rechargeable models." },
  { name: "UV Drying Systems", desc: "Dry and clean your hearing aids overnight." },
];

export const whatsappLink = (text: string) => `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
