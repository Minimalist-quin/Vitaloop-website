import { ORANGE } from "./panel-theme";

/**
 * "How it works" — a centred heading band over a card grid.
 *
 * ⚠️ The left card is a deliberate placeholder: the reference puts a
 * device mock there and there is no asset for it yet.
 *
 * ⚠️ Two figures the reference fills in are marked [STAT NEEDED]: the
 * sensing count and the on-device percentage. Nothing here may invent
 * them. The checklist is the project's approved claim set, verbatim —
 * detect, alert, guide, bring an AED, wellness insights — so it can
 * ship as written.
 */

const COVERS = [
  "Detects irregular heart signals",
  "Alerts emergency services and your contacts",
  "Guides bystanders through first aid",
  "Brings an AED to the scene",
  "Wellness insights",
];

const INK = "#1a1a1a";
const BODY = "#6f6b64";
const MUTED = "#8a8780";
const CARD = "#f4f3f0";
const RULE = "#e3e0da";

/* Bar heights for the sensing waveform, as a share of the track. */
const WAVE = [0.3, 0.55, 0.85, 0.45, 1, 0.65, 0.35, 0.8, 0.5, 0.95, 0.4, 0.7, 0.25];

function PulseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h3.8l2.2-6 3.4 12 2.4-6H21" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-6 w-6"
      fill="none"
      stroke={INK}
      strokeWidth={1.5}
    >
      <path d="M12 2.6 4.6 5.8v6c0 4.4 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5.2 7.4-9.6v-6z" />
      <path d="m8.8 12 2.3 2.3 4.1-4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckBox() {
  return (
    <span
      aria-hidden
      className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px]"
      style={{ background: ORANGE }}
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth={2}>
        <path d="m2.5 6.3 2.3 2.3L9.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function HowItWorks() {
  return (
    <section>
      <div className="bg-white px-6 py-20 text-center lg:py-24">
        <p
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px]"
          style={{ borderColor: RULE, color: INK }}
        >
          <PulseGlyph />
          How it works
        </p>

        <h2
          className="mx-auto mt-8 max-w-[14ch] text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
          style={{ color: INK }}
        >
          From signal to support, in 3 steps.
        </h2>

        <p
          className="mx-auto mt-6 max-w-[34ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5]"
          style={{ color: BODY }}
        >
          Wear it and forget it, see what changes early, and get help the moment it matters.
        </p>
      </div>

      <div className="bg-white px-4 pt-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto grid max-w-[1180px] gap-4 lg:grid-cols-2">
          {/* ⚠️ PLACEHOLDER — the device mock goes here. */}
          <div
            className="flex min-h-[380px] flex-col items-center justify-center rounded-[20px] border border-dashed p-8 text-center lg:min-h-[460px]"
            style={{ background: CARD, borderColor: "#cfcac1" }}
          >
            <p className="text-[12px] tracking-[0.18em] uppercase" style={{ color: MUTED }}>
              [PLACEHOLDER]
            </p>
            <p className="mt-3 max-w-[26ch] text-[15px] leading-[1.5]" style={{ color: BODY }}>
              Device mock — the watch, showing the signal it is reading.
            </p>
          </div>

          <div className="border-t pt-4" style={{ borderColor: INK }}>
            <div className="grid h-full gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="rounded-[20px] p-5 text-white" style={{ background: ORANGE }}>
                  <p className="text-[17px] font-semibold tracking-[-0.01em]">Knows your rhythm</p>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <span aria-hidden className="flex h-7 items-end gap-[3px]">
                      {WAVE.map((h, i) => (
                        <span
                          key={i}
                          className="w-[3px] rounded-full bg-white"
                          style={{ height: `${h * 100}%` }}
                        />
                      ))}
                    </span>
                    {/* Sized for the marker, not for the figure it stands
                        in for — take this back up to ~26px once a real
                        number replaces it. */}
                    <span className="text-[14px] leading-none font-semibold tracking-[0.02em]">
                      [STAT NEEDED]
                    </span>
                  </div>
                </div>

                <div
                  className="flex flex-1 flex-col justify-between rounded-[20px] p-5"
                  style={{ background: CARD }}
                >
                  <p
                    className="text-[17px] font-semibold tracking-[-0.01em]"
                    style={{ color: INK }}
                  >
                    Reads on the wrist
                  </p>

                  <div className="mt-10 flex items-center justify-between gap-4">
                    <ShieldIcon />
                    <span
                      className="text-[14px] leading-none font-semibold tracking-[0.02em]"
                      style={{ color: INK }}
                    >
                      [STAT NEEDED]
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] p-6" style={{ background: CARD }}>
                <p className="text-[17px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
                  Works when it matters
                </p>
                <p className="mt-1.5 text-[14px]" style={{ color: BODY }}>
                  It watches so you don&rsquo;t have to.
                </p>

                <ul className="mt-6 flex flex-col gap-3.5">
                  {COVERS.map((cover) => (
                    <li key={cover} className="flex items-start gap-2.5">
                      <CheckBox />
                      <span className="text-[14px] leading-[1.4]" style={{ color: INK }}>
                        {cover}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
