"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type SVGProps } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Sleep panel — the dark half of the "Why Vitaloop" pair.
 *
 * The visual language (dark cards, a stage ribbon, floating range bars)
 * follows a supplied reference; the labels, wording and every figure are
 * ours and deliberately differ from it.
 *
 * ⚠️ All copy and data here are illustrative mock-up values for the
 * screen design — not measurements, and not final copy. Replace both
 * before launch.
 */

function BedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2.6 9.4h18.8a1.6 1.6 0 0 1 1.6 1.6v4.3H1V11a1.6 1.6 0 0 1 1.6-1.6" />
      <path d="M1 16.4h22v2.2h-22z" />
      <circle cx={6} cy={7.4} r={2.4} />
    </svg>
  );
}

function LungsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.3 2h1.4v9.4h-1.4z" />
      <path d="M9.9 8.1c.6.5.9 1.3.9 2.1v10c0 .8-.8 1.3-1.5 1-1.9-.8-5.1-2.6-6.1-5.7-.8-2.5-.4-5 .2-6.6.4-1 1.7-1.2 2.4-.4z" />
      <path d="M14.1 8.1c-.6.5-.9 1.3-.9 2.1v10c0 .8.8 1.3 1.5 1 1.9-.8 5.1-2.6 6.1-5.7.8-2.5.4-5-.2-6.6-.4-1-1.7-1.2-2.4-.4z" />
    </svg>
  );
}

/* ---------- Sleep: Stages ---------- */

type Stage = "awake" | "rem" | "core" | "deep";

const STAGE_COLOR: Record<Stage, string> = {
  awake: "#ff6b4a",
  rem: "#7cd3f5",
  core: "#1a8cff",
  deep: "#3f3fd4",
};

/* Rows are 20px tall on a 34px pitch, so the dotted rules land midway. */
const BAND_HEIGHT = 20;
const BAND_PITCH = 34;
const STAGE_ORDER: Stage[] = ["awake", "rem", "core", "deep"];
const bandTop = (stage: Stage) => STAGE_ORDER.indexOf(stage) * BAND_PITCH;
const CHART_HEIGHT = STAGE_ORDER.length * BAND_PITCH - (BAND_PITCH - BAND_HEIGHT);

const STAGE_ROWS: { stage: Stage; label: string; duration: string }[] = [
  { stage: "awake", label: "Awake", duration: "9m" },
  { stage: "rem", label: "REM", duration: "1h 38m" },
  { stage: "core", label: "Core", duration: "3h 47m" },
  { stage: "deep", label: "Deep", duration: "1h 12m" },
];

/* The night as [stage, start%, end%] across the 11:42PM–6:58AM axis. */
const HYPNOGRAM: [Stage, number, number][] = [
  ["core", 0, 6],
  ["deep", 6, 13],
  ["core", 13, 16],
  ["deep", 16, 24],
  ["core", 24, 28],
  ["rem", 28, 34],
  ["core", 34, 38],
  ["deep", 38, 44],
  ["core", 44, 48],
  ["awake", 48, 49.5],
  ["core", 49.5, 54],
  ["rem", 54, 62],
  ["core", 62, 67],
  ["deep", 67, 71],
  ["core", 71, 76],
  ["awake", 76, 77.5],
  ["rem", 77.5, 86],
  ["core", 86, 91],
  ["awake", 91, 92.5],
  ["core", 92.5, 100],
];

