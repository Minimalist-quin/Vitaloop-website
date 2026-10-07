"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type SVGProps } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";
import { BLUE, PANEL, STAGE, TEAL } from "./panel-theme";

/**
 * Sleep panel — the upper half of the "Why Vitaloop" pair.
 *
 * The two cards follow supplied references (a sleep summary and a
 * breathing chart); the labels, wording and every figure are ours and
 * deliberately differ from them. Surfaces and ink come from
 * [panel-theme], which carries the card look both panels share.
 *
 * ⚠️ All copy and data here are illustrative mock-up values for the
 * screen design — not measurements, and not final copy. Replace both
 * before launch.
 */

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 15.2A8.6 8.6 0 0 1 9.4 4.1a8.6 8.6 0 1 0 11.1 11.1" />
      <circle cx={17.4} cy={6.2} r={1} />
      <circle cx={20.4} cy={9} r={0.7} />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx={12} cy={12} r={8.6} />
      <path d="M12 7.2V12l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21c-1.7-1.2-8.3-5.5-8.3-11.3A5 5 0 0 1 12 6a5 5 0 0 1 8.3 3.7C20.3 15.5 13.7 19.8 12 21" />
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

/* ---------- Sleep ---------- */

/*
  One night, in minutes. Asleep is the three sleep stages; the span
  below is time in bed, which is why the two differ by the waking
  minutes.
*/
const STAGES = [
  { key: "awake", label: "Awake", minutes: 9, colour: STAGE.awake },
  { key: "rem", label: "REM", minutes: 98, colour: STAGE.rem },
  { key: "core", label: "Core", minutes: 267, colour: STAGE.core },
  { key: "deep", label: "Deep", minutes: 72, colour: STAGE.deep },
];

const IN_BED = "11:42PM – 7:08AM";
const AVG_BPM = "48 BPM AVG";

const TOTAL = STAGES.reduce((sum, s) => sum + s.minutes, 0);
const ASLEEP = TOTAL - STAGES[0].minutes;

function duration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

function SleepCard() {
  return (
    <section className="p-4" style={{ background: PANEL.tile, borderRadius: PANEL.tileRadius }}>
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2.5 py-1 text-[9px] tracking-[0.08em] uppercase"
          style={{ background: PANEL.surface, color: PANEL.muted }}
        >
          Wed 27
        </span>

        <p className="text-[13px] font-medium" style={{ color: PANEL.ink }}>
          Sleep
        </p>

        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: TEAL }}
        >
          <MoonIcon aria-hidden className="h-[14px] w-[14px] text-white" />
        </span>
      </div>

      <p className="mt-5 flex items-baseline justify-center gap-1.5">
        <span
          className="text-[34px] leading-none font-light tracking-[-0.03em]"
          style={{ color: PANEL.ink }}
        >
          {Math.floor(ASLEEP / 60)}
        </span>
        <span className="text-[13px]" style={{ color: PANEL.muted }}>
          hr
        </span>
        <span
          className="text-[34px] leading-none font-light tracking-[-0.03em]"
          style={{ color: PANEL.ink }}
        >
          {String(ASLEEP % 60).padStart(2, "0")}
        </span>
        <span className="text-[13px]" style={{ color: PANEL.muted }}>
          min
        </span>
      </p>

      <p className="mt-2 text-center text-[11px] font-medium" style={{ color: TEAL }}>
        Asleep time
      </p>

      <div
        className="mt-5 p-3"
        style={{ background: PANEL.surface, borderRadius: PANEL.tileRadius - 8 }}
      >
        {/* Widths are the stages' share of the night; the shortest would
            vanish at its true share, so each keeps a floor. */}
        <div data-sleep-plot className="flex gap-[3px]">
          {STAGES.map(({ key, minutes, colour }) => (
            <span
              key={key}
              className="h-9 rounded-[7px]"
              style={{ flex: `${minutes} 1 0`, minWidth: 10, background: colour }}
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {STAGES.map(({ key, label, minutes, colour }) => (
            <div key={key}>
              <p className="flex items-center gap-1 text-[9.5px]" style={{ color: PANEL.body }}>
                {label}
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: colour }}
                />
              </p>
              <p className="mt-0.5 text-[12px] font-medium" style={{ color: PANEL.ink }}>
                {duration(minutes)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div data-sleep-axis className="mt-4 flex items-center justify-between text-[10.5px]">
        <p className="flex items-center gap-1.5" style={{ color: PANEL.ink }}>
          <ClockIcon aria-hidden className="h-3.5 w-3.5" style={{ color: PANEL.muted }} />
          {IN_BED}
        </p>
        <p className="flex items-center gap-1.5" style={{ color: PANEL.ink }}>
          <HeartIcon aria-hidden className="h-3.5 w-3.5" style={{ color: PANEL.muted }} />
          {AVG_BPM}
        </p>
      </div>
    </section>
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
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{ ...bar, background: STAGE.rem }}
            />

            {/* The two extremes are capped with a dot and direct-labelled,
                so no value is read off an axis. */}
            {i === MAX_INDEX && (
              <div data-breath-extreme>
                <div
                  className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full"
                  style={{ bottom: breathY(high) - 3.5, background: STAGE.rem }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ bottom: breathY(high) + 8 }}
                >
                  <p
                    className="text-[8px] font-semibold tracking-[0.12em]"
                    style={{ color: PANEL.muted }}
                  >
                    MAX
                  </p>
                  <p className="text-[13px] leading-tight font-semibold" style={{ color: BLUE }}>
                    19.8
                  </p>
                </div>
              </div>
            )}

            {i === MIN_INDEX && (
              <div data-breath-extreme>
                <div
                  className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full"
                  style={{ bottom: breathY(low) - 3.5, background: STAGE.rem }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ top: BREATH_TRACK - breathY(low) + 8 }}
                >
                  <p
                    className="text-[8px] font-semibold tracking-[0.12em]"
                    style={{ color: PANEL.muted }}
                  >
                    MIN
                  </p>
                  <p className="text-[13px] leading-tight font-semibold" style={{ color: BLUE }}>
                    13.8
                  </p>
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
       them leaves both cards rendered at their final values. */
    if (reducedMotion || !root.current) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          /* Replays on every entry from above, and resets on the way back
             up so there is something to replay. Re-entering from below
             leaves it finished — the charts were already read. */
          toggleActions: "restart none none reset",
        },
      });

      /* The night fills in from its first stage to its last, so the
         stages read in the order they were slept. */
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
        <SleepCard />

        <section className="p-4" style={{ background: PANEL.tile, borderRadius: PANEL.tileRadius }}>
          <h3
            className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: BLUE }}
          >
            <LungsIcon aria-hidden className="h-[12px] w-[12px]" />
            Breathing rate
          </h3>
          <p className="mt-2.5 text-[13px] leading-snug" style={{ color: PANEL.body }}>
            <strong style={{ color: PANEL.ink }}>Breaths per minute</strong>, measured across the
            night.
          </p>

          <div className="mt-3 h-px" style={{ background: PANEL.rule }} />

          <RespiratoryChart />
        </section>
      </div>
    </div>
  );
}
