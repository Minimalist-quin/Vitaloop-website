import Image from "next/image";

/**
 * ⚠️ CLONE of supplied reference screenshots — none of this copy is
 * Vitaloop's. The navbar and blurred backdrop come from
 * Media/image.png (riseatseven.com); the centre block — eyebrow pill,
 * two-line headline, subhead, "Book demo" pill — comes from a second
 * reference. Backdrop photography is cropped from the first screenshot
 * (public/hero-thumb.jpg). Layout exercise only: every string and image
 * here must be replaced before anything ships.
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
          <span className="rounded-full bg-white px-5 py-2.5 text-[14px] text-[#1b1b1b] shadow-sm">
            Coming Fall 2024
          </span>

          <h1
            className="mt-10 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] font-bold tracking-[-0.035em]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
          >
            A CRM that helps
            <br />
            you sell more.
          </h1>

          <p className="mt-8 text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-white/75">
            Finally an easy-to-use CRM built for small businesses:
            <br />
            fast, automated, and focused on customer relationships.
          </p>

          <a
            href="#"
            className="mt-14 inline-flex items-center rounded-full bg-white px-8 py-4 text-[16px] font-medium text-[#1b1b1b] shadow-lg"
          >
            Book demo
          </a>
        </div>
      </section>
    </div>
  );
}
