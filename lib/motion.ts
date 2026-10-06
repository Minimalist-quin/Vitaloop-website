/**
 * The one shared ease curve + duration scale for the `motion` package.
 * Keep this numerically identical to --ease-default in styles/tokens.css.
 */
export const EASE_DEFAULT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
} as const;

export const transition = {
  ease: EASE_DEFAULT,
  duration: DURATION.base,
};
