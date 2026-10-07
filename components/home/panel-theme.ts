/**
 * Shared surface, ink and data colours for the two "Why Vitaloop"
 * panels, so the stacked pair stays one material.
 *
 * The look follows a supplied card reference: a near-white surface on
 * the section's cream, generous nested radii, depth from one soft
 * shadow rather than borders, and type that runs muted with the words
 * that matter set in ink. Light mode only — the panels carry no dark
 * surface.
 */
export const PANEL = {
  surface: "#fbfaf8",
  tile: "#f1efeb",
  ink: "#17161a",
  body: "#6f6d67",
  muted: "#a9a6a0",
  rule: "#dcd8d2",
  radius: 36,
  tileRadius: 26,
  shadow: "0 22px 48px -20px rgba(28,24,16,0.28)",
} as const;

/** Sleep stages, stepped down for a light ground. */
export const STAGE = {
  awake: "#e0552d",
  rem: "#58b6dd",
  core: "#1a7fd4",
  deep: "#3b3bb0",
} as const;

export const TEAL = "#0e8f80";
export const BLUE = "#1a7fd4";
export const ORANGE = "#c24a06";
