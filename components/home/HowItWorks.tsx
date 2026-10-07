import { ORANGE } from "./panel-theme";

/**
 * "How it works" — a centred heading over a card grid: the device on the
 * left, its specifications beside it.
 *
 * ⚠️ The left card is a deliberate placeholder: the reference puts a
 * device mock there and there is no asset for it yet.
 *
 * Every figure below is the one supplied for the device. None are
 * invented, and none may be — see the project's rule on statistics.
 */

type Spec = {
  label: string;
  value: string;
  icon: () => React.ReactElement;
  accent?: boolean;
};

const INK = "#1a1a1a";
const BODY = "#6f6b64";
const MUTED = "#8a8780";
const CARD = "#f4f3f0";
const RULE = "#e3e0da";

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

/* The device's figures, exactly as supplied. */
const SPECS: Spec[] = [
  { label: "Health monitoring", value: "24/7", icon: MonitorIcon, accent: true },
  { label: "Battery life", value: "7+ days", icon: BatteryIcon },
  { label: "Water resistance", value: "5 ATM", icon: DropletIcon },
  { label: "Lightweight design", value: "<30 g", icon: FeatherIcon },
  { label: "Connected", value: "Bluetooth", icon: BluetoothIcon },
];

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
       set of padding, rather than two stacked bands meeting at a seam. */
    <section className="bg-white px-4 py-20 lg:px-10 lg:py-28">
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

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
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

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {SPECS.map(({ label, value, icon: Icon, accent }, i) => (
              <div
                key={label}
                className={`flex flex-col justify-between rounded-[20px] p-5 ${
                  i === SPECS.length - 1 ? "sm:col-span-2" : ""
                }`}
                style={{
                  background: accent ? ORANGE : CARD,
                  color: accent ? "#ffffff" : INK,
                }}
              >
                <p className="text-[17px] font-semibold tracking-[-0.01em]">{label}</p>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <Icon />
                  <span className="text-[26px] leading-none font-medium whitespace-nowrap">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
