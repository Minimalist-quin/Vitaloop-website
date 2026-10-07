"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SleepPanel } from "./SleepPanel";
import { RecoveryPanel } from "./RecoveryPanel";

/**
 * The two panels as a deck, after a supplied reference: each card comes
 * to rest a little lower than the one before it, so the card behind
 * keeps a strip of its top edge showing above the one in front.
 *
 * The stacking is sticky positioning, not a pinned scroll scene — every
 * panel is read in full on the way past, and only then slides under the
 * next one. The scrubbed tween just settles the covered card back a
 * touch so the depth reads.
 *
 * Reduced motion: no sticky, no scrub — the panels sit one under the
 * other and nothing overlaps.
 */

/* Where each card parks, and how much of the one behind stays visible. */
const DECK_TOP = 24;
const DECK_STEP = 26;

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
            end: `top top+=${DECK_TOP + DECK_STEP * (i + 1)}`,
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="order-first mx-auto flex w-full max-w-[320px] flex-col gap-3 lg:order-none">
        <RecoveryPanel />
        <SleepPanel />
      </div>
    );
  }

  return (
    <div ref={root} className="order-first mx-auto w-full max-w-[320px] lg:order-none">
      {[RecoveryPanel, SleepPanel].map((Panel, i) => (
        <div
          key={i}
          data-deck-card
          className="sticky"
          style={{
            top: DECK_TOP + DECK_STEP * i,
            zIndex: i + 1,
            marginTop: i === 0 ? 0 : 16,
            /* The card settles back from its own top edge, so the strip
               it leaves showing stays put as it recedes. */
            transformOrigin: "50% 0%",
          }}
        >
          <Panel />
        </div>
      ))}
    </div>
  );
}
