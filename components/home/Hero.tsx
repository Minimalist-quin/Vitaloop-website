import Image from "next/image";
import { VitaloopWordmark } from "./VitaloopWordmark";

/**
 * ⚠️ CLONE of supplied reference screenshots — none of this copy is
 * Vitaloop's. Navbar structure and blurred backdrop come from
 * Media/image.png (riseatseven.com); the navbar arrangement and pill
 * from a Nuro screenshot; the hero body — headline, feature list,
 * closing statement and CTA — from a MyHealthPrac screenshot. Layout
 * exercise only: every string and image must be replaced before
 * anything ships.
 *
 * The reference's amber close-up photo isn't available, so the existing
 * blurred backdrop is kept.
 */

const NAV_LINKS = ["Technology", "Service", "Careers"];

/* `size` carries both the circle and the glyph, so a caller that wants a
   smaller badge replaces the default rather than fighting it with a
   second set of width classes. */
function ArrowBadge({
  dark = false,
  size = "h-9 w-9 text-[15px]",
}: {
  dark?: boolean;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className={`flex ${size} shrink-0 items-center justify-center rounded-full ${
        dark ? "bg-[#111] text-white" : "bg-white text-[#111]"
      }`}
    >
      ↗
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
      {/*
        Product video backdrop. public/hero-video.mp4 is not in the repo
        yet — until it is, the <video> fails to load and the poster (and
        the Image beneath it) shows instead, so the hero still renders.
        The Image also covers prefers-reduced-motion, where the looping
        video is hidden outright.
      */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        {/* Blurred: this fallback is a small crop, sharp only at thumbnail size. */}
        <Image
          src="/hero-thumb.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover blur-[6px]"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/20" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      <header className="relative mx-auto flex w-full max-w-[1180px] items-center gap-3 px-6 py-7">
        <VitaloopWordmark className="h-[40px] w-auto shrink-0 text-white md:h-[44px]" />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex"
        >
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-[15px] whitespace-nowrap text-white/90 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Narrow screens keep the badge but at the compact size of the
            supplied reference — the badge sets the button's height, so
            it and the padding both step up from md. */}
        <a
          href="#"
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#111] py-1 pr-1 pl-3.5 text-[12px] font-semibold whitespace-nowrap text-white md:gap-3 md:py-1.5 md:pr-1.5 md:pl-6 md:text-[14px]"
        >
          Join Waitlist
          <ArrowBadge size="h-6 w-6 text-[11px] md:h-9 md:w-9 md:text-[15px]" />
        </a>

        {/* Narrow screens get the menu control in the outlined-circle
            style of the supplied reference, last in the row. The links
            it stands in for are the inline nav from md up. */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[4px] rounded-full border border-white/45 md:hidden"
        >
          <span aria-hidden className="block h-[1.5px] w-[15px] rounded-full bg-white" />
          <span aria-hidden className="block h-[1.5px] w-[15px] rounded-full bg-white" />
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-end px-6 pt-10 pb-14">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.5rem,5.6vw,4.9rem)] leading-[1.1] font-normal tracking-[-0.02em]">
            See Beyond.
            <br />
            Unlock Your Health
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
            Your body holds the answers — we help you see them.
          </p>

          <a
            href="#"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6 text-[14px] font-semibold whitespace-nowrap text-[#111]"
          >
            Discover More
            <ArrowBadge dark />
          </a>
        </div>
      </div>
    </section>
  );
}
