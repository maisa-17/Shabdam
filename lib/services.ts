// Service categories and sub-services. Values in [brackets] still need confirming with the clinic.

import type { PhotoKey } from "./photos";
import type { Video } from "./videos";

export type SubService = { slug: string; name: string; desc: string };
export type Faq = { q: string; a: string };
export type VisitStep = { title: string; desc: string };
export type Milestone = { age: string; signs: string[] };

export type ServiceCategory = {
  slug: string;
  num: string;
  title: string;
  short: string; // one-line summary for cards
  /** Categories without their own page link elsewhere (e.g. the Hearing Aids catalogue). */
  externalHref?: string;
  intro?: string;
  imageLabel?: string;
  photo?: PhotoKey;
  whoTitle?: string;
  who?: string[];
  milestones?: Milestone[];
  subs: SubService[];
  steps?: VisitStep[];
  faqs?: Faq[];
  videoTopics?: Video["topic"][];
};

export const categories: ServiceCategory[] = [
  {
    slug: "hearing-tests",
    num: "01",
    title: "Hearing Tests & Diagnostics",
    short: "PTA, impedance and OAE tests in a sound-treated room.",
    intro:
      "Accurate, painless hearing tests for every age — from newborn screening to detailed adult assessments — carried out by qualified audiologists in a sound-treated room.",
    photo: "booth",
    whoTitle: "When to get your hearing tested",
    who: [
      "You often ask people to repeat themselves",
      "Others say the TV is too loud",
      "Conversations in busy places are hard to follow",
      "You hear ringing or buzzing in your ears",
      "You work around loud noise",
      "You are over 50 and haven't had a check recently",
    ],
    subs: [
      { slug: "pta", name: "Pure Tone Audiometry (PTA)", desc: "Finds the softest sounds you can hear at each pitch and maps them on an audiogram." },
      { slug: "digital-audiometry", name: "Digital Audiometry", desc: "Computer-based testing for precise, repeatable results that are easy to compare over time." },
      { slug: "speech-audiometry", name: "Speech Audiometry", desc: "Checks how clearly you hear and understand speech, not just tones." },
      { slug: "hearing-loss-assessment", name: "Hearing Loss Assessment", desc: "A complete look at the type and degree of hearing loss, with clear next steps." },
      { slug: "tympanometry", name: "Tympanometry", desc: "Checks how your eardrum moves, to look for fluid, wax or middle-ear problems." },
      { slug: "impedance-audiometry", name: "Impedance Audiometry", desc: "Tympanometry plus acoustic reflex tests for a fuller picture of middle-ear health." },
      { slug: "oae", name: "Otoacoustic Emissions (OAE)", desc: "A quick, painless check of the inner ear — ideal for newborns and young children." },
      { slug: "newborn-screening", name: "Newborn Hearing Screening", desc: "Painless screening in the first weeks of life, often done while the baby sleeps." },
    ],
    steps: [
      { title: "Case history", desc: "We ask about your hearing concerns, health and noise exposure." },
      { title: "Ear examination", desc: "A quick look in the ear canal to check for wax or infection." },
      { title: "Testing", desc: "The right tests for your age and concern, in a sound-treated room." },
      { title: "Results explained", desc: "Your audiogram in plain language, with honest options." },
    ],
    faqs: [
      { q: "Does a hearing test hurt?", a: "No. All our hearing tests are painless and non-invasive." },
      { q: "How long does it take?", a: "Most adult hearing assessments take about [30–45 minutes — confirm]." },
      { q: "Do I need a doctor's referral?", a: "No. You can book a hearing test with us directly." },
      { q: "Will I get a report?", a: "Yes. You receive your audiogram, and the audiologist explains what it means and what to do next." },
    ],
    videoTopics: ["education"],
  },
  {
    slug: "hearing-aid-fitting",
    num: "02",
    title: "Hearing Aid Consultation & Fitting",
    short: "Free trial, precise programming and real-ear verified fitting.",
    intro:
      "The right hearing aid depends on your test results, lifestyle and budget — not a sales pitch. We help you compare options, try before you decide, and fit your device precisely.",
    photo: "fitting",
    whoTitle: "Who it's for",
    who: [
      "Your hearing test shows a loss that hearing aids can help",
      "Your current hearing aid isn't clear or comfortable",
      "You want to move to rechargeable or Bluetooth hearing aids",
      "You're helping a family member choose a hearing aid",
    ],
    subs: [
      { slug: "audiologist-consultation", name: "Audiologist Consultation", desc: "A one-to-one review of your hearing results, daily routine and listening needs." },
      { slug: "hearing-aid-counseling", name: "Hearing Aid Counseling", desc: "Honest guidance on styles, features and budgets, so you can choose with confidence." },
      { slug: "digital-hearing-aid-fitting", name: "Digital Hearing Aid Fitting", desc: "Your hearing aid set up to your hearing prescription using the manufacturer's software." },
      { slug: "programming-fine-tuning", name: "Programming & Fine Tuning", desc: "Adjustments over the first weeks as you get used to hearing more." },
      { slug: "real-ear-adjustments", name: "Real-Ear Adjustments", desc: "Real-ear measurement checks the sound inside your own ear, so the settings match your prescription." },
      { slug: "free-trial", name: "Free Hearing Aid Trial", desc: "Try a hearing aid in your daily life before you decide. [Confirm trial length]" },
    ],
    steps: [
      { title: "Review your needs", desc: "We go through your test results and the situations you find hardest." },
      { title: "Compare options", desc: "Styles and features from six global brands." },
      { title: "Free trial", desc: "Wear a hearing aid in everyday life before deciding." },
      { title: "Fitting & real-ear check", desc: "Precise programming, verified inside your ear." },
      { title: "Follow-up", desc: "Fine-tuning visits as you settle in." },
    ],
    faqs: [
      { q: "Can I try a hearing aid before buying?", a: "Yes. We offer a free hearing aid trial. [Confirm trial length and conditions]" },
      { q: "Which brands do you offer?", a: "Signia, Phonak, Widex, ReSound, Starkey and Oticon." },
      { q: "How long does it take to get used to a hearing aid?", a: "Most people adjust over a few weeks. We schedule follow-up visits to fine-tune the settings." },
    ],
    videoTopics: ["hearing-aids"],
  },
  {
    slug: "hearing-aids",
    num: "03",
    title: "Hearing Aids",
    short: "BTE, RIC, invisible, rechargeable and Bluetooth hearing aids from 6 brands.",
    externalHref: "/hearing-aids",
    subs: [
      { slug: "bte", name: "BTE Hearing Aids", desc: "" },
      { slug: "ric", name: "RIC / RIE Hearing Aids", desc: "" },
      { slug: "in-ear", name: "IIC · CIC · ITC · ITE", desc: "" },
      { slug: "rechargeable", name: "Rechargeable Hearing Aids", desc: "" },
      { slug: "bluetooth", name: "Bluetooth Hearing Aids", desc: "" },
    ],
  },
  {
    slug: "repair-maintenance",
    num: "04",
    title: "Repair & Maintenance",
    short: "Cleaning, reprogramming, firmware updates and batteries.",
    intro: "Keep your hearing aids working like new. We clean, service and repair hearing aids, and help with batteries, domes and accessories.",
    imageLabel: "Photo · hearing aid repair",
    photo: "repair",
    whoTitle: "Bring your hearing aid in if",
    who: [
      "It sounds weak, distorted or whistles",
      "It has stopped working or won't charge",
      "It needs cleaning, new domes or wax guards",
      "Your hearing has changed and the settings need updating",
    ],
    subs: [
      { slug: "repair", name: "Repair Services", desc: "Diagnosis and repair of common faults, or manufacturer repair when needed." },
      { slug: "cleaning", name: "Cleaning & Servicing", desc: "A thorough professional clean and check to restore clear sound." },
      { slug: "reprogramming", name: "Reprogramming", desc: "Settings updated to match changes in your hearing or listening needs." },
      { slug: "firmware", name: "Firmware Updates", desc: "The latest manufacturer software for better performance and features." },
      { slug: "batteries-accessories", name: "Battery & Accessory Replacement", desc: "Batteries, domes, wax guards, tubes and chargers." },
    ],
    steps: [
      { title: "Check", desc: "We find out what's wrong with a quick inspection and listening check." },
      { title: "Clean", desc: "Wax and moisture are removed and small parts replaced." },
      { title: "Repair or reprogram", desc: "Fixed in clinic where possible, or sent to the manufacturer." },
      { title: "Test", desc: "We test the hearing aid with you before you leave." },
    ],
    faqs: [
      { q: "Do you service hearing aids bought elsewhere?", a: "We service most major brands. Bring your hearing aid in and we'll check it. [Confirm]" },
      { q: "How often should a hearing aid be serviced?", a: "A professional clean and check every 3–6 months keeps it working well." },
      { q: "Can it be fixed the same day?", a: "Many cleaning and reprogramming jobs are done during your visit. Some repairs need to go to the manufacturer. [Confirm typical times]" },
    ],
    videoTopics: ["care"],
  },
  {
    slug: "tinnitus",
    num: "05",
    title: "Tinnitus Management",
    short: "Assessment, sound therapy and counselling for ringing ears.",
    intro:
      "Ringing, buzzing or hissing in the ears can be stressful. We assess your hearing and tinnitus, then build a plan with sound therapy and counselling to make it easier to live with.",
    imageLabel: "Photo · tinnitus counselling",
    photo: "tinnitus",
    whoTitle: "Who it's for",
    who: [
      "Ringing, buzzing, humming or hissing in one or both ears",
      "Tinnitus that affects your sleep or concentration",
      "Tinnitus together with hearing loss",
      "Tinnitus that started after loud noise",
    ],
    subs: [
      { slug: "tinnitus-assessment", name: "Tinnitus Assessment", desc: "A hearing test and a detailed look at your tinnitus and how it affects you." },
      { slug: "sound-therapy", name: "Sound Therapy", desc: "Gentle background sound to make tinnitus less noticeable." },
      { slug: "noise-masking", name: "Noise Masking", desc: "Devices and settings that help cover the tinnitus sound." },
      { slug: "tinnitus-counseling", name: "Counseling", desc: "Practical strategies to reduce stress and the impact of tinnitus." },
    ],
    steps: [
      { title: "Assessment", desc: "A hearing test plus questions about your tinnitus." },
      { title: "Understanding it", desc: "We explain what's likely causing it and what helps." },
      { title: "Your plan", desc: "Sound therapy, counselling and, if needed, hearing aids." },
      { title: "Review", desc: "Follow-ups to check progress and adjust the plan." },
    ],
    faqs: [
      { q: "Can tinnitus be cured?", a: "There's often no single cure, but many people find tinnitus much less bothersome with sound therapy, counselling and, where needed, hearing aids." },
      { q: "Do hearing aids help with tinnitus?", a: "If you also have hearing loss, hearing aids often make tinnitus less noticeable." },
      { q: "When should I see a doctor?", a: "If tinnitus is in one ear only, pulses with your heartbeat, or came with sudden hearing loss or dizziness, see an ENT doctor promptly." },
    ],
  },
  {
    slug: "pediatric",
    num: "06",
    title: "Children's Hearing & Speech",
    short: "Newborn screening, pediatric fitting and family counselling.",
    intro:
      "From newborn hearing screening to speech therapy, we help children hear, talk and learn with confidence — with parents involved at every step.",
    photo: "child",
    milestones: [
      { age: "0–3 months", signs: ["Startles or wakes at loud sounds", "Calms to a familiar voice"] },
      { age: "4–6 months", signs: ["Turns eyes toward sounds", "Babbles and makes cooing sounds"] },
      { age: "7–12 months", signs: ["Turns when you call their name", "Says simple words like “mama” by 12 months"] },
      { age: "1–2 years", signs: ["Follows simple instructions", "Uses two-word phrases by age 2"] },
    ],
    subs: [
      { slug: "newborn-screening", name: "Newborn Hearing Screening", desc: "Quick, painless OAE screening in the first weeks of life." },
      { slug: "oae-bera", name: "OAE & BERA Tests", desc: "Objective tests that work even while your baby sleeps." },
      { slug: "child-hearing-evaluation", name: "Child Hearing Evaluation", desc: "Age-appropriate testing for toddlers and school children." },
      { slug: "pediatric-fitting", name: "Pediatric Hearing Aid Fitting", desc: "Child-safe devices, fitted and monitored as your child grows." },
      { slug: "child-speech-therapy", name: "Speech Therapy", desc: "Articulation, fluency and language therapy for delayed speech." },
      { slug: "family-counseling", name: "Family Counseling", desc: "Clear guidance for parents on results, choices and home practice." },
    ],
    steps: [
      { title: "Parent interview", desc: "Birth history, milestones and your concerns." },
      { title: "Play-based testing", desc: "Tests matched to your child's age." },
      { title: "Results & plan", desc: "We explain findings and next steps clearly." },
      { title: "Therapy & follow-up", desc: "Regular sessions and progress reviews." },
    ],
    faqs: [
      { q: "At what age can hearing be tested?", a: "At any age. Newborns can be screened within days of birth with painless OAE or BERA tests." },
      { q: "Are the tests painful?", a: "No. They are painless, and many are done while the baby is asleep." },
      { q: "My child isn't talking yet. Should we wait?", a: "Don't wait. If speech seems late, a hearing and speech check is the right first step." },
      { q: "How long does speech therapy take?", a: "It depends on the child. The therapist sets goals after the first evaluation and reviews progress regularly." },
    ],
  },
  {
    slug: "speech-therapy",
    num: "07",
    title: "Speech Therapy & Rehabilitation",
    short: "Articulation, fluency and voice therapy for children and adults.",
    intro:
      "Our speech-language pathologists help children and adults communicate with confidence — from first words and clear speech to stammering, voice problems and listening skills after hearing loss.",
    photo: "speech",
    whoTitle: "Who it's for",
    who: [
      "Late talking or unclear speech in children",
      "Stammering or stuttering",
      "A hoarse, strained or tired voice",
      "Trouble understanding speech, even with hearing aids",
    ],
    subs: [
      { slug: "articulation", name: "Articulation Therapy", desc: "Help with saying sounds and words clearly." },
      { slug: "fluency", name: "Fluency Therapy", desc: "Techniques to manage stammering and speak more smoothly." },
      { slug: "voice", name: "Voice Therapy", desc: "Exercises and habits for a healthier, stronger voice." },
      { slug: "auditory-rehabilitation", name: "Auditory Rehabilitation", desc: "Rebuilding listening skills after hearing loss or a new hearing aid." },
      { slug: "hearing-training", name: "Hearing Training", desc: "Structured practice to understand speech better in daily life." },
    ],
    steps: [
      { title: "Evaluation", desc: "A speech and language assessment by a speech-language pathologist." },
      { title: "Goals & plan", desc: "Clear, realistic goals agreed with you or your family." },
      { title: "Therapy sessions", desc: "Regular one-to-one sessions." },
      { title: "Home practice & review", desc: "Activities to practise at home and regular progress reviews." },
    ],
    faqs: [
      { q: "What age can a child start speech therapy?", a: "As early as needed. If you're worried about your child's speech, an evaluation is the right first step." },
      { q: "How long does therapy take?", a: "It depends on the goals. Progress is reviewed regularly and the plan adjusted." },
      { q: "Can parents join the sessions?", a: "Yes. Parents are encouraged to take part and practise at home." },
    ],
  },
  {
    slug: "ear-protection",
    num: "08",
    title: "Custom Ear Protection",
    short: "Custom swim plugs, noise plugs, musician plugs and ear moulds.",
    intro: "Ear plugs and moulds made to the shape of your ears — comfortable for hours and far more effective than one-size-fits-all foam plugs.",
    imageLabel: "Photo · custom ear moulds",
    whoTitle: "Who it's for",
    who: ["Swimmers, and children prone to ear infections", "People who work in noisy places", "Musicians and sound engineers", "Hearing aid users who need custom moulds"],
    subs: [
      { slug: "swim-plugs", name: "Swim Plugs", desc: "Keep water out of the ears while swimming or bathing." },
      { slug: "noise-plugs", name: "Noise Protection Ear Plugs", desc: "Protect your hearing in loud workplaces, events and travel." },
      { slug: "musician-plugs", name: "Musician Ear Plugs", desc: "Lower the volume evenly so music still sounds natural." },
      { slug: "ear-moulds", name: "Custom Ear Moulds", desc: "Comfortable, secure moulds for hearing aids and earphones." },
    ],
    steps: [
      { title: "Ear check", desc: "We check the ear canal is clear and healthy." },
      { title: "Impression", desc: "A soft impression is taken of your ear." },
      { title: "Made for you", desc: "Your plugs or moulds are made to that exact shape." },
      { title: "Fitting", desc: "We check the fit and comfort with you." },
    ],
    faqs: [
      { q: "How are custom plugs made?", a: "We take a soft impression of your ear canal, and the plugs are made to that exact shape." },
      { q: "How long do they take?", a: "[Confirm turnaround time]" },
      { q: "Are they comfortable?", a: "Yes. Because they're made to your ear shape, they fit snugly without pressure." },
    ],
  },
  {
    slug: "accessories",
    num: "09",
    title: "Accessories & Assistive Devices",
    short: "TV streamers, remote microphones, chargers and drying systems.",
    externalHref: "/hearing-aids#accessories",
    subs: [
      { slug: "tv-streamers", name: "TV Streamers", desc: "" },
      { slug: "remote-microphones", name: "Remote Microphones", desc: "" },
      { slug: "wireless-accessories", name: "Wireless Accessories", desc: "" },
      { slug: "charging-cases", name: "Charging Cases", desc: "" },
      { slug: "uv-drying", name: "UV Drying Systems", desc: "" },
    ],
  },
];

/** Categories that have their own page at /services/[slug]. */
export const pageCategories = categories.filter((c) => !c.externalHref);

export const getCategory = (slug: string) => pageCategories.find((c) => c.slug === slug);

export const categoryHref = (c: ServiceCategory) => c.externalHref ?? `/services/${c.slug}`;

export const subHref = (c: ServiceCategory, s: SubService) => (c.externalHref ? c.externalHref : `/services/${c.slug}#${s.slug}`);
