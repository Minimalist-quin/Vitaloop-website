import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * [PLACEHOLDER] — the real homepage (Hero, Wearable, Robota, Features,
 * How it works, For partners, FAQ) is built in Phase 2 per docs/PRD.md.
 */
export default function Home() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-[var(--space-6)] px-[var(--space-6)] py-[var(--space-32)]">
      <h1 className="text-[var(--font-size-display)] leading-[var(--line-height-tight)] tracking-[var(--tracking-tight)] font-semibold">
        [PLACEHOLDER] Detects. Alerts. Guides.
      </h1>
      <p className="text-[var(--font-size-body-lg)] text-[var(--color-text-muted)]">
        The full homepage ships in Phase 2. For now, see the Phase 1 foundation checkpoint.
      </p>
      <Button asChild>
        <Link href="/styleguide">View styleguide</Link>
      </Button>
    </section>
  );
}
