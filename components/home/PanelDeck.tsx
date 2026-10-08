"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SleepPanel } from "./SleepPanel";
import { RecoveryPanel } from "./RecoveryPanel";

/**
 * The two panels as a deck: every card parks at the same height, so the
 * card in front covers the one behind it completely once it lands —
 * nothing of the card behind shows above it.
 *
 * The stacking is sticky positioning, not a pinned scroll scene — every
 * panel is read in full on the way past, and only then slides under the
 * next one. The scrubbed tween settles the covered card back as it goes,
 * which reads while it is still uncovered.
 *
 * Reduced motion: no sticky, no scrub — the panels sit one under the
 * other and nothing overlaps.
 */

/* Where every card parks. */
const DECK_TOP = 24;
/* The room below the last card is a class on the tail element rather
   than a constant, because the two layouts want different amounts of
   it — see the comment there. */
/* The covered card fades out over this much of the next card's travel,
   so it is gone before the next card lands on it. */
const DECK_FADE = 220;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PanelDeck() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;

    registerGsap();

    const ctx = gsap.context((self) => {
      const cards = self.selector?.("[data-deck-card]") as HTMLElement[] | undefined;
      if (!cards || cards.length < 2) return;

      /* Each card is pushed back as the next one rides up over it, tied
         to that next card's travel rather than to a fixed distance. */
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 0.94,
          ease: VITALOOP_EASE,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: `top top+=${DECK_TOP}`,
            scrub: true,
          },
        });

        /* The panels are not the same height, so a covered card would
           otherwise show along whichever edge it outruns. It fades out
           over the end of the next card's travel instead. */
        gsap.to(card, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: `top top+=${DECK_TOP + DECK_FADE}`,
            end: `top top+=${DECK_TOP}`,
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="mx-auto flex w-full max-w-[320px] flex-col gap-3">
        <SleepPanel />
        <RecoveryPanel />
      </div>
    );
  }

  return (
    <div ref={root} className="mx-auto w-full max-w-[320px]">
      {[SleepPanel, RecoveryPanel].map((Panel, i) => (
        <div
          key={i}
          data-deck-card
          className="sticky"
          style={{
            top: DECK_TOP,
            zIndex: i + 1,
            marginTop: i === 0 ? 0 : 16,
            /* Settling back from the top edge keeps the card tucked
               behind the next one rather than growing out from under it. */
            transformOrigin: "50% 0%",
          }}
        >
          <Panel />
        </div>
      ))}

      {/*
        Real height, not padding: a sticky card's travel is bounded by
        its container's content box, so padding alone would leave the
        last card short of DECK_TOP and the card behind showing.

        This height is purely how long the last panel stays parked once
        it lands — the travel that gets it there comes from the panel
        above, not from here. Side by side that costs only section
        height, so it keeps the full dwell. Stacked it falls between the
        panels and the list under them, where every pixel of it is a
        hole in the section, so it keeps just enough to register as a
        hold. Short, rather than pulling the list up over the panel: the
        list belongs under the deck, not behind it.
      */}
      <div aria-hidden className="h-10 lg:h-[140px]" />
    </div>
  );
}
