"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Recovery panel — the warm half of the "Why Vitaloop" pair.
 *
 * The visual language (an orange headline panel over a tile grid, the
 * radial burst, the column gauge) follows a supplied reference; the
 * labels, wording and every figure are ours and deliberately differ
 * from it.
 *
 * ⚠️ All copy and data here are illustrative mock-up values for the
 * screen design — not measurements, and not final copy. Replace both
 * before launch.
 */

/* Deep enough that the white body copy on the headline panel clears
   WCAG AA (4.9:1) — the brighter orange it replaced did not. */
const ORANGE = "#c24a06";

/* ---------- top panel: heart rate ---------- */

/*
  The sleeping trace: a fixed waveform, not random, so server and client
  render the same path. The envelope swells toward the right the way the
  reference's does.
*/
const HR_TRACE = Array.from({ length: 72 }, (_, i) => {
  const t = i / 71;
  const envelope = 3 + 7 * Math.sin(t * Math.PI * 0.9);
  const wobble = Math.sin(i * 2.7) * 0.55 + Math.sin(i * 1.31) * 0.3 + Math.sin(i * 5.17) * 0.15;
  return [t * 100, 20 - wobble * envelope] as const;
});

const HR_PATH = HR_TRACE.map(
  ([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`,
).join(" ");

const HR_MARKERS = [
  { value: "96", left: "4%", top: "12%" },
  { value: "118", left: "62%", top: "0%" },
  { value: "44", left: "30%", top: "80%" },
  { value: "53", left: "70%", top: "70%" },
];

function HeartRatePanel() {
  return (
    <div className="px-4 pt-4 pb-5" style={{ background: ORANGE }}>
      <p className="text-[11px] font-medium text-white">Recovery</p>

      <p className="mt-6 text-[10px] text-white/90">Resting heart rate</p>

      <div className="mt-1 flex items-center gap-2">
        <p className="flex shrink-0 items-baseline gap-1">
          <span className="text-[38px] leading-none font-light text-white">48</span>
          <span className="text-[13px] text-white/80">bpm</span>
        </p>

        <div className="relative h-[52px] flex-1">
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            <path
              data-hr-line
              d={HR_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {HR_MARKERS.map(({ value, left, top }) => (
            <p
              key={value}
              className="absolute text-[8px] whitespace-nowrap text-white"
              style={{ left, top }}
            >
              {value}
              <span className="text-white/70"> bpm</span>
            </p>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[9.5px] leading-relaxed text-white/85">
        Your overnight heart rate sat below its usual range &mdash; a calm, well-rested night.
      </p>
    </div>
  );
}

/* ---------- respiratory rate: radial burst ---------- */

const BURST_RAYS = 44;

function RespiratoryBurst() {
  return (
    <div className="relative mx-auto mt-4 h-[104px] w-[104px]">
      <svg viewBox="-60 -60 120 120" className="h-full w-full">
        {Array.from({ length: BURST_RAYS }, (_, i) => {
          const angle = (i / BURST_RAYS) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const radii = i % 2 === 0 ? [25, 31, 37, 43] : [25, 31, 37];

          return (
            <g key={i} data-burst-ray>
              <line
                x1={cos * 47}
                y1={sin * 47}
                x2={cos * 57}
                y2={sin * 57}
                stroke="#c9c5c1"
                strokeWidth={0.7}
              />
              {radii.map((r) => (
                <circle key={r} cx={cos * r} cy={sin * r} r={1.5} fill={ORANGE} />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[20px] leading-none font-medium text-[#1a1a1a]">14</p>
        <p className="mt-1 text-[9px] text-[#8a8780]">Steady</p>
      </div>
    </div>
  );
}

/* ---------- body temperature: gauge ---------- */

const TEMP_TICKS = 24;

function TemperatureGauge() {
  return (
    <div className="relative h-[74px] w-[34px] shrink-0 overflow-hidden rounded-[2px]">
      <div
        data-temp-fill
        className="absolute inset-y-0 left-0 w-[19px]"
        style={{ background: ORANGE }}
      >
        {["38", "37", "36"].map((label, i) => (
          <span
            key={label}
            className="absolute right-[2px] text-[7px] text-white/75"
            style={{ top: `${18 + i * 24}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-[15px] bg-[#111]">
        {Array.from({ length: TEMP_TICKS }, (_, i) => (
          <span
            key={i}
            className="absolute left-0 h-px bg-white/55"
            style={{ top: `${(i / (TEMP_TICKS - 1)) * 100}%`, width: i % 4 === 0 ? 10 : 6 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- sleep: stacked stages ---------- */

/* Each band is drawn from the top of the plot down to a stepping
   boundary, deepest stage first, so the three overlap into bands. */
function stepArea(points: [number, number][]) {
  const [first, ...rest] = points;
  const d = [`M0 0`, `L0 ${first[1]}`];
  let y = first[1];
  for (const [x, nextY] of rest) {
    d.push(`L${x} ${y}`, `L${x} ${nextY}`);
    y = nextY;
  }
  d.push(`L100 ${y}`, `L100 0`, "Z");
  return d.join(" ");
}

const SLEEP_BANDS = [
  {
    color: "#161616",
    points: [
      [0, 30],
      [22, 30],
      [22, 25],
      [50, 25],
      [50, 34],
      [100, 34],
    ],
  },
  {
    color: ORANGE,
    points: [
      [0, 15],
      [30, 15],
      [30, 9],
      [56, 9],
      [56, 17],
      [100, 17],
    ],
  },
] as const;

const SLEEP_LABELS = [
  { text: "Awake", top: "4%", left: "4%" },
  { text: "REM", top: "42%", left: "58%" },
  { text: "Light", top: "64%", left: "4%" },
];

function SleepStages() {
  return (
    <div data-sleep-plot className="relative mt-3 h-[54px] w-full overflow-hidden rounded-[2px]">
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" className="h-full w-full">
        {/* Light is the floor the other two stages sit on. */}
        <rect width={100} height={46} fill="#9a9894" />
        {SLEEP_BANDS.map(({ color, points }) => (
          <path key={color} d={stepArea(points as unknown as [number, number][])} fill={color} />
        ))}
      </svg>

      {SLEEP_LABELS.map(({ text, top, left }) => (
        <span key={text} className="absolute text-[8px] text-white/85" style={{ top, left }}>
          {text}
        </span>
      ))}
    </div>
  );
}

/* ---------- HRV balance: stepped line ---------- */

const HRV_STEPS: [number, number][] = [
  [0, 10],
  [12, 10],
  [12, 34],
  [26, 34],
  [26, 20],
  [40, 20],
  [40, 40],
  [58, 40],
  [58, 26],
  [74, 26],
  [74, 44],
  [88, 44],
  [88, 8],
  [100, 8],
];

const HRV_PATH = HRV_STEPS.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

function HrvLine() {
  return (
    <div className="relative mt-2 h-[52px] w-full">
      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          data-hrv-line
          d={HRV_PATH}
          fill="none"
          stroke="#161616"
          strokeWidth={0.8}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        data-hrv-dot
        className="absolute right-0 h-[7px] w-[7px] -translate-y-1/2 rounded-full"
        style={{ top: "16%", background: ORANGE }}
      />
    </div>
  );
}

/* ---------- screen ---------- */

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function CardTitle({ children }: { children: string }) {
  return <p className="text-[10px] font-medium text-[#1a1a1a]">{children}</p>;
}

export function RecoveryPanel({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    /* Reduced motion: every tween is a `from`/`fromTo`, so skipping them
       leaves the screen rendered at its final values. */
    if (reducedMotion || !root.current) return;

    registerGsap();

    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      /* Both traces draw along their own length rather than fading in, so
         each reads as a measurement taken over time. */
      for (const [selector, position] of [
        ["[data-hr-line]", 0],
        ["[data-hrv-line]", 0.35],
      ] as const) {
        const path = self.selector?.(selector)[0] as SVGPathElement | undefined;
        if (!path) continue;
        const length = path.getTotalLength();

        tl.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: DURATION.slow,
            ease: VITALOOP_EASE,
            clearProps: "strokeDasharray,strokeDashoffset",
          },
          position,
        );
      }

      tl.from(
        "[data-burst-ray]",
        {
          opacity: 0,
          duration: DURATION.fast,
          ease: VITALOOP_EASE,
          stagger: { each: 0.012, from: "start" },
        },
        0.15,
      )
        /* The gauge fills from the bottom, the way the reading climbs. */
        .from(
          "[data-temp-fill]",
          {
            scaleY: 0,
            transformOrigin: "50% 100%",
            duration: DURATION.base,
            ease: VITALOOP_EASE,
          },
          0.25,
        )
        .fromTo(
          "[data-sleep-plot]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.base, ease: VITALOOP_EASE },
          0.4,
        )
        .from(
          "[data-hrv-dot]",
          { scale: 0, duration: DURATION.fast, ease: VITALOOP_EASE },
          "-=0.15",
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={root} className={cn("w-full overflow-hidden rounded-[22px] bg-[#e2e0dd]", className)}>
      <div>
        <HeartRatePanel />

        <div className="grid grid-cols-2 gap-[3px] p-[3px]">
          <div className="flex flex-col gap-[3px]">
            <div className="flex-1 bg-[#efeeec] p-3">
              <CardTitle>Breathing</CardTitle>
              <RespiratoryBurst />
            </div>

            <div className="bg-[#efeeec] p-3">
              <CardTitle>Sleep</CardTitle>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[19px] leading-none font-medium text-[#1a1a1a]">7h 26m</span>
                <span className="text-[9px] text-[#8a8780]">Restful</span>
              </p>
              <SleepStages />
            </div>
          </div>

          <div className="flex flex-col gap-[3px]">
            <div className="bg-[#efeeec] p-3">
              <CardTitle>Skin temperature</CardTitle>

              {/* Value and gauge share a row, so the title keeps the full
                  width of the card and never runs under the gauge. */}
              <div className="mt-3 flex items-start gap-2">
                <div className="flex-1">
                  <p className="flex items-baseline gap-1">
                    <span className="text-[19px] leading-none font-medium text-[#1a1a1a]">
                      36.9
                    </span>
                    <span className="text-[9px] text-[#8a8780]">&deg;C</span>
                  </p>
                  <div className="mt-2 h-px bg-[#c9c6c3]" />
                  <p className="mt-1.5 text-[9px] text-[#8a8780]">Above your norm</p>
                </div>

                <TemperatureGauge />
              </div>
            </div>

            <div className="flex-1 bg-[#efeeec] p-3">
              <CardTitle>HRV balance</CardTitle>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[19px] leading-none font-medium text-[#1a1a1a]">68</span>
                <span className="text-[9px] text-[#8a8780]">ms &middot; balanced</span>
              </p>
              <HrvLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
