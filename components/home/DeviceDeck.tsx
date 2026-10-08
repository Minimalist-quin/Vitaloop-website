"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The device card and the spec grid, choreographed as one scroll scene:
 * the card opens at the full width of the section and plays the product
 * film, then stands aside into its column while the specifications take
 * the space it leaves.
 *
 * Both halves live on one scrubbed timeline, because they are one move.
 * The film runs over the first stretch; the hand-off overlaps its last
 * scene, so the card is already travelling while the wrist shot plays
 * rather than waiting for it to end.
 *
 * The grid is driven in pixels rather than by swapping classes. The
 * columns are fr units and the gap is fixed, neither of which can be
 * interpolated between two layouts; resolving both to pixels per frame
 * gives one continuous move instead of a jump. The pixel override is
 * only ever applied where the four-column layout exists — everywhere
 * else the stylesheet is left alone.
 *
 * The video is contained, never cropped: the exploded scene spreads its
 * parts the full width of the frame and loses them to any crop. What
 * the frame does not cover is the card's own ground, which is the
 * footage's own ground colour, so for every scene shot against it the
 * card and the picture read as one surface.
 */

/* The card's ground, where the contained frame does not reach it. The
   footage's own ground is not one colour, and it falls off vertically
   about two and a half times as hard as it does horizontally — sampled
   off the poster, top to bottom spreads 26-32 per channel against 11-13
   left to right. So the card matches the vertical run and ignores the
   horizontal one: it is the single gradient that fits bands down either
   side of a wide card and bands above and below a narrow one, which is
   both shapes this card takes. Re-sample if the film is recut. */
const GROUND = "linear-gradient(to bottom, #f0e7e2, #d6cbc2)";

/* Scrub lags the scroll by this many seconds, so a flicked wheel reads
   as weight rather than as a jump. */
const SCRUB = 0.6;

/* How much scroll one second of footage is worth while the section is
   held. Pace the scene here, not by recutting the film. */
const PX_PER_SECOND = 130;

/* The loop's length, used until the file reports its own. The scene is
   built immediately rather than waiting on metadata that may never
   arrive. Keep in step with public/device-loop-scrub.mp4. */
const LOOP_SECONDS = 20;

/* Where the hand-off sits on the timeline. The film has the run up to
   it; the two overlap so the card moves during the last scene. */
const HANDOFF_AT = 0.78;
const FILM_ENDS_AT = 0.86;

/* The four-column layout, as the stylesheet declares it. */
const COLS = [2.4, 1, 1, 1];
const GAP = 16;
const LG = "(min-width: 1024px)";

/* Holding a section taller than the screen holds part of it out of
   sight for the whole of the loop, so the hold is only taken when the
   section fits. Where it cannot — narrow widths, where the cards stack
   several screens tall — the film still scrubs, without the hold. */
const MAX_PINNABLE_SCREENS = 1.02;

