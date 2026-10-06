import type { SVGProps } from "react";

/**
 * ⚠️ CLONE of a supplied reference screenshot (a weather app landing
 * page) — none of this copy is Vitaloop's. Layout exercise only;
 * every string must be replaced before anything ships.
 *
 * The reference's phone render is rebuilt in markup rather than dropped
 * in as an image, so there's no asset to source.
 */

const LEFT_LABELS = [
  "14-day hourly forecast",
  "Air Quality Index (AQI)",
  "Temperature in your location",
];

const RIGHT_FEATURES = [
  {
    bold: "UV",
    trail: " index",
    description: "Know the UV index for today, tomorrow, and coming days",
  },
  {
    lead: "Animated ",
    bold: "wind forecast",
    description: "Explore the animated wind forecast for 2 weeks in advance",
  },
  {
    lead: "Hourly precipitation ",
    bold: "outlook",
    description: "Get hourly precipitation outlook",
  },
];

const PHONE_FORECAST = [
  { day: "Today", temp: "10°", sky: "Clear", faded: false },
  { day: "Tomorrow", temp: "12°", sky: "Cloudy", faded: false },
  { day: "Wed", temp: "15°", sky: "Clear", faded: false },
  { day: "Thu", temp: "9°", sky: "Clear", faded: true },
];

function CloudGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 36" fill="currentColor" {...props}>
      <path d="M18 34a13 13 0 0 1-.6-26 17 17 0 0 1 31.3 5.1A10.5 10.5 0 0 1 46 34z" />
    </svg>
  );
}

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 4v10m0 0 4-4m-4 4-4-4" />
      <path d="M5 18h14" />
    </svg>
  );
}

function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx={12} cy={12} r={3.2} />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 7.5l1.9 1.1M17.9 15.4l1.9 1.1M4.2 16.5l1.9-1.1M17.9 8.6l1.9-1.1" />
    </svg>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.6a5.6 5.6 0 0 0-5.6 5.6v3.4L5 14.9a.8.8 0 0 0 .7 1.2h12.6a.8.8 0 0 0 .7-1.2l-1.4-3.3V8.2A5.6 5.6 0 0 0 12 2.6z" />
      <path d="M10 17.6a2 2 0 0 0 4 0z" />
    </svg>
  );
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85s-1.8-.83-3-.81c-1.5.02-2.9.88-3.7 2.24-1.6 2.75-.4 6.8 1.1 9 .75 1.1 1.6 2.3 2.8 2.26 1.1-.05 1.5-.72 2.9-.72s1.7.72 2.9.7c1.2-.02 2-1.1 2.7-2.2.85-1.26 1.2-2.5 1.2-2.56-.03-.01-2.3-.88-2.3-3.5z" />
      <path d="M14.2 5.8c.6-.75 1-1.8.9-2.8-.9.04-2 .6-2.6 1.35-.55.65-1.05 1.7-.9 2.7 1 .08 2-.5 2.6-1.25z" />
    </svg>
  );
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 2.8v18.4c0 .7.75 1.1 1.3.76l14.3-9.2a.9.9 0 0 0 0-1.52L5.3 2.04C4.75 1.7 4 2.1 4 2.8z" />
    </svg>
  );
}

