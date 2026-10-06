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
  { day: "Today", temp: "10°", sky: "Clear" },
  { day: "Tomorrow", temp: "12°", sky: "Cloudy" },
  { day: "Wed", temp: "15°", sky: "Clear" },
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

function Marker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-[#c9cdd2] bg-white ${className}`}
    />
  );
}

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

      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#c9cdd2] lg:block"
        />

        <ul className="flex flex-col gap-14 text-[17px] text-[#b4b9be] lg:items-end lg:text-right">
          {LEFT_LABELS.map((label) => (
            <li key={label} className="flex max-w-[15rem] items-start gap-3 lg:flex-row-reverse">
              <Marker />
              <span className="leading-snug">{label}</span>
            </li>
          ))}
        </ul>

        <div className="relative mx-auto w-[260px]">
          <div className="absolute -inset-x-7 -top-10 bottom-6 rounded-t-[160px] rounded-b-[48px] bg-gradient-to-b from-[#cfe4ef] to-[#eaf3f7]" />

          <div className="relative mx-auto mt-4 overflow-hidden rounded-[2.2rem] border-[6px] border-white bg-gradient-to-b from-[#a9cfe2] to-[#dcecf3] p-5 text-white shadow-xl">
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/70" />

            <p className="text-[13px]">21:30</p>
            <p className="text-[22px] leading-tight font-medium">New York</p>
            <p className="mt-1 border-b border-white/40 pb-2 text-[11px] text-white/80">
              Today <span className="font-semibold text-white">28.12.23</span>
            </p>

            <div className="mt-3 flex items-start justify-between">
              <p className="text-[44px] leading-none font-semibold">10°</p>
              <div className="flex flex-col items-end gap-1 text-[9px]">
                <span className="rounded-full bg-white/35 px-2 py-0.5">Wind</span>
                <span className="text-white/90">5 km/h</span>
                <span className="rounded-full bg-white/35 px-2 py-0.5">Humidity</span>
                <span className="text-white/90">78 %</span>
              </div>
            </div>
            <p className="mt-1 text-[13px]">Clear</p>

            <p className="mt-4 text-[30px] leading-[1.1] font-medium">
              It’s
              <br />
              Getting
              <br />
              Cold
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-white/40 pt-3 text-[10px]">
              {PHONE_FORECAST.map(({ day, temp, sky }) => (
                <li key={day}>
                  <p className="text-white/80">{day}</p>
                  <p className="text-[17px] font-semibold">{temp}</p>
                  <p className="text-white/80">{sky}</p>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2">
              <span className="flex-1 rounded-full bg-white px-3 py-1.5 text-center text-[10px] font-semibold text-[#15130f]">
                add location
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#15130f]">
                <DownloadIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Clouds sit above the phone, overlapping its edges as in the reference. */}
          <CloudGlyph
            aria-hidden
            className="absolute -right-14 top-[38%] z-10 h-11 w-20 text-white drop-shadow-md"
          />
          <CloudGlyph
            aria-hidden
            className="absolute -left-12 top-[58%] z-10 h-9 w-16 text-white drop-shadow-md"
          />
        </div>

        <ul className="flex flex-col gap-12">
          {RIGHT_FEATURES.map(({ lead, bold, trail, description }) => (
            <li key={bold} className="flex max-w-[17rem] items-start gap-3">
              <Marker />
              <div>
                <p className="text-[19px] leading-snug">
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

      <div className="mx-auto mt-14 flex max-w-6xl px-6 lg:px-10">
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