export function DeviceDeck({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const grid = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    const gridEl = grid.current;
    const cardEl = card.current;
    if (reduced || !el || !gridEl || !cardEl) return;

    registerGsap();

    const trigger = gridEl.closest("section") ?? gridEl;
    const specs = Array.from(gridEl.children).filter((n) => n !== cardEl) as HTMLElement[];

    const seconds = () => (Number.isFinite(el.duration) ? el.duration : LOOP_SECONDS);
    const wide = () => window.matchMedia(LG).matches;

    /* Measured once per refresh, from the layout the stylesheet gives —
       so the finished state is whatever CSS says it is, and the scene
       only describes the journey to it. */
    let endWidths: number[] = [];
    let endCardHeight = 0;
    let startCardHeight = 0;

    const measure = () => {
      gridEl.style.removeProperty("grid-template-columns");
      gridEl.style.removeProperty("grid-template-rows");
      gridEl.style.removeProperty("column-gap");
      cardEl.style.removeProperty("height");
      specs.forEach((s) => s.style.removeProperty("opacity"));

      const total = gridEl.getBoundingClientRect().width;
      const span = COLS.reduce((a, b) => a + b, 0);
      const usable = total - GAP * (COLS.length - 1);
      endWidths = COLS.map((c) => (usable * c) / span);

      endCardHeight = cardEl.getBoundingClientRect().height;

      /* The card grows into whatever headroom the section has left over
         inside the screen it is about to be held on, and no further. */
      const slack = window.innerHeight - trigger.getBoundingClientRect().height;
      startCardHeight = endCardHeight + Math.max(0, slack);
    };

    /* t: 0 is the full-width film, 1 is the finished grid. */
    const apply = (t: number) => {
      if (!wide()) return;
      const gap = GAP * t;
      const rest = endWidths.slice(1).map((w) => w * t);
      const first = gridEl.getBoundingClientRect().width - gap * 3 - rest.reduce((a, b) => a + b, 0);

      const height = startCardHeight + (endCardHeight - startCardHeight) * t;

      gridEl.style.columnGap = `${gap}px`;
      gridEl.style.gridTemplateColumns = [first, ...rest].map((w) => `${w}px`).join(" ");
      cardEl.style.height = `${height}px`;

      /* The row has to be pinned to the card's height. A grid row takes
         the height of its tallest item, and a spec column squeezed
         towards zero width wraps its text into a tower — which drove the
         row, and the section, far past the screen it is meant to fit
         inside. The columns clip, so the overflow costs nothing. */
      gridEl.style.gridTemplateRows = `${height}px`;

      /* The specs arrive late in the move, once there is room to read
         them, rather than fading up inside a column still opening. */
      const fade = gsap.utils.clamp(0, 1, (t - 0.45) / 0.55);
      specs.forEach((s) => (s.style.opacity = `${fade}`));
    };

    const reset = () => {
      gridEl.style.removeProperty("grid-template-columns");
      gridEl.style.removeProperty("grid-template-rows");
      gridEl.style.removeProperty("column-gap");
      cardEl.style.removeProperty("height");
      specs.forEach((s) => s.style.removeProperty("opacity"));
    };

    const warm = ScrollTrigger.create({
      trigger,
      start: "top bottom+=100%",
      once: true,
      onEnter: () => {
        el.preload = "auto";
        el.load();
      },
    });

    let tl: gsap.core.Timeline | null = null;

    const teardown = () => {
      tl?.scrollTrigger?.kill(true);
      tl?.kill();
      tl = null;
      reset();
    };

    const build = () => {
      if (tl || el.error) return;

      measure();

      const pinned = wide() && trigger.getBoundingClientRect().height <= window.innerHeight * MAX_PINNABLE_SCREENS;
      const hand = { t: wide() ? 0 : 1 };
      apply(hand.t);

      tl = gsap.timeline({
        scrollTrigger: pinned
          ? {
              trigger,
              start: "top top",
              end: () => `+=${Math.round(seconds() * PX_PER_SECOND)}`,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: SCRUB,
              onRefresh: () => {
                measure();
                apply(hand.t);
              },
            }
          : { trigger, start: "top bottom", end: "bottom top", invalidateOnRefresh: true, scrub: SCRUB },
      });

      tl.to(el, { currentTime: seconds, ease: "none", duration: FILM_ENDS_AT }, 0);

      if (wide()) {
        tl.to(
          hand,
          {
            t: 1,
            ease: "power2.inOut",
            duration: 1 - HANDOFF_AT,
            onUpdate: () => apply(hand.t),
          },
          HANDOFF_AT,
        );
      }
    };

    build();

    const onMeta = () => ScrollTrigger.refresh();
    const onError = () => teardown();
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("error", onError);

    /* A resize can cross the pin threshold or the layout breakpoint in
       either direction, and both were decided once. */
    let lastWide = wide();
    const onResize = () => {
      if (wide() === lastWide && tl?.scrollTrigger?.pin) return;
      lastWide = wide();
      teardown();
      build();
    };
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("error", onError);
      window.removeEventListener("resize", onResize);
      teardown();
      warm.kill();
    };
  }, [reduced]);

  return (
    <div
      ref={grid}
      className="mt-[clamp(1.75rem,5vh,4rem)] grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-[2.4fr_1fr_1fr_1fr]"
    >
      <div
        ref={card}
        className="relative min-h-[clamp(260px,42vh,420px)] overflow-hidden rounded-[20px]"
        style={{ background: GROUND }}
      >
        {/*
          The poster is an element rather than only the video's attribute:
          it is the whole card under reduced motion, and it is what shows
          if the file never arrives. Contained, like the video, so the
          two never disagree about framing.
        */}
        <Image
          src="/device-loop-poster.webp"
          alt="The Vitaloop wearable, shown from the front at a three-quarter angle."
          fill
          sizes="(min-width: 1024px) 1180px, 100vw"
          className="object-contain"
        />

        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-contain motion-reduce:hidden"
          muted
          playsInline
          /* "metadata", not "none": none leaves the browser free to fetch
             nothing at all, so there is no duration and no frame to seek
             to. This costs the header; the warm trigger raises it to
             "auto" for the rest. */
          preload="metadata"
          poster="/device-loop-poster.webp"
          aria-hidden
        >
          <source src="/device-loop-scrub.mp4" type="video/mp4" />
        </video>
      </div>

      {children}
    </div>
  );
}
