import Image from "next/image";

/**
 * ⚠️ LITERAL CLONE of Media/image.png — a screenshot of riseatseven.com.
 *
 * The wordmark, nav labels, headline, award claims, body copy and
 * photography below all belong to Rise at Seven, not Vitaloop. This is a
 * layout-matching exercise only: every string and image here must be
 * replaced before anything ships. The photography is extracted from the
 * supplied screenshot (public/hero-thumb.jpg), used both inline and —
 * scaled up and blurred — as the backdrop.
 */

const NAV_LINKS = [
  { label: "Services", hasPlus: true, badge: false },
  { label: "International", hasPlus: true, badge: false },
  { label: "About", hasPlus: true, badge: false },
  { label: "Work", hasPlus: false, badge: true },
  { label: "Careers", hasPlus: false, badge: false },
  { label: "Blog", hasPlus: false, badge: false },
  { label: "Webinar", hasPlus: false, badge: false },
];

const AWARDS = ["Global Search Awards", "The Drum", "UK Social Media Awards", "Content Awards"];

function Laurel({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 60"
      aria-hidden
      className="h-10 w-7 shrink-0 opacity-90"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
      stroke="none"
    >
      <path
        d="M30 3C15 11 7 26 11 43c1.4 6 3.8 10.5 7 13.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx={26 - i * 3.1}
          cy={8 + i * 7.4}
          rx={7}
          ry={3.1}
          transform={`rotate(${-58 + i * 7} ${26 - i * 3.1} ${8 + i * 7.4})`}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <div className="min-h-[100svh]">
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src="/hero-thumb.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-125 object-cover blur-[18px]"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />

        <header className="flex items-center justify-between px-10 py-8">
          <span className="text-2xl font-medium tracking-[-0.01em] whitespace-nowrap">
            Rise at Seven<span className="ml-0.5 inline-block rotate-[-35deg]">↘</span>
          </span>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <span key={link.label} className="relative">
                {link.badge && (
                  <span
                    aria-hidden
                    className="absolute -top-5 left-1/2 flex h-5 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#9fe8c4] text-[10px] text-[#1c3b2c]"
                  >
                    ↗
                  </span>
                )}
                <a
                  href="#"
                  className="text-[15px] whitespace-nowrap text-white/90 hover:text-white"
                >
                  {link.label}
                  {link.hasPlus && " +"}
                </a>
              </span>
            ))}
          </nav>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] whitespace-nowrap text-[#1b1b1b]"
          >
            Get In Touch <span aria-hidden>↗</span>
          </a>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-[13px] leading-snug tracking-[0.04em] uppercase">
            #1 Most Recommended
            <br />
            Content Marketing Agency
          </p>

          <div className="mt-5 flex items-center justify-center gap-4 text-white">
            <Laurel />
            <div className="flex items-center gap-6">
              {AWARDS.map((award) => (
                <span
                  key={award}
                  className="max-w-[88px] text-[9px] leading-tight font-semibold tracking-[0.02em] uppercase opacity-90"
                >
                  {award}
                </span>
              ))}
            </div>
            <Laurel flipped />
          </div>

          <h1 className="mt-8 text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] font-bold tracking-[-0.02em]">
            <span className="block">We Create</span>
            <span className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-2">
              Category
              <Image
                src="/hero-thumb.jpg"
                alt=""
                width={210}
                height={228}
                className="inline-block h-[1.08em] w-[1em] rounded-[0.18em] object-cover align-middle"
              />
              Leaders
            </span>
          </h1>

          <p className="mt-10 bg-black/45 px-8 py-2 text-[clamp(1rem,1.8vw,1.6rem)]">
            on every searchable platform
          </p>
        </div>

        <footer className="flex flex-col gap-4 px-10 py-8 text-[14px] leading-snug sm:flex-row sm:items-end sm:justify-between">
          <p>
            Organic media planners creating, distributing &amp; optimising
            <br />
            <strong className="font-semibold">search-first</strong> content for SEO, Social, PR
          </p>
          <p className="font-semibold sm:text-right">
            4 Global Offices serving
            <br />
            UK, USA (New York) &amp; EU
          </p>
        </footer>
      </section>
    </div>
  );
}
