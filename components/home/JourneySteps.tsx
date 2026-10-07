"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ORANGE, PANEL } from "./panel-theme";

/**
 * The five stages, lit in turn as the section is scrolled through.
 *
 * One signal runs the whole way down: a hairline that draws from stage
 * to stage with a soft point of light travelling at its head, so each
 * stage reads as the consequence of the one above it rather than as a
 * separate item. The stage at the head is set in ink; the ones it has
 * passed stay legible but step back; the ones ahead wait in the muted
 * tone. Nothing moves except the signal.
 *
 * Reduced motion: no trigger, no travel — every stage renders at full
 * strength with the line already drawn.
 */

const STEPS = [
  {
    title: "Monitor",
    body: "Your wearable continuously captures important health signals throughout your day.",
  },
  {
    title: "Understand",
    body: "Vitaloop transforms those signals into clear, personalized insights that help you understand your health.",
  },
  {
    title: "Check in",
    body: "Avora creates a more human layer of care through thoughtful, timely conversations and check-ins.",
  },
  {
    title: "Respond",
    body: "When something needs attention, Vitaloop helps you understand what to do next and can support emergency response when necessary.",
  },
  {
    title: "Care",
    body: "Because better health isn’t just about knowing your numbers. It’s about having the right support when it matters.",
  },
];

/* The rail sits under the node centres; the nodes are 9px across. */
const RAIL_X = 4;
const EASE = "var(--ease-default)";
const DURATION = "var(--duration-base)";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function JourneySteps() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const signal = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const [active, setActive] = useState(reducedMotion ? STEPS.length - 1 : 0);

  useIsomorphicLayoutEffect(() => {
    const section = root.current?.closest("section");
    if (reducedMotion || !root.current || !section) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const setFill = gsap.quickSetter(signal.current, "scaleY");
      const setHead = gsap.quickSetter(head.current, "y", "px");
      let current = -1;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        /* Scrubbed rather than stepped, so the signal is always between
           two stages instead of jumping when one takes over. */
        onUpdate: ({ progress }) => {
          const travel = rail.current?.clientHeight ?? 0;
          setFill(progress);
          setHead(progress * travel);

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
    <div ref={root} className="mt-8">
      <ol className="relative">
        <div
          ref={rail}
          aria-hidden
          className="absolute top-[7px] bottom-[9px] w-px"
          style={{ left: RAIL_X, background: PANEL.rule }}
        />

        {/* The signal: drawn line, then the point of light at its head. */}
        <div
          ref={signal}
          aria-hidden
          className="absolute top-[7px] bottom-[9px] w-px origin-top"
          style={{
            left: RAIL_X,
            background: ORANGE,
            transform: reducedMotion ? undefined : "scaleY(0)",
          }}
        />
        {!reducedMotion && (
          <div
            ref={head}
            aria-hidden
            className="absolute h-[14px] w-[14px] -translate-x-1/2 rounded-full"
            style={{
              top: 0,
              left: RAIL_X,
              background: ORANGE,
              opacity: 0.22,
              filter: "blur(4px)",
            }}
          />
        )}

        {STEPS.map(({ title, body }, i) => {
          const state = i === active ? "active" : i < active ? "past" : "ahead";

          return (
            <li key={title} className="relative pb-6 pl-7 last:pb-0">
              <span
                aria-hidden
                className="absolute h-[9px] w-[9px] -translate-x-1/2 rounded-full"
                style={{
                  top: 3,
                  left: RAIL_X,
                  background: state === "ahead" ? PANEL.rule : ORANGE,
                  transform: `translateX(-50%) scale(${state === "active" ? 1.25 : 1})`,
                  opacity: state === "past" ? 0.5 : 1,
                  transition: `background ${DURATION} ${EASE}, transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
                }}
              />

              <p
                className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
                style={{
                  color: state === "active" ? "#1a1a1a" : PANEL.muted,
                  transition: `color ${DURATION} ${EASE}`,
                }}
              >
                {title}
              </p>
              <p
                className="mt-1.5 text-[13px] leading-[1.5]"
                style={{
                  color: state === "ahead" ? PANEL.muted : "#6f6b64",
                  opacity: state === "active" ? 1 : 0.72,
                  transition: `color ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
                }}
              >
                {body}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
