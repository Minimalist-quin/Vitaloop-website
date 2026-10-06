"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { ProductStageLazy } from "@/components/three/ProductStageLazy";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE_DEFAULT, DURATION } from "@/lib/motion";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  function apply(next: "light" | "dark") {
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <div className="flex gap-[var(--space-2)]">
      <Button
        size="sm"
        variant={theme === "light" ? "primary" : "secondary"}
        onClick={() => apply("light")}
      >
        Light
      </Button>
      <Button
        size="sm"
        variant={theme === "dark" ? "primary" : "secondary"}
        onClick={() => apply("dark")}
      >
        Dark
      </Button>
    </div>
  );
}

/**
 * Phase 1 checkpoint: every ui/ primitive, the motion foundation
 * (GSAP ScrollTrigger + SplitText reveal, Motion hover/tap, Lenis via
 * the layout-level provider) and the 3D product stage, in one page.
 * Not part of the public site.
 */
export default function StyleguidePage() {
  const reducedMotion = useReducedMotion();
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-[var(--space-24)] px-[var(--space-6)] py-[var(--space-16)]">
      <header className="flex flex-col gap-[var(--space-4)]">
        <p className="text-[var(--font-size-body-sm)] text-[var(--color-text-muted)]">
          Phase 1 checkpoint — not a public page
        </p>
        <h1 className="text-[var(--font-size-h1)] font-semibold tracking-[var(--tracking-tight)]">
          Styleguide
        </h1>
        <p className="max-w-xl text-[var(--color-text-muted)]">
          Reduced motion is currently <strong>{reducedMotion ? "ON" : "OFF"}</strong>. Toggle it in
          your OS/browser accessibility settings to verify the scroll reveal and 3D scene below fall
          back to a static layout.
        </p>
        <ThemeToggle />
      </header>

      <section aria-labelledby="buttons-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="buttons-heading" className="text-[var(--font-size-h2)] font-semibold">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-[var(--space-4)]">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section aria-labelledby="cards-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="cards-heading" className="text-[var(--font-size-h2)] font-semibold">
          Cards
        </h2>
        <div className="grid gap-[var(--space-6)] sm:grid-cols-3">
          <Card>
            <CardTitle>Detects</CardTitle>
            <CardDescription>
              Cardiac signals, sleep, SpO2 and skin temperature, continuously.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Emergency services and your contacts, within moments.</CardDescription>
          </Card>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: EASE_DEFAULT, duration: DURATION.fast }}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-[var(--space-6)] shadow-[var(--shadow-sm)]"
          >
            <CardTitle>Guides</CardTitle>
            <CardDescription>
              Bystanders through first aid and brings an AED to the scene. (Motion hover demo)
            </CardDescription>
          </motion.div>
        </div>
      </section>

      <section aria-labelledby="accordion-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="accordion-heading" className="text-[var(--font-size-h2)] font-semibold">
          Accordion
        </h2>
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>Does Vitaloop prevent cardiac arrest?</AccordionTrigger>
            <AccordionContent>
              No. Vitaloop detects irregular heart signals and alerts emergency services and your
              contacts — it does not prevent, treat or diagnose.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What does Robota do in an emergency?</AccordionTrigger>
            <AccordionContent>
              Robota guides bystanders through first aid and can bring an AED to the scene while
              alerting contacts and emergency services.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is health data collected on this site?</AccordionTrigger>
            <AccordionContent>
              No — the marketing site only ever collects contact and lead data.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section aria-labelledby="tabs-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="tabs-heading" className="text-[var(--font-size-h2)] font-semibold">
          Tabs
        </h2>
        <Tabs defaultValue="individuals" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>
          <TabsContent value="individuals">
            <p className="text-[var(--color-text-muted)]">
              How it works, its limits, and privacy — written for families.
            </p>
          </TabsContent>
          <TabsContent value="partners">
            <p className="text-[var(--color-text-muted)]">
              Outcome framing, data handling posture, and integration options.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      <section aria-labelledby="form-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="form-heading" className="text-[var(--font-size-h2)] font-semibold">
          Form fields
        </h2>
        <form
          className="flex max-w-md flex-col gap-[var(--space-4)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="flex flex-col gap-[var(--space-2)] text-[var(--font-size-body-sm)]">
            Work email
            <Input type="email" placeholder="you@company.com" />
          </label>

          <label className="flex flex-col gap-[var(--space-2)] text-[var(--font-size-body-sm)]">
            Partner type
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="insurer">Insurer</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="senior-living">Senior living operator</SelectItem>
                <SelectItem value="health-system">Health system</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <label className="flex items-center gap-[var(--space-2)] text-[var(--font-size-body-sm)]">
            <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />I
            consent to being contacted about a demo.
          </label>

          <Button type="submit">Submit</Button>
        </form>
      </section>

      <section aria-labelledby="motion-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="motion-heading" className="text-[var(--font-size-h2)] font-semibold">
          Scroll motion
        </h2>
        <div className="flex h-[60vh] items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)]">
          <p className="text-[var(--color-text-muted)]">Scroll to reveal the headline below ↓</p>
        </div>
        <RevealHeading
          as="h3"
          className="text-[var(--font-size-display)] font-semibold tracking-[var(--tracking-tight)]"
        >
          Detects. Alerts. Guides.
        </RevealHeading>
      </section>

      <section aria-labelledby="stage-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="stage-heading" className="text-[var(--font-size-h2)] font-semibold">
          Product stage (3D)
        </h2>
        <p className="max-w-xl text-[var(--color-text-muted)]">
          [PLACEHOLDER] capsule standing in for the wearable until a real GLB model exists.
        </p>
        <ProductStageLazy className="max-w-md" />
      </section>
    </div>
  );
}
