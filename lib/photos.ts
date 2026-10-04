// Site photos, referenced by key from the data files (e.g. `photo: "booth"`).

import fitting from "@/public/images/hero-hearing-aid-fitting.webp";
import booth from "@/public/images/hearing-test-booth.webp";
import child from "@/public/images/child-hearing-test.webp";
import speech from "@/public/images/speech-therapy.webp";

export const photos = {
  fitting: { src: fitting, alt: "Audiologist fitting a hearing aid on a patient", position: "object-center" },
  booth: { src: booth, alt: "Sound-treated hearing test booth with an audiometer", position: "object-[center_20%]" },
  child: { src: child, alt: "Young girl wearing headphones during a hearing test while an audiologist runs the audiometer", position: "object-[65%_40%]" },
  speech: { src: speech, alt: "Speech therapist working with a young boy using picture cards", position: "object-[center_35%]" },
};

export type PhotoKey = keyof typeof photos;
