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

function ArrowBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] ${
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
        {/* Narrow screens get the menu control in the outlined-circle
            style of the supplied reference, ahead of the wordmark. The
            links it stands in for are still the inline nav from md up. */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full border border-white/45 md:hidden"
        >
          <span aria-hidden className="block h-[1.5px] w-[18px] rounded-full bg-white" />
          <span aria-hidden className="block h-[1.5px] w-[18px] rounded-full bg-white" />
        </button>

        <VitaloopWordmark className="h-[44px] w-auto text-white" />

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

        {/* Narrow screens get the compact pill of the supplied reference:
            no arrow badge, which is what sets the full-size button's
            height. The badge and the wider padding return from md up. */}
        <a
          href="#"
          className="ml-auto inline-flex items-center gap-3 rounded-full bg-[#111] px-4 py-2 text-[13px] font-semibold whitespace-nowrap text-white md:py-1.5 md:pr-1.5 md:pl-6 md:text-[14px]"
        >
          Join Waitlist
          <span className="hidden md:inline-flex">
            <ArrowBadge />
          </span>
        </a>
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
