import Image from "next/image";
import type { SVGProps } from "react";
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

function IconAnalysis(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="M12 3a9 9 0 0 1 9 9h-9z" fill="currentColor" stroke="none" />
      <path d="M12 12 4.5 16.5" strokeLinecap="round" />
    </svg>
  );
}

function IconDna(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      {...props}
    >
      <path d="M8 3c0 6 8 6 8 9s-8 3-8 9" />
      <path d="M16 3c0 6-8 6-8 9s8 3 8 9" />
      <path d="M9 7h6M9 17h6M10.5 5h3M10.5 19h3" />
    </svg>
  );
}

function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        d="M12 20.5s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 7.8a4.2 4.2 0 0 1 7.5 2.9c0 5.2-7.5 9.8-7.5 9.8z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M4.5 13.2h3l1.6-2.8 2 5 1.7-3.4 1.2 1.2h4"
        stroke="var(--color-neutral-950, #15130f)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    Icon: IconAnalysis,
    title: "Real-Time Analysis",
    description: "Fast, actionable insights without long wait times.",
  },
  {
    Icon: IconDna,
    title: "Personalized Health Insights",
    description: "Tailored recommendations based on your unique biomarkers.",
  },
  {
    Icon: IconHeart,
    title: "Holistic Health Monitoring",
    description: "Combining physical, nutritional, and mental data for a complete picture.",
  },
];

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
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/hero-thumb.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover blur-[18px]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      <header className="relative mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-7">
        <VitaloopWordmark className="h-[44px] w-auto text-white" />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex"
        >
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-[17px] whitespace-nowrap text-white/90 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="ml-auto inline-flex items-center gap-3 rounded-full bg-[#111] py-1.5 pr-1.5 pl-6 text-[14px] whitespace-nowrap text-white"
        >
          Join Waitlist
          <ArrowBadge />
        </a>
      </header>

      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-between gap-16 px-6 pt-10 pb-14">
        <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.12] font-light tracking-[-0.02em]">
          See Beyond.
          <br />
          Unlock Your Health
        </h1>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <ul className="flex max-w-xs flex-col gap-6">
            {FEATURES.map(({ Icon, title, description }) => (
              <li key={title} className="flex gap-3.5">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <p className="text-[14px] font-semibold">{title}</p>
                  <p className="mt-1 text-[13px] leading-snug text-white/70">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="max-w-xl">
            <p className="text-[clamp(1.35rem,2.4vw,2rem)] leading-snug font-light">
              Your body holds the answers
              <br />— we help you see them.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6 text-[14px] whitespace-nowrap text-[#111]"
            >
              Discover More
              <ArrowBadge dark />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
