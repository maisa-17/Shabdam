import { CallMenu, PhoneIcon } from "./CallPicker";
import { Button, Container } from "./ui";

// Closing call-to-action banner used at the bottom of pages.
export default function CtaBanner({
  title = "Visit us at Thoppumpady, Thrippunithura or Aluva",
  text = "Book a hearing test at the branch nearest to you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="flex flex-col justify-between gap-8 rounded-[28px] bg-maroon px-6 py-10 md:px-16 md:py-14 lg:flex-row lg:items-center lg:gap-12">
          <div className="max-w-[760px]">
            <h2 className="font-display text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-white md:text-[38px]">{title}</h2>
            <p className="mt-2 text-lg text-blush-soft">{text}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3.5">
            <Button href="/contact#enquiry">Book Appointment</Button>
            <CallMenu
              placement="top"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white px-7 py-3.5 text-[17px] font-bold text-white transition-colors hover:bg-white/10"
            >
              <PhoneIcon size={18} /> Call a branch
            </CallMenu>
          </div>
        </div>
      </Container>
    </section>
  );
}
