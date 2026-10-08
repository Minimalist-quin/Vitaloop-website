"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The device loop, scrubbed by scroll: the five scenes — front, profile,
 * back, exploded, on the wrist — advance with the reader rather than
 * playing on their own clock. The motion explains how the device is
 * built, which is the bar a scroll scene has to clear here.
 *
 * Why a second file rather than seeking the playback encode: seeking
 * video by currentTime costs a decode from the nearest keyframe, and a
 * normal encode only carries one every couple of seconds, so scrubbing
 * it stutters. device-loop-scrub.mp4 is encoded all-intra — every frame
 * is a keyframe — which makes any seek a single frame's work. That costs
 * bitrate, paid back by dropping to 12fps and 760px: scrubbing is driven
 * by the wheel, not by a frame clock, so neither reads as missing.
 *
 * The playback encode stays for the readers who never get a scrubber:
 * reduced-motion and coarse/low-power pointers. They see the poster.
 */

/* Scrub lags the scroll by this many seconds, so a flicked wheel reads
   as weight rather than as a jump. */
const SCRUB = 0.6;

/* How much scroll one second of footage is worth while the section is
   held. Twenty seconds at this rate is a little under three screens —
   long enough that a scene is read rather than flicked past, short
   enough that nobody feels held. Pace the scenes here, not by recutting
   the film. */
const PX_PER_SECOND = 130;

/* Holding a section taller than this many screens means holding the
   reader against content they cannot see — which is what happens on
   narrow widths, where the spec cards stack and the section runs to
   several screens. Past it the loop still scrubs, just without the
   hold. A little over one screen is allowed: the section overruns most
   laptop viewports by a hair, and refusing to pin for that would mean
   never pinning at all. */
const MAX_PINNABLE_SCREENS = 1.3;

/* The loop's length, used until the file reports its own. The scrub used
   to be built from the loadedmetadata event, which made the whole scene
   hostage to the video: slow network, a decoder that defers, or a Fast
   Refresh that swaps the element, and the event never arrives, so
   nothing pins and nothing scrubs. The asset is ours and fixed, so the
   scene is built immediately against this and corrected the moment the
   real duration lands. Keep it in step with public/device-loop-scrub.mp4. */
const LOOP_SECONDS = 20;

export function DeviceLoop({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = video.current;
    const mount = root.current;
    if (reduced || !el || !mount) return;

    registerGsap();

    /* The section is the runway, not the card: scrubbing twenty seconds
       across a 420px card would make every scene a flick. */
    const trigger = mount.closest("section") ?? mount;

    /* preload="none" in the markup keeps the loop off first paint. It is
       fetched once the section is within a screen of the viewport, which
       is far enough ahead that the first seek has frames to land on.
       preload has to be raised before load(): left at "none" the spec
       lets the browser do nothing, and on WebKit it does exactly that. */
    const warm = ScrollTrigger.create({
      trigger,
      start: "top bottom+=100%",
      once: true,
      onEnter: () => {
        el.preload = "auto";
        el.load();
      },
    });

    /* The length is read through a function so GSAP re-reads it on every
       refresh: it starts at LOOP_SECONDS and becomes the file's real
       duration the moment that is known, without the scene waiting on
       it. */
    const seconds = () => (Number.isFinite(el.duration) ? el.duration : LOOP_SECONDS);

    let tween: gsap.core.Tween | null = null;
    let pinnedNow: boolean | null = null;

    const fits = () =>
      trigger.getBoundingClientRect().height <= window.innerHeight * MAX_PINNABLE_SCREENS;

    /* kill(true) rather than kill(): a pinned trigger wraps the section
       in a pin-spacer, and killing without reverting leaves that spacer
       behind — a dead gap on unmount, and a doubled one if a resize
       rebuilds through here. */
    const teardown = () => {
      tween?.scrollTrigger?.kill(true);
      tween?.kill();
      tween = null;
    };

    const build = () => {
      /* A file the browser has rejected outright is the one case worth
         refusing to hold the reader for — there would be nothing behind
         the hold but the poster. */
      if (tween || el.error) return;

      const pinned = fits();
      pinnedNow = pinned;

      tween = gsap.to(el, {
        currentTime: seconds,
        ease: "none",
        scrollTrigger: pinned
          ? {
              trigger,
              /* The section comes to rest against the top of the screen
                 and stays there for the length of the film. */
              start: "top top",
              end: () => `+=${Math.round(seconds() * PX_PER_SECOND)}`,
              pin: true,
              /* Lenis eases the scroll, so the pin has to be taken a
                 frame early or the section jumps as it catches. */
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: SCRUB,
            }
          : {
              trigger,
              start: "top bottom",
              end: "bottom top",
              invalidateOnRefresh: true,
              scrub: SCRUB,
            },
      });
    };

    build();

    /* Once the real duration is known, a refresh re-reads it and the end
       distance and tween target correct themselves. */
    const onMeta = () => ScrollTrigger.refresh();
    const onError = () => teardown();
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("error", onError);

    /* Rotating a tablet can move the section across the threshold in
       either direction, and whether it pins was decided once. Rebuild
       only when the answer actually changes — ScrollTrigger handles
       every other resize itself. */
    const onResize = () => {
      if (pinnedNow === null || fits() === pinnedNow) return;
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
    <div ref={root} className={className}>
      {/*
        The poster is an element rather than only the video's attribute:
        it is the whole card under reduced motion, and it is what shows
        if the file never arrives. Not `priority` — this card is below
        the fold and the hero owns first paint.
      */}
      <Image
        src="/device-loop-poster.webp"
        alt="The Vitaloop wearable, shown from the front at a three-quarter angle."
        fill
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />

      {/* Muted and playsInline so a seek is never mistaken for playback
          that needs a gesture. It is never played — scroll sets the
          frame — so there is no autoPlay and no loop. */}
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        muted
        playsInline
        /* "metadata", not "none": none leaves the browser free to fetch
           nothing at all, so the file had no duration and no frame to
           seek to until something forced it. This costs the header, not
           the file; the warm trigger raises it to "auto" for the rest. */
        preload="metadata"
        poster="/device-loop-poster.webp"
        aria-hidden
      >
        <source src="/device-loop-scrub.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
