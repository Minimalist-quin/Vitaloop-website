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

/*
  The supplied palette. Four warm, low-chroma tones, each given one job
  below. Names say what a colour is for, never what hue it is, so a
  repaint is an edit here and nowhere else.
*/
const COPPER = "#c08143";
const CLAY = "#aa7658";
const OLIVE = "#88854f";
const SLATE = "#688485";

/** Sleep stages. All four tones, so no two bands share a colour. */
export const STAGE = {
  awake: COPPER,
  rem: CLAY,
  core: SLATE,
  deep: OLIVE,
} as const;

/** Marks the sleep card — its badge and its headline figure's label. */
export const SLEEP_MARK = SLATE;

/** Carries measured series: the breathing bars and the variability chart. */
export const DATA = CLAY;

/*
  The one accent: the spec card, the stage signal, the gauge. These tones
  are light enough that anything sitting on a field of one takes ink, not
  white.
*/
export const ACCENT = COPPER;