function Marker() {
  return (
    <span
      aria-hidden
      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-[#c9cdd2] bg-[#f1f1f1]"
    />
  );
}

/**
 * The three labels on each side sit on the dashed circle, so the middle
 * one lands at the circle's widest point and the outer two pull back
 * toward the centre. Offsetting the middle row outward reproduces that
 * curve without positioning each marker trigonometrically.
 */
const CURVE_OFFSET = ["", "lg:-translate-x-10", ""];
const CURVE_OFFSET_RIGHT = ["", "lg:translate-x-10", ""];

export function AppSection() {
  return (
    <section className="relative overflow-hidden bg-[#f1f1f1] py-16 text-[#15130f]">
      <p className="px-6 text-[14px] text-[#9aa0a6] lg:px-10">
        our app<sup className="text-[10px]">[03]</sup>
      </p>

      <h2 className="mt-10 text-center text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.15] font-medium tracking-[-0.02em]">
        <span className="inline-flex items-center gap-3">
          Weather
          <CloudGlyph className="h-[0.55em] w-[0.95em] text-[#15130f]" />
          forecast
        </span>
        <br />
        <span className="inline-flex items-center gap-3">
          in your
          <span className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6">
            pocket
            <span className="flex h-[0.95em] w-[0.95em] items-center justify-center rounded-full bg-[#1f9cf0] text-white">
              <DownloadIcon className="h-[0.5em] w-[0.5em]" />
            </span>
          </span>
        </span>
      </h2>

      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-28 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#c9cdd2] lg:block"
        />

        <ul className="flex flex-col gap-20 text-[18px] text-[#b4b9be] lg:items-end lg:text-right">
          {LEFT_LABELS.map((label, i) => (
            <li
              key={label}
              className={`flex max-w-[17rem] items-start gap-3 lg:flex-row-reverse ${CURVE_OFFSET[i]}`}
            >
              <Marker />
              <span className="leading-snug">{label}</span>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mx-auto w-[272px]">
          <div className="absolute -inset-x-8 -top-12 bottom-10 rounded-t-[150px] rounded-b-[70px] bg-gradient-to-b from-[#bcd7e0] to-[#dceaee]" />

          <div className="relative mx-auto mt-2 overflow-hidden rounded-[2.4rem] border-[7px] border-white bg-gradient-to-b from-[#9ebccb] via-[#b9d2da] to-[#dfe9ea] pt-2 text-white shadow-xl">
            <div className="mx-auto h-[22px] w-20 rounded-full bg-white/85" />

            <div className="px-4 pt-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px]">21:30</p>
                  <p className="text-[25px] leading-tight font-medium">New York</p>
                </div>
                <div className="flex -space-x-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/40">
                    <GearIcon className="h-4 w-4" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/55">
                    <BellIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              <p className="mt-1.5 border-b border-white/35 pb-2.5 text-[12px] text-white/85">
                Today <span className="font-semibold text-white">28.12.23</span>
              </p>

              <div className="mt-3 flex items-start justify-between">
                <p className="flex items-baseline gap-2 text-[46px] leading-none font-semibold">
                  10°
                  <span className="text-[15px] font-normal">Clear</span>
                </p>
                <div className="flex flex-col items-end gap-0.5 text-[9px]">
                  <span className="rounded-full bg-white/40 px-2 py-0.5">Wind</span>
                  <span className="pr-1 text-white/90">5 km/h</span>
                  <span className="mt-1 rounded-full bg-white/40 px-2 py-0.5">Humidity</span>
                  <span className="pr-1 text-white/90">78 %</span>
                </div>
              </div>

              <p className="mt-5 text-[34px] leading-[1.12] font-medium">
                It’s
                <br />
                Getting
                <br />
                <span className="inline-flex items-baseline gap-2">
                  Cold
                  <span className="flex h-5 w-5 translate-y-[2px] items-center justify-center rounded-full bg-[#1f9cf0]">
                    <DownloadIcon className="h-3 w-3 text-white" />
                  </span>
                </span>
              </p>

              <ul className="mt-6 grid grid-cols-4 gap-1.5 border-t border-white/35 pt-3 text-[9px]">
                {PHONE_FORECAST.map(({ day, temp, sky, faded }) => (
                  <li key={day} className={faded ? "opacity-40" : undefined}>
                    <p className="text-white/80">{day}</p>
                    <p className="text-[16px] font-semibold">{temp}</p>
                    <p className="text-white/80">{sky}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-t-[1.5rem] bg-white/25 px-3 py-3 backdrop-blur-sm">
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#15130f]">
                add location
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15130f]">
                <DownloadIcon className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="ml-auto h-10 w-16 rounded-xl bg-gradient-to-b from-[#6f8a9c] to-[#9fb4c0]" />
            </div>
          </div>

          {/* Clouds sit above the phone, overlapping its edges as in the reference. */}
          <CloudGlyph
            aria-hidden
            className="absolute top-[30%] -right-16 z-20 h-12 w-24 text-white drop-shadow-md"
          />
          <CloudGlyph
            aria-hidden
            className="absolute top-[52%] -left-14 z-20 h-10 w-20 text-white drop-shadow-md"
          />
        </div>

        <ul className="flex flex-col gap-20">
          {RIGHT_FEATURES.map(({ lead, bold, trail, description }, i) => (
            <li
              key={bold}
              className={`flex max-w-[19rem] items-start gap-3 ${CURVE_OFFSET_RIGHT[i]}`}
            >
              <Marker />
              <div>
                <p className="text-[20px] leading-snug">
                  {lead}
                  <strong className="font-semibold">{bold}</strong>
                  {trail}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-[#7d7465]">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl px-6 lg:px-10">
        <div className="flex items-center gap-3 rounded-[1.75rem] bg-white p-3 pr-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e3e3e3]">
            <AppleIcon className="h-5 w-5 text-[#15130f]" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e3e3e3]">
            <PlayIcon className="h-5 w-5 text-[#15130f]" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#15130f]">
            <DownloadIcon className="h-5 w-5 text-white" />
          </span>
          <p className="max-w-[17rem] text-[13px] leading-snug">
            Get <strong className="font-semibold">skysavvy®</strong> for an all-in-one weather
            assistant right on your device
          </p>
        </div>
      </div>
    </section>
  );
}
