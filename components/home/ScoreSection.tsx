import type { SVGProps } from "react";

import { PhoneScreen } from "./PhoneScreen";

/**
 * ⚠️ CLONE of three supplied reference screenshots — none of this copy
 * is Vitaloop's. The section frame and greeting come from the "Why
 * Sinteo" reference, the three features from a dark feature-list
 * screenshot, and the phone screen from an iOS Health screenshot
 * (Sleep: Stages + Respiratory Rate). Layout exercise only; every
 * string must be replaced before anything ships.
 *
 * The sleep and breathing figures are the reference's own numbers, not
 * measurements — they stand in for a real screen design.
 */

const SECTION_BG = "#f2efe9";

/*
  Both filled icons cut their detail out in the section's background
  colour rather than leaving a hole, so they keep the solid silhouette
  the reference has. SECTION_BG must track the <section> background.
*/
function PieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} r={9.5} fill="currentColor" />
      <path
        fill="none"
        stroke={SECTION_BG}
        strokeWidth={1.6}
        d="M12 12V2.5M12 12h9.5M12 12H2.5"
      />
    </svg>
  );
}

function HelixIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      {...props}
    >
      <path d="M6 2.5c0 5.2 12 11.8 12 19M18 2.5c0 5.2-12 11.8-12 19" />
      <path d="M7.4 7h9.2M7.4 17h9.2" />
    </svg>
  );
}

function HeartPulseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 21.4c-1.7-1.2-8.3-5.5-8.3-11.3A5 5 0 0 1 12 6.4a5 5 0 0 1 8.3 3.7c0 5.8-6.6 10.1-8.3 11.3"
      />
      <path
        fill="none"
        stroke={SECTION_BG}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.6 13h2.1l1.5-3.4 2.4 6.3 1.5-2.9h2.4"
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: PieIcon,
    title: "Real-Time Analysis",
    body: "Fast, actionable insights without long wait times.",
  },
  {
    icon: HelixIcon,
    title: "Personalized Health Insights",
    body: "Tailored recommendations based on your unique biomarkers.",
  },
  {
    icon: HeartPulseIcon,
    title: "Holistic Health Monitoring",
    body: "Combining physical, nutritional, and mental data for a complete picture.",
  },
];

export function ScoreSection() {
  return (
    <section className="bg-[#f2efe9] py-20 text-[#1a1a1a] lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="text-center text-[12px] tracking-[0.14em] text-[#8a8780]">Why Sinteo</p>

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1fr_minmax(0,300px)_1fr] lg:gap-10">
          {/* The two text columns sit off-centre against the card the way
              the reference staggers them: the greeting high, the points low. */}
          <div className="lg:self-start lg:pt-20 lg:pr-4">
            <p className="text-[11px] tracking-[0.18em] text-[#8a8780] uppercase">Monday 18</p>
            <p className="mt-5 max-w-[20rem] text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.32] font-medium tracking-[-0.01em]">
              Hey John! your score could soar by up to 26% points per week! Let&rsquo;s elevate your
              eco-friendly game!
            </p>
          </div>

          <PhoneScreen />

          <ul className="flex flex-col gap-9 lg:self-center lg:pl-6">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-5">
                <Icon aria-hidden className="mt-1 h-7 w-7 shrink-0 text-[#1a1a1a]" />
                <div>
                  <p className="text-[17px] leading-tight font-semibold tracking-[-0.01em]">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-[#6f6b64]">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
