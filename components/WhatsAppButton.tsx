import { site } from "@/lib/site";

// Floating WhatsApp chat button shown on every page.
export default function WhatsAppButton() {
  return (
    <a
      href={`${site.whatsappHref}?text=${encodeURIComponent(site.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 hover:text-white md:right-6 md:bottom-6 md:h-16 md:w-16"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 md:h-9 md:w-9" fill="currentColor" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 27l6.2-1.6a12.1 12.1 0 0 0 5.84 1.48h.01C22.68 26.88 28 21.52 28 14.91 28 8.3 22.68 3 16.04 3Zm0 21.85h-.01c-1.8 0-3.56-.48-5.1-1.39l-.37-.22-3.68.95.98-3.57-.24-.37a9.86 9.86 0 0 1-1.53-5.28c0-5.49 4.5-9.96 10.04-9.96 2.68 0 5.2 1.04 7.1 2.92a9.85 9.85 0 0 1 2.93 7.04c0 5.5-4.5 9.88-10.12 9.88Zm5.5-7.4c-.3-.15-1.78-.87-2.06-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
