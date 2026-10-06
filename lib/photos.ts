// Site photos, referenced by key from the data files (e.g. `photo: "booth"`).

import fitting from "@/public/images/hero-hearing-aid-fitting.webp";
import booth from "@/public/images/hearing-test-booth.webp";
import child from "@/public/images/child-hearing-test.webp";
import speech from "@/public/images/speech-therapy.webp";
import tinnitus from "@/public/images/tinnitus-counselling.webp";
import repair from "@/public/images/hearing-aid-repair.webp";
import snoring from "@/public/images/snoring-consultation.webp";

export const photos = {
  fitting: { src: fitting, alt: "Audiologist fitting a hearing aid on a patient", position: "object-center" },
  booth: { src: booth, alt: "Sound-treated hearing test booth with an audiometer", position: "object-[center_20%]" },
  child: { src: child, alt: "Young girl wearing headphones during a hearing test while an audiologist runs the audiometer", position: "object-[65%_40%]" },
  speech: { src: speech, alt: "Speech therapist working with a young boy using picture cards", position: "object-[center_35%]" },
  repair: { src: repair, alt: "Technician repairing a behind-the-ear hearing aid with fine tools under a magnifier lamp", position: "object-[35%_center]" },
  snoring: { src: snoring, alt: "Doctor explaining sleep study results and the upper airway to a couple during a snoring consultation", position: "object-[55%_center]" },
  tinnitus: { src: tinnitus, alt: "Audiologist explaining tinnitus to a patient using an ear diagram on screen and a printed guide", position: "object-[40%_center]" },
};

export type PhotoKey = keyof typeof photos;
