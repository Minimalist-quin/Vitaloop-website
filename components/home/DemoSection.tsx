import type { CSSProperties } from "react";

/**
 * The demo invitation — a soft figure centred in a wide card, with
 * iridescent spheres drifting around it and the call to action set over
 * the figure's chest.
 *
 * ⚠️ The central figure is not here yet. Until an image lands at
 * public/demo-figure.png and is dropped in below, its place is held by
 * the same bloom of light the real render sits in, so the card reads as
 * composed rather than broken. The spheres are CSS, not images.
 */

/* Each sphere: size in px, and position as a share of the card. */
const SPHERES: { size: number; left: string; top: string; tint: string }[] = [
  { size: 52, left: "11%", top: "14%", tint: "#f0d9bd" },
  { size: 40, left: "30%", top: "32%", tint: "#ead8c6" },
  { size: 78, left: "9%", top: "68%", tint: "#e6d6c4" },
  { size: 66, left: "78%", top: "20%", tint: "#efd9c0" },
  { size: 56, left: "92%", top: "70%", tint: "#dcd8ea" },
];

function sphereStyle({ size, left, top, tint }: (typeof SPHERES)[number]): CSSProperties {
  return {
    width: size,
    height: size,
    left,
    top,
    /* Light from the upper left, a cool rim opposite it, and a faint
       banding across the middle — the glass-bead look of the reference. */
    backgroundImage: [
      "repeating-linear-gradient(104deg, rgba(255,255,255,0.5) 0 6%, rgba(214,206,226,0.28) 6% 13%)",
      `radial-gradient(circle at 34% 26%, #ffffff 0%, ${tint} 46%, #cfc6d8 78%, #b9b0c4 100%)`,
    ].join(","),
    backgroundBlendMode: "soft-light, normal",
    boxShadow: "0 10px 24px -12px rgba(70,60,50,0.3), inset -2px -4px 10px rgba(120,108,130,0.22)",
  };
}

function WaveIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden
      className="h-3.5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    >
      <path d="M2 8h3M19 8h3M9.5 8h5" />
      <circle cx={7} cy={8} r={1.1} fill="currentColor" stroke="none" />
      <circle cx={17} cy={8} r={1.1} fill="currentColor" stroke="none" />
      <path d="M12 4.5v-1M12 12.5v1" />
    </svg>
  );
}

export function DemoSection() {
  return (
    <section className="bg-[#f2efe9] px-4 py-20 lg:px-10 lg:py-28">
      <div className="relative mx-auto min-h-[560px] max-w-[1180px] overflow-hidden rounded-[28px] bg-white lg:min-h-[680px]">
        {/*
          Where the figure stands. Two stacked radials: a warm core at
          the shoulders and a cooler halo above it, both fading out well
          before the card edges so nothing hard-edges against the corner.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(42% 34% at 50% 28%, rgba(255,246,236,0.95) 0%, rgba(246,236,246,0.55) 45%, rgba(255,255,255,0) 100%)",
              "radial-gradient(34% 44% at 50% 62%, rgba(255,238,224,0.9) 0%, rgba(243,232,240,0.4) 52%, rgba(255,255,255,0) 100%)",
            ].join(","),
          }}
        />

        {SPHERES.map((sphere) => (
          <span
            key={`${sphere.left}-${sphere.top}`}
            aria-hidden
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={sphereStyle(sphere)}
          />
        ))}

        <div className="relative flex min-h-[560px] flex-col items-center justify-end px-6 pb-16 text-center lg:min-h-[680px] lg:pb-20">
          <p className="text-[14px] text-[#1a1a1a]">AI Demo</p>

          <h2 className="mt-3 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08] font-normal tracking-[-0.025em] text-[#1a1a1a]">
            See Vitaloop in action
          </h2>

          <p className="mt-3 text-[15px] text-[#8a8780]">
            Let the health robot walk you through the product
          </p>

          <a
            href="#"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#111] py-3 pr-6 pl-5 text-[15px] font-medium text-white"
          >
            <WaveIcon />
            Start demo
          </a>
        </div>
      </div>
    </section>
  );
}
