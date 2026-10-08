import { cn } from "@/lib/cn";
import { DeviceDeck } from "./DeviceDeck";
import { ACCENT } from "./panel-theme";

/**
 * "How it works" — a centred heading over a card grid: the device on the
 * left, its specifications beside it.
 *
 * The device card runs the full width at the film's own 16:9, and the
 * specifications sit in the row beneath it. Scroll holds the card and
 * plays the film through it — see DeviceDeck, which judges the hold by
 * the card rather than by this section: the section is taller than a
 * laptop screen and does not need to be in view all at once, but the
 * picture does.
 *
 * The footage is used at its own shape and fills the card. Earlier
 * passes fitted it into a narrower card by fabricating the difference —
 * first by stretching the frame's own edge rows, which smears anything
 * touching the edge into vertical streaks, then by blurring the frame,
 * which keeps the strap as recognisable blobs. Giving the film the full
 * width removes the problem rather than disguising it.
 *
 * ⚠️ PLACEHOLDER — the loop is a generated concept render, not
 * photography of a built device, and not a final industrial design.
 * Its closing shot is also not the casting that was asked for. Replace
 * it with real product footage before launch.
 *
 * Nothing on screen says so any more: the badge that marked it was
 * removed deliberately, so this comment and the launch checklist are
 * the only things standing between a concept render and a reader who
 * takes it for the product.
 *
 * Every figure below is the one supplied for the device. None are
 * invented, and none may be — see the project's rule on statistics.
 */

type Spec = {
  label: string;
  value: string;
  icon: () => React.ReactElement;
  /* Which face the card wears. Default is the neutral card surface. */
  face?: "accent" | "charcoal";
  /* The hero card runs the width of the row and shows its figure under a
     large glyph, the way the reference treats battery. */
  sub?: string;
  hero?: boolean;
};

const INK = "#1a1a1a";
const BODY = "#6f6b64";
const CARD = "#f4f3f0";
const RULE = "#e3e0da";
const CHARCOAL = "#24221d";

const ICON = "h-6 w-6";

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={ICON}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12h3.6l1.8-5.2 3.4 11 2.3-8 1.7 4.4h6.2" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      viewBox="0 0 28 24"
      aria-hidden
      className="h-6 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <rect x={1.5} y={6.5} width={21} height={11} rx={3.2} />
      <rect x={4} y={9} width={12} height={6} rx={1.4} fill="currentColor" stroke="none" />
      <path d="M25 10.5v3" strokeLinecap="round" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={ICON}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
    >
      <path d="M12 2.8c3.4 4 6.2 7.2 6.2 10.6a6.2 6.2 0 0 1-12.4 0c0-3.4 2.8-6.6 6.2-10.6" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={ICON}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.2 12.2a6 6 0 0 0-8.5-8.5L5 10.5V19h8.5z" />
      <path d="M16 8 2 22M17.5 15H9" />
    </svg>
  );
}

function BluetoothIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={ICON}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 7.8 11 8.4L12 20.5v-17l5.5 4.3-11 8.4" />
    </svg>
  );
}

/*
  The device's figures, exactly as supplied, grouped into the columns the
  reference uses: stacked pairs beside a single tall card, all running to
  the same height as the device.
*/
const COLUMNS: Spec[][] = [
  [
    { label: "Health monitoring", value: "24/7", icon: MonitorIcon },
    { label: "Water resistance", value: "5 ATM", icon: DropletIcon, face: "charcoal" },
  ],
  [
    { label: "Lightweight design", value: "<30 g", icon: FeatherIcon },
    { label: "Connected", value: "Bluetooth", icon: BluetoothIcon },
  ],
  [
    {
      label: "All-day battery",
      sub: "Wear it through the day. Charge it once a week.",
      value: "7+ days",
      icon: BatteryIcon,
      hero: true,
      face: "accent",
    },
  ],
];

const FACES = {
  accent: { background: ACCENT, color: "#ffffff", sub: "rgba(255,255,255,0.82)" },
  charcoal: { background: CHARCOAL, color: "#ffffff", sub: "rgba(255,255,255,0.72)" },
  default: { background: CARD, color: INK, sub: BODY },
} as const;

function SpecCard({ label, sub, value, icon: Icon, face, hero }: Spec) {
  const skin = FACES[face ?? "default"];

  return (
    <div
      className="flex flex-1 flex-col rounded-[20px] p-5"
      style={{ background: skin.background, color: skin.color }}
    >
      <p className="text-[17px] font-semibold tracking-[-0.01em]">{label}</p>
      {sub && (
        <p className="mt-1.5 text-[14px] leading-[1.45]" style={{ color: skin.sub }}>
          {sub}
        </p>
      )}

      {hero ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
          <span className="scale-[2.6]">
            <Icon />
          </span>
          <span className="text-[30px] leading-none font-medium">{value}</span>
        </div>
      ) : (
        <div className="mt-10 flex flex-1 items-end justify-between gap-4">
          <Icon />
          <span className="text-[26px] leading-none font-medium whitespace-nowrap">{value}</span>
        </div>
      )}
    </div>
  );
}

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

export function HowItWorks() {
  return (
    /* One block: the heading and the grid share a container and a single
       set of padding, rather than two stacked bands meeting at a seam.

       The vertical rhythm is measured against the viewport's height, not
       only its width, because this section gets held on screen while the
       loop runs and anything past the fold is held out of sight. On a
       tall window the clamps sit at their old fixed values and nothing
       about the design changes; on a short laptop they give the height
       back rather than letting the grid run off the bottom. */
    <section className="bg-white px-4 py-[clamp(2.5rem,6vh,7rem)] lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px]"
            style={{ borderColor: RULE, color: INK }}
          >
            <PulseGlyph />
            How it works
          </p>

          <h2
            className="mx-auto mt-[clamp(1.25rem,3.5vh,2rem)] max-w-[14ch] text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
            style={{ color: INK }}
          >
            From signal to support, in 3 steps.
          </h2>

          <p
            className="mx-auto mt-[clamp(0.875rem,2.5vh,1.5rem)] max-w-[34ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5]"
            style={{ color: BODY }}
          >
            Wear it and forget it, see what changes early, and get help the moment it matters.
          </p>
        </div>

        {/* Three columns beside the film, where they share its row; two
            across everywhere narrower, down to the smallest screen —
            these cards carry a short label and one figure, so a column
            each is enough for them and a single stack wastes the width.

            That leaves the last column on its own on a row of two, so it
            takes both. Beside the film it is a column like the others. */}
        <DeviceDeck>
          <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-3">
            {COLUMNS.map((column, i) => (
              <div
                key={column[0].label}
                className={cn(
                  "flex flex-col gap-4",
                  i === COLUMNS.length - 1 && "col-span-2 lg:col-span-1",
                )}
              >
                {column.map((spec) => (
                  <SpecCard key={spec.label} {...spec} />
                ))}
              </div>
            ))}
          </div>
        </DeviceDeck>
      </div>
    </section>
  );
}
