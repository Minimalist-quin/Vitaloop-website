"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The device card and the specifications under it. The card runs the
 * full width of the section at the film's own shape, and the section is
 * held while scroll plays the film through it.
 *
 * What is held is judged by the card, not by the section: the section is
 * taller than a laptop screen and does not need to be in view all at
 * once, but the picture does. So the hold starts once the card is fully
 * on screen, and the heading above it has scrolled past by then — it is
 * read on the way in rather than held alongside.
 *
 * The card carries 16:9 so the picture fills it: no band to colour
 * match, nothing cropped, no fabricated edge. Earlier passes fitted the
 * film into a narrower card by stretching its edge rows, which smears
 * anything touching the frame edge, and then by blurring the frame,
 * which keeps the strap as recognisable blobs. Giving the film its own
 * shape removes the problem rather than disguising it.
 */

/* The ground behind the picture. The card matches the film's shape, so
   this is only ever seen through rounding — but it keeps a hairline of
   white from showing at the corners. */
const GROUND = "#efe8e2";

/* Scrub lags the scroll by this many seconds, so a flicked wheel reads
   as weight rather than as a jump. */
const SCRUB = 0.6;

/* How much scroll one second of footage is worth while the card is
   held. Pace the scene here, not by recutting the film. */
const PX_PER_SECOND = 130;

/* The loop's length, used until the file reports its own. The scene is
   built immediately rather than waiting on metadata that may never
   arrive. Keep in step with public/device-loop-scrub.mp4. */
const LOOP_SECONDS = 20;

export function DeviceDeck({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    const cardEl = card.current;
    const rootEl = root.current;
    if (reduced || !el || !cardEl || !rootEl) return;

    registerGsap();

    const section = (rootEl.closest("section") ?? rootEl) as HTMLElement;
    const seconds = () => (Number.isFinite(el.duration) ? el.duration : LOOP_SECONDS);

    /* preload="metadata" in the markup guarantees a duration and a frame
       to seek to; this raises it to the whole file once the card is
       within a screen of the viewport. */
    const warm = ScrollTrigger.create({
      trigger: cardEl,
      start: "top bottom+=100%",
      once: true,
      onEnter: () => {
        el.preload = "auto";
        el.load();
      },
    });

    let tween: gsap.core.Tween | null = null;

    /* kill(true), not kill(): a pinned trigger wraps its element in a
       pin-spacer, and killing without reverting leaves that behind. */
    const teardown = () => {
      tween?.scrollTrigger?.kill(true);
      tween?.kill();
      tween = null;
    };

    /* The hold is only worth taking while the whole picture fits the
       screen. On a window too short for it the film still scrubs, just
       without the hold. */
    const fits = () => cardEl.getBoundingClientRect().height <= window.innerHeight;

    const build = () => {
      /* A file the browser has rejected is the one case worth refusing
         to hold the reader for: there would be nothing behind the hold
         but the poster. */
      if (tween || el.error) return;

      const pinned = fits();

      tween = gsap.to(el, {
        currentTime: seconds,
        ease: "none",
        scrollTrigger: pinned
          ? {
              trigger: cardEl,
              /* Held from the moment the card is wholly on screen, so
                 the film never plays against a cropped frame. */
              start: "bottom bottom",
              end: () => `+=${Math.round(seconds() * PX_PER_SECOND)}`,
              pin: section,
              /* Lenis eases the scroll, so the pin is taken a frame
                 early or the section jumps as it catches. */
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: SCRUB,
            }
          : {
              trigger: cardEl,
              start: "top bottom",
              end: "bottom top",
              invalidateOnRefresh: true,
              scrub: SCRUB,
            },
      });
    };

    build();

    /* Once the real duration is known, a refresh re-reads it and the end
       distance corrects itself. */
    const onMeta = () => ScrollTrigger.refresh();
    const onError = () => teardown();
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("error", onError);

    /* A resize changes the card's height, and with it whether the hold
       is worth taking. Rebuild only when that answer changes —
       ScrollTrigger handles every other resize itself. */
    let held = fits();
    const onResize = () => {
      if (fits() === held) return;
      held = fits();
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
    <div ref={root} className="mt-[clamp(1.75rem,5vh,4rem)] flex flex-col gap-4">
      <div
        ref={card}
        /* The film's own shape, so the picture fills the card edge to
           edge. A min-height here would win over the ratio and leave a
           band, which is the whole thing this avoids. */
        className="relative aspect-[16/9] overflow-hidden rounded-[20px]"
        style={{ background: GROUND }}
      >
        {/*
          The poster is an element rather than only the video's
          attribute: it is the whole card under reduced motion, and it
          is what shows if the file never arrives. Not `priority` — this
          card is below the fold and the hero owns first paint.
        */}
        <Image
          src="/device-loop-poster.webp"
          alt="The Vitaloop wearable, shown from the front at a three-quarter angle."
          fill
          sizes="(min-width: 1180px) 1180px, 100vw"
          className="object-cover"
        />

        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          muted
          playsInline
          /* "metadata", not "none": none leaves the browser free to
             fetch nothing at all, so there is no duration and no frame
             to seek to. This costs the header; the warm trigger raises
             it to "auto" for the rest. */
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
