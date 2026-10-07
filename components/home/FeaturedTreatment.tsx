import Image from "next/image";
import type { SVGProps } from "react";

/**
 * ⚠️ CLONE of a supplied reference screenshot — none of this copy is
 * Vitaloop's. Layout exercise only; every string must be replaced
 * before anything ships.
 *
 * The reference's two photographs (the specialist portrait and the food
 * shot) aren't available, so both are tinted placeholder panels. Drop
 * real images in and the layout is unchanged.
 */

const TAGS = [
  "Clinical nutrition",
  "Professional mentor",
  "Metabolic support",
  "Meal planning",
  "Consultation",
  "Assurance",
  "Best Facilities",
];

const TRACKING_BARS = 17;
const TRACKING_FILLED = 7;

function TwoRings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <circle cx={18} cy={16} r={13} />
      <circle cx={30} cy={16} r={13} />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z" />
    </svg>
  );
}

function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h13m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

export function FeaturedTreatment() {
  return (
    <section className="bg-[#f2efe9] py-16 text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex items-center justify-between border-t border-[#d8d4cc] pt-4 text-[11px] tracking-[0.18em] text-[#8a8780] uppercase">
          <span>{"// Featured treatment"}</span>
          <span>[ 03 ]</span>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.06fr_1fr] lg:gap-12">
          <div>
            {/*
              The ring mark is absolutely placed rather than sitting in a
              flex row: in flow it ate enough of the column to push
              "Nutritional support for" onto a second line.
            */}
            <div className="relative">
              <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.12] font-normal tracking-[-0.02em]">
                Nutritional support for
                <br />
                balanced living
              </h2>
              <TwoRings
                aria-hidden
                className="absolute top-2 right-0 hidden h-8 w-12 text-[#1a1a1a] lg:block"
              />
            </div>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white px-4 py-2.5 text-[13.5px] whitespace-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              {/* Placeholder for the specialist portrait. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-b from-[#6e6a63] to-[#9c968c]">
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-[12px] leading-tight font-semibold tracking-[0.06em] uppercase">
                    Only 15 slots
                    <br />
                    left this month
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/55">
                    <div className="h-full w-[42%] rounded-full bg-[#b8e06a]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-normal">
                  Dr. Adam Jack
                </p>
                <p className="mt-2 text-[17px] text-[#8a8780]">Our specialist</p>

                <p className="mt-6 flex items-center gap-2 text-[19px]">
                  <StarIcon aria-hidden className="h-5 w-5 text-[#f5a623]" />
                  5.0
                </p>

                <p className="mt-9 max-w-[22rem] text-[17px] leading-snug">
                  “ Join thousands finding success through success through .”
                </p>

                <a
                  href="#"
                  className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-[#2f4a35] py-1.5 pr-1.5 pl-6 text-[15px] font-semibold text-white"
                >
                  Book now
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1a1a1a]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Backdrop extracted from the supplied reference — the clean
                fabric gradient, with its text and gauge cropped out. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src="/treatment-bg.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Sits below the gauge rather than at the very top, so the
                extracted background isn't hidden behind the card. */}
            <div className="absolute inset-x-5 top-[30%] rounded-2xl bg-white p-6 sm:inset-x-7">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.08em] text-[#6f6b64] uppercase">
                    Maximum calories per day
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-medium">
                      1.800
                    </span>
                    <span className="text-[13px] text-[#8a8780]">KCAL</span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.08em] text-[#6f6b64] uppercase">
                    Salmon calories
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-medium">
                      142
                    </span>
                    <span className="text-[13px] text-[#8a8780]">KCAL</span>
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between text-[15px]">
                <span className="text-[#4a473f]">Today tracking</span>
                <span className="font-medium">40%</span>
              </div>

              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: TRACKING_BARS }).map((_, i) => (
                  <span
                    key={i}
                    className="h-14 flex-1 rounded-full"
                    style={
                      i < TRACKING_FILLED
                        ? { background: "#2f4a35" }
                        : {
                            background:
                              "repeating-linear-gradient(135deg,#e6e3dd 0 2px,transparent 2px 5px)",
                          }
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
