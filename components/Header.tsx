import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <div className="relative mx-auto flex h-[68px] max-w-[1240px] items-center justify-between rounded-2xl border border-line bg-white px-4 shadow-[0_8px_30px_rgba(31,26,27,0.08)] md:h-20 md:rounded-[20px] md:px-7">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image src="/logo.webp" alt={site.name} width={760} height={211} priority className="h-11 w-auto md:h-14" />
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