function SleepStagesChart() {
  return (
    <div className="mt-3 flex gap-2">
      <div className="relative w-[52px] shrink-0" style={{ height: CHART_HEIGHT }}>
        {STAGE_ROWS.map(({ stage, label, duration }) => (
          <div key={stage} className="absolute left-0" style={{ top: bandTop(stage) - 3 }}>
            <p className="text-[9.5px] leading-tight text-white">{label}</p>
            <p className="text-[9px] leading-tight text-[#8e8e93]">{duration}</p>
          </div>
        ))}
      </div>

      <div className="relative flex-1" style={{ height: CHART_HEIGHT }}>
        {/* Recessive dotted rules, one between each pair of bands. */}
        {STAGE_ORDER.slice(0, -1).map((stage) => (
          <div
            key={stage}
            className="absolute inset-x-0 h-px"
            style={{
              top: bandTop(stage) + BAND_HEIGHT + (BAND_PITCH - BAND_HEIGHT) / 2,
              background: "repeating-linear-gradient(90deg,#48484a 0 1.5px,transparent 1.5px 5px)",
            }}
          />
        ))}

        {/* The night itself, wiped in left to right — see the timeline below. */}
        <div data-sleep-plot className="absolute inset-0">
          {/* Connectors first, so the stage bars sit on top of them. The
              gradient runs from the upper band's colour to the lower one's,
              which is what gives the awake spikes their orange-to-blue shaft. */}
          {HYPNOGRAM.slice(1).map(([stage, start], i) => {
            const previous = HYPNOGRAM[i][0];
            const upper = bandTop(stage) < bandTop(previous) ? stage : previous;
            const lower = upper === stage ? previous : stage;

            return (
              <div
                key={`link-${start}`}
                className="absolute w-[2px]"
                style={{
                  left: `calc(${start}% - 1px)`,
                  top: bandTop(upper) + 2,
                  height: bandTop(lower) + BAND_HEIGHT - bandTop(upper) - 4,
                  background: `linear-gradient(to bottom, ${STAGE_COLOR[upper]}, ${STAGE_COLOR[lower]})`,
                }}
              />
            );
          })}

          {HYPNOGRAM.map(([stage, start, end]) => (
            <div
              key={`${stage}-${start}`}
              className="absolute rounded-[6px]"
              style={{
                left: `${start}%`,
                width: `${end - start}%`,
                top: bandTop(stage),
                height: BAND_HEIGHT,
                background: STAGE_COLOR[stage],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Respiratory Rate ---------- */

/* Breaths per minute, [low, high] per reading. */
const BREATHS: [number, number][] = [
  [16.8, 18.2],
  [16.2, 17.6],
  [15.4, 16.8],
  [16.4, 17.9],
  [13.8, 15.1],
  [15.1, 16.4],
  [15.8, 17.1],
  [16.7, 18.1],
  [15.3, 16.7],
  [17.9, 19.8],
  [17.1, 18.4],
  [16.4, 17.7],
  [15.4, 16.8],
  [14.9, 14.9],
];

const BREATH_MIN = 13.2;
const BREATH_MAX = 20.4;
const BREATH_TRACK = 86;
const BREATH_BAR = 7;

const MAX_INDEX = 9;
const MIN_INDEX = 4;

const breathY = (value: number) =>
  ((value - BREATH_MIN) / (BREATH_MAX - BREATH_MIN)) * BREATH_TRACK;

function RespiratoryChart() {
  return (
    <div className="mt-6 mb-5 flex items-end gap-[3px] px-1" style={{ height: BREATH_TRACK }}>
      {BREATHS.map(([low, high], i) => {
        const bar: CSSProperties = {
          bottom: breathY(low),
          height: Math.max(breathY(high) - breathY(low), BREATH_BAR),
          width: BREATH_BAR,
        };

        return (
          <div key={`${low}-${high}`} className="relative flex-1" style={{ height: BREATH_TRACK }}>
            <div
              data-breath-bar
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#7cd3f5]"
              style={bar}
            />

            {/* The two extremes are capped with a dot and direct-labelled,
                so no value is read off an axis. */}
            {i === MAX_INDEX && (
              <div data-breath-extreme>
                <div
                  className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[#7cd3f5]"
                  style={{ bottom: breathY(high) - 3.5 }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ bottom: breathY(high) + 8 }}
                >
                  <p className="text-[8px] font-semibold tracking-[0.08em] text-[#3aa9f5]">MAX</p>
                  <p className="text-[13px] leading-tight font-medium text-[#3aa9f5]">19.8</p>
                </div>
              </div>
            )}

            {i === MIN_INDEX && (
              <div data-breath-extreme>
                <div
                  className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[#7cd3f5]"
                  style={{ bottom: breathY(low) - 3.5 }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ top: BREATH_TRACK - breathY(low) + 8 }}
                >
                  <p className="text-[8px] font-semibold tracking-[0.08em] text-[#3aa9f5]">MIN</p>
                  <p className="text-[13px] leading-tight font-medium text-[#3aa9f5]">13.8</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Layout effect on the client, plain effect during SSR — the initial
   hidden states have to be set before paint or the charts flash in at
   full value first. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SleepPanel({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    /* Reduced motion: every tween below is a `from`/`fromTo`, so skipping
       them leaves both charts rendered at their final values. */
    if (reducedMotion || !root.current) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      /* The night replays in time order rather than appearing at once,
         so the shape of the sleep reads as a sequence. */
      tl.fromTo(
        "[data-sleep-plot]",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.slow, ease: VITALOOP_EASE },
      )
        .from(
          "[data-sleep-axis]",
          { opacity: 0, duration: DURATION.fast, ease: VITALOOP_EASE },
          "-=0.3",
        )
        /* Each reading grows from its low value up to its high one — the
           bar's own range, drawn the way it was measured. */
        .from(
          "[data-breath-bar]",
          {
            scaleY: 0,
            transformOrigin: "50% 100%",
            duration: DURATION.fast,
            ease: VITALOOP_EASE,
            stagger: 0.04,
          },
          "-=0.2",
        )
        .from(
          "[data-breath-extreme]",
          { opacity: 0, duration: DURATION.fast, ease: VITALOOP_EASE },
          "-=0.15",
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={root} className={cn("w-full rounded-[22px] bg-black p-2.5", className)}>
      <div className="space-y-2.5">
        <section className="rounded-[14px] bg-[#1c1c1e] p-3">
          <h3 className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#30d5c0]">
            <BedIcon aria-hidden className="h-[13px] w-[13px]" />
            Sleep rhythm
          </h3>
          <p className="mt-2 text-[12px] leading-snug font-semibold text-white">
            Last night, from first drift to waking.
          </p>

          <div className="mt-3 border-t border-[#38383a]" />

          <SleepStagesChart />

          <div data-sleep-axis>
            <div className="mt-2.5 ml-[60px] border-t border-dotted border-[#48484a]" />
            <div className="mt-1.5 ml-[60px] flex justify-between text-[9px] text-[#8e8e93]">
              <span>11:42PM</span>
              <span>6:58AM</span>
            </div>
          </div>
        </section>

        <section className="rounded-[14px] bg-[#1c1c1e] p-3">
          <h3 className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#3aa9f5]">
            <LungsIcon aria-hidden className="h-[13px] w-[13px]" />
            Breathing rate
          </h3>
          <p className="mt-2 text-[12px] leading-snug font-semibold text-white">
            Breaths per minute, measured across the night.
          </p>

          <div className="mt-3 border-t border-[#38383a]" />

          <RespiratoryChart />
        </section>
      </div>
    </div>
  );
}
