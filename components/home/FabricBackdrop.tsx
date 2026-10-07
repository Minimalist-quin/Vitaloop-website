/**
 * A dune backdrop, drawn rather than photographed: pale haze above, sand
 * below, blurred so it reads as depth-of-field rather than as shapes.
 *
 * Original work in the project's own palette — it replaces a crop of a
 * supplied reference, which was another company's photograph.
 *
 * What makes it read as a dune rather than a brown gradient is the
 * crest: one long sinuous ridge with the lit windward face above it and
 * the slip face falling away in shadow below. So the ridge keeps a light
 * blur while the shading either side of it takes a heavy one. A second
 * dune sits behind, paler and hazier, for depth. Every shape is drawn
 * well outside the viewBox so no blur reaches an edge and reveals one.
 */

const HAZE = "#eae8e1";
const SAND_LIT = "#e0b183";
const SAND = "#c0824a";
const SAND_SHADE = "#9a5c31";
const SAND_DEEP = "#7d4a28";

export function FabricBackdrop({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="dune-near" x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={SAND} />
          <stop offset="0.55" stopColor={SAND_SHADE} />
          <stop offset="1" stopColor={SAND_DEEP} />
        </linearGradient>
        <linearGradient id="dune-far" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#e6c4a2" />
          <stop offset="1" stopColor="#cf9a66" />
        </linearGradient>

        <filter id="dune-ridge" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="dune-haze" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect x="-60" y="-60" width="720" height="540" fill={HAZE} />

      {/* The far dune: higher, paler, almost lost in the haze. */}
      <g filter="url(#dune-haze)">
        <path
          d="M-80 300 C 80 250 200 206 340 226 C 460 243 580 268 700 252 L700 500 L-80 500 Z"
          fill="url(#dune-far)"
          opacity="0.85"
        />
      </g>

      {/* The near dune. Its top edge is the crest — a long rise to a
          shoulder left of centre, then a slow fall to the right. */}
      <g filter="url(#dune-ridge)">
        <path
          d="M-80 396
             C 40 372 130 330 232 292
             C 292 270 338 272 392 296
             C 470 330 580 346 700 338
             L700 500 L-80 500 Z"
          fill="url(#dune-near)"
        />
      </g>

      {/* Windward face catching the light just under the crest, and the
          slip face falling away from it into shadow. Heavy blur: these
          are tone, never edges. */}
      <g filter="url(#dune-haze)">
        <path
          d="M-80 400 C 40 376 130 334 232 296 C 292 274 338 276 392 300
             L392 334 C 330 310 294 308 240 328 C 140 366 40 408 -80 430 Z"
          fill={SAND_LIT}
          opacity="0.75"
        />
        <path
          d="M392 300 C 470 334 580 350 700 342 L700 452 C 560 432 450 396 380 344 Z"
          fill={SAND_DEEP}
          opacity="0.5"
        />
        <path
          d="M-80 452 C 140 420 320 468 480 444 S 640 428 700 440 L700 500 L-80 500 Z"
          fill={SAND_DEEP}
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
