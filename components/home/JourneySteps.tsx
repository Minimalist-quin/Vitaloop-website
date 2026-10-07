"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ORANGE, PANEL } from "./panel-theme";

/**
 * The four stages, read as one sequence rather than four items.
 *
 * A single hairline runs down the left margin and fills with the
 * section's scroll, its leading end feathered so the colour looks like
 * it is flowing rather than being drawn by a marker. The stage the
 * signal has reached is set in ink; the ones behind it stay legible but
 * step back; the ones ahead wait in the muted tone. Nothing slides,
 * bounces or pulses — the only movement is the line's travel and the
 * weight passing from one stage to the next.
 *
 * Reduced motion: no trigger, no travel — the line is drawn and every
 * stage is set at full strength.
 */

const STEPS = [
  { title: "Monitor", body: "Track your health continuously." },
  { title: "Understand", body: "Turn data into clear, personal insights." },
  {
    title: "Check in",
    body: "The health robot checks in and helps you understand how you’re doing.",
  },
  {
    title: "Respond",
    body: "In an emergency, the health robot alerts the right people and helps get you the support you need.",
  },
];

/* How much of the signal's leading end is feathered out. */
const SIGNAL_TIP = 40;
const EASE = "var(--ease-default)";
const DURATION = "var(--duration-base)";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function JourneySteps() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const signal = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const section = root.current?.closest("section");
    if (reducedMotion || !root.current || !section) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const setLength = gsap.quickSetter(signal.current, "height", "px");
      let current = -1;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        /* Scrubbed, so the signal is always somewhere between two stages
           rather than jumping when one takes over. */
        onUpdate: ({ progress }) => {
          setLength(progress * (rail.current?.clientHeight ?? 0));

          const next = Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1);
          if (next !== current) {
            current = next;
            setActive(next);
          }
        },
      });

      return () => trigger.kill();
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={root} className="mt-12">
      <ol ref={rail} className="relative pl-7">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px"
          style={{ background: PANEL.rule }}
        />
        <span
          ref={signal}
          aria-hidden
          className="absolute top-0 left-0 w-px"
          style={{
            height: reducedMotion ? "100%" : 0,
            background: `linear-gradient(to bottom, ${ORANGE} 0, ${ORANGE} calc(100% - ${SIGNAL_TIP}px), transparent 100%)`,
          }}
        />

        {STEPS.map(({ title, body }, i) => {
          const lit = reducedMotion || i === active;
          const passed = i < active;

          return (
            <li key={title} className="flex gap-4 py-[0.85rem] first:pt-0 last:pb-0">
              <span
                className="w-4 shrink-0 pt-[3px] text-[11px] tabular-nums"
                style={{
                  color: lit ? ORANGE : PANEL.muted,
                  transition: `color ${DURATION} ${EASE}`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-[15px] leading-[1.5]">
                <span
                  className="font-medium tracking-[-0.01em]"
                  style={{
                    color: lit ? "#1a1a1a" : passed ? "#6f6b64" : PANEL.muted,
                    transition: `color ${DURATION} ${EASE}`,
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    color: lit ? "#6f6b64" : PANEL.muted,
                    transition: `color ${DURATION} ${EASE}`,
                  }}
                >
                  {" "}
                  &mdash; {body}
                </span>
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
