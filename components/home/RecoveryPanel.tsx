"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";
import { ORANGE, PANEL, STAGE } from "./panel-theme";

/**
 * Recovery panel — the warm half of the "Why Vitaloop" pair.
 *
 * The structure (a headline block over a tile grid, the radial burst,
 * the column gauge) follows a supplied reference; the labels, wording
 * and every figure are ours and deliberately differ from it. Surfaces
 * and ink come from [panel-theme], which carries the card look both
 * panels share.
 *
 * ⚠️ All copy and data here are illustrative mock-up values for the
 * screen design — not measurements, and not final copy. Replace both
 * before launch.
 */

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
    <div
      className="px-4 pt-4 pb-5"
      style={{ background: PANEL.tile, borderRadius: PANEL.tileRadius }}
    >
      <p
        className="text-[9.5px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: PANEL.muted }}
      >
        Recovery
      </p>

      <p className="mt-6 text-[10px]" style={{ color: PANEL.body }}>
        Resting heart rate
      </p>

      <div className="mt-1 flex items-center gap-2">
        <p className="flex shrink-0 items-baseline gap-1">
          <span className="text-[38px] leading-none font-light" style={{ color: PANEL.ink }}>
            48
          </span>
          <span className="text-[13px]" style={{ color: PANEL.muted }}>
            bpm
          </span>
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
              stroke="rgba(23,22,26,0.55)"
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {HR_MARKERS.map(({ value, left, top }) => (
            <p
              key={value}
              className="absolute text-[8px] font-medium whitespace-nowrap"
              style={{ left, top, color: PANEL.ink }}
            >
              {value}
              <span style={{ color: PANEL.muted }}> bpm</span>
            </p>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[10.5px] leading-relaxed" style={{ color: PANEL.body }}>
        Your overnight heart rate sat{" "}
        <strong style={{ color: PANEL.ink }}>below its usual range</strong> &mdash; a calm,
        well-rested night.
      </p>
    </div>
  );
}

/* ---------- respiratory rate: radial burst ---------- */

const BURST_RAYS = 44;

function RespiratoryBurst() {
  return (
    <div className="relative mx-auto mt-4 h-[104px] w-[104px]">
      <svg viewBox="-66 -66 132 132" className="h-full w-full">
        {Array.from({ length: BURST_RAYS }, (_, i) => {
          const angle = (i / BURST_RAYS) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const radii = i % 2 === 0 ? [34, 40, 46, 52] : [34, 40, 46];

          return (
            <g key={i} data-burst-ray>
              <line
                x1={cos * 56}
                y1={sin * 56}
                x2={cos * 64}
                y2={sin * 64}
                stroke={PANEL.rule}
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
        <p className="text-[20px] leading-none font-semibold" style={{ color: PANEL.ink }}>
          14
        </p>
        <p className="mt-1 text-[9px]" style={{ color: PANEL.muted }}>
          Steady
        </p>
      </div>
    </div>
  );
}

/* ---------- body temperature: gauge ---------- */

const TEMP_TICKS = 24;

function TemperatureGauge() {
  return (
    <div className="relative h-[74px] w-[34px] shrink-0 overflow-hidden rounded-[6px]">
      <div
        data-temp-fill
        className="absolute inset-y-0 left-0 w-[19px]"
        style={{ background: ORANGE }}
      >
        {["38", "37", "36"].map((label, i) => (
          <span
            key={label}
            className="absolute right-[2px] text-[7px] text-white/80"
            style={{ top: `${18 + i * 24}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-[15px]" style={{ background: "#ddd9d3" }}>
        {Array.from({ length: TEMP_TICKS }, (_, i) => (
          <span
            key={i}
            className="absolute left-0 h-px"
            style={{
              top: `${(i / (TEMP_TICKS - 1)) * 100}%`,
              width: i % 4 === 0 ? 10 : 6,
              background: PANEL.ink,
              opacity: 0.45,
            }}
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

/* The tile borrows the sleep panel's stage colours, so the two panels
   name the same stages the same way. */
const SLEEP_BANDS = [
  {
    color: STAGE.rem,
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
    color: STAGE.awake,
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
  { text: "Awake", top: "4%", left: "4%", color: "#ffffff" },
  { text: "REM", top: "42%", left: "58%", color: PANEL.ink },
  { text: "Light", top: "64%", left: "4%", color: PANEL.ink },
];

function SleepStages() {
  return (
    <div data-sleep-plot className="relative mt-3 h-[54px] w-full overflow-hidden rounded-[2px]">
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" className="h-full w-full">
        {/* Light is the floor the other two stages sit on. */}
        <rect width={100} height={46} fill="#cfcbc4" />
        {SLEEP_BANDS.map(({ color, points }) => (
          <path key={color} d={stepArea(points as unknown as [number, number][])} fill={color} />
        ))}
      </svg>

      {SLEEP_LABELS.map(({ text, top, left, color }) => (
        <span key={text} className="absolute text-[8px]" style={{ top, left, color }}>
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
          stroke={PANEL.ink}
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
  return (
    <p
      className="text-[9.5px] font-semibold tracking-[0.14em] uppercase"
      style={{ color: PANEL.muted }}
    >
      {children}
    </p>
  );
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
    <div
      ref={root}
      className={cn("w-full p-3", className)}
      style={{
        background: PANEL.surface,
        borderRadius: PANEL.radius,
        boxShadow: PANEL.shadow,
      }}
    >
      <div className="space-y-2">
        <HeartRatePanel />

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex-1 p-3.5" style={{ background: PANEL.tile, borderRadius: 22 }}>
              <CardTitle>Breathing</CardTitle>
              <RespiratoryBurst />
            </div>

            <div className="p-3.5" style={{ background: PANEL.tile, borderRadius: 22 }}>
              <CardTitle>Sleep</CardTitle>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span
                  className="text-[19px] leading-none font-semibold"
                  style={{ color: PANEL.ink }}
                >
                  7h 26m
                </span>
                <span className="text-[9px]" style={{ color: PANEL.muted }}>
                  Restful
                </span>
              </p>
              <SleepStages />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-3.5" style={{ background: PANEL.tile, borderRadius: 22 }}>
              <CardTitle>Skin temperature</CardTitle>

              {/* Value and gauge share a row, so the title keeps the full
                  width of the card and never runs under the gauge. */}
              <div className="mt-3 flex items-start gap-2">
                <div className="flex-1">
                  <p className="flex items-baseline gap-1">
                    <span
                      className="text-[19px] leading-none font-semibold"
                      style={{ color: PANEL.ink }}
                    >
                      36.9
                    </span>
                    <span className="text-[9px]" style={{ color: PANEL.muted }}>
                      &deg;C
                    </span>
                  </p>
                  <div className="mt-2 h-px" style={{ background: PANEL.rule }} />
                  <p className="mt-1.5 text-[9px]" style={{ color: PANEL.muted }}>
                    Above your norm
                  </p>
                </div>

                <TemperatureGauge />
              </div>
            </div>

            <div className="flex-1 p-3.5" style={{ background: PANEL.tile, borderRadius: 22 }}>
              <CardTitle>HRV balance</CardTitle>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span
                  className="text-[19px] leading-none font-semibold"
                  style={{ color: PANEL.ink }}
                >
                  68
                </span>
                <span className="text-[9px]" style={{ color: PANEL.muted }}>
                  ms &middot; balanced
                </span>
              </p>
              <HrvLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
