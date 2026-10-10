// Hearing aid catalogue for the /hearing-aids page.

import { site } from "./site";

export type HearingAidStyle = { code: string; name: string; desc: string; image: string };

// A product in the catalogue. Images live in /public/products (taken from the clinic's product sheet).
export type Product = {
  name: string;
  brand?: string;
  type: string;
  kind: "Hearing aid" | "Charger";
  desc: string;
  image: string;
  tags: string[];
};

export const styles: HearingAidStyle[] = [
  { code: "microRIE", name: "Micro Receiver-in-Ear", desc: "The smallest receiver-in-ear style: a tiny case behind the ear with a thin wire to the receiver in the canal.", image: "/products/style-microrie.webp" },
  { code: "RIE", name: "Receiver-in-Ear", desc: "The case sits behind the ear and the speaker sits in the ear canal.", image: "/products/style-rie.webp" },
  { code: "BTE", name: "Behind-the-Ear", desc: "All the electronics sit behind the ear, with sound carried by a tube and earmould. Suits a wide range of hearing loss.", image: "/products/style-bte.webp" },
  { code: "IIC", name: "Invisible-in-Canal", desc: "Custom-made and sits deep in the ear canal, so it is practically invisible.", image: "/products/style-iic.webp" },
  { code: "CIC", name: "Completely-in-Canal", desc: "A custom shell that sits fully inside the ear canal.", image: "/products/style-cic.webp" },
  { code: "ITC", name: "In-the-Canal", desc: "A custom shell that fills the lower part of the outer ear.", image: "/products/style-itc.webp" },
];

export const products: Product[] = [
  {
    name: "ReSound Invisible Custom Hearing Aid",
    brand: "ReSound",
    type: "IIC",
    kind: "Hearing aid",
    desc: "Custom-made to sit inside the ear canal for a seamless, invisible look.",
    image: "/products/resound-invisible-custom.webp",
    tags: ["Invisible", "Custom fit", "All-day comfort"],
  },
  {
    name: "ReSound RIE Hearing Aids (pair)",
    brand: "ReSound",
    type: "RIE",
    kind: "Hearing aid",
    desc: "Wearing a pair gives clearer speech in noise, a better sense of where sounds come from and richer music.",
    image: "/products/resound-rie-pair.webp",
    tags: ["Binaural pair", "Receiver-in-ear"],
  },
  {
    name: "ReSound RIE Hearing Aid",
    brand: "ReSound",
    type: "RIE",
    kind: "Hearing aid",
    desc: "A rechargeable receiver-in-ear hearing aid, selected and fine-tuned by our audiologists after a full hearing assessment.",
    image: "/products/resound-rie-black.webp",
    tags: ["Rechargeable", "Black"],
  },
  {
    name: "Rechargeable Hearing Aid Range",
    type: "BTE · RIC · ITE",
    kind: "Hearing aid",
    desc: "Rechargeable hearing aids in behind-the-ear, receiver-in-canal and in-ear styles.",
    image: "/products/rechargeable-range.webp",
    tags: ["Rechargeable", "Multiple styles"],
  },
  {
    name: "ReSound Desktop Charger",
    brand: "ReSound",
    type: "Desktop charger",
    kind: "Charger",
    desc: "Open charging stand for a pair of rechargeable ReSound behind-the-ear or RIE hearing aids. Drop them in and charge, with no battery changes.",
    image: "/products/resound-desktop-charger.webp",
    tags: ["BTE / RIE"],
  },
  {
    name: "ReSound Premium Charger",
    brand: "ReSound",
    type: "Premium charger",
    kind: "Charger",
    desc: "Lidded charging case for RIE hearing aids that protects and charges them on the go.",
    image: "/products/resound-premium-charger.webp",
    tags: ["RIE", "Portable"],
  },
  {
    name: "ReSound Custom Charger",
    brand: "ReSound",
    type: "Custom charger",
    kind: "Charger",
    desc: "Charging case for rechargeable custom in-ear (ITE/ITC) hearing aids.",
    image: "/products/resound-custom-charger.webp",
    tags: ["ITE / ITC"],
  },
];

export const accessories = [
  { name: "TV Streamers", desc: "Stream TV sound straight to your hearing aids." },
  { name: "Remote Microphones", desc: "Hear a speaker clearly across a noisy room." },
  { name: "Wireless Accessories", desc: "Phone clips, remotes and other add-ons." },
  { name: "Charging Cases", desc: "Spare and travel chargers for rechargeable models." },
  { name: "UV Drying Systems", desc: "Dry and clean your hearing aids overnight." },
];

export const whatsappLink = (text: string) => `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
