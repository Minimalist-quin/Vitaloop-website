/**
 * The backdrop behind the device card: pale haze above, rust-coloured
 * dunes below, the whole thing far enough out of focus that no edge in
 * it is ever sharp.
 *
 * Original work in the project's own palette — it replaces a crop of a
 * supplied reference, which was another company's photograph.
 *
 * Three passes got this right, and the two that failed are worth
 * recording. One blur over everything flattens it into a brown gradient.
 * An angular ridge reads as pointed mountains, not dunes. What works is
 * what a dune actually is: soft irregular crests of differing height and
 * width, layered front to back, each one lighter along the windward side
 * and falling into shadow on the lee. The crests carry a moderate blur
 * so they stay legible as form; everything inside takes a heavy one, so
 * it stays tone. Every shape is drawn well outside the viewBox so no
 * blur reaches an edge and reveals one.
 */

const HAZE = "#eae8e1";
const RUST_LIT = "#dda67e";
const RUST = "#c57a4e";
const RUST_SHADE = "#a85a36";
const RUST_DEEP = "#8d4828";

export function FabricBackdrop({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="dune-crest" x1="0.1" y1="0" x2="0.45" y2="1">
          <stop offset="0" stopColor={RUST_LIT} />
          <stop offset="0.4" stopColor={RUST} />
          <stop offset="1" stopColor={RUST_SHADE} />
        </linearGradient>
        <linearGradient id="dune-front" x1="0.2" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor={RUST_SHADE} />
          <stop offset="1" stopColor={RUST_DEEP} />
        </linearGradient>
        <linearGradient id="dune-back" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ecd0b4" />
          <stop offset="1" stopColor="#d59a70" />
        </linearGradient>

        <filter id="dune-form" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="dune-tone" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      <rect x="-60" y="-60" width="720" height="540" fill={HAZE} />

      {/* Warmth bleeding up out of the sand into the haze above it. */}
      <g filter="url(#dune-tone)">
        <path
          d="M-80 250 C 120 206 300 232 460 208 S 660 216 700 226 L700 340 L-80 340 Z"
          fill={RUST_LIT}
          opacity="0.3"
        />
      </g>

      {/* The farthest dune, barely separated from the haze. */}
      <g filter="url(#dune-tone)">
        <path
          d="M-80 318 C 60 282 170 254 280 262 C 400 270 520 240 700 258 L700 500 L-80 500 Z"
          fill="url(#dune-back)"
          opacity="0.9"
        />
      </g>

      {/* The main crest: irregular mounds, each a different width and
          height, rolling rather than peaking. */}
      <g filter="url(#dune-form)">
        <path
          d="M-80 392
             C 20 382 64 346 132 326
             C 196 308 226 266 292 258
             C 352 252 382 288 432 302
             C 474 314 504 296 562 284
             C 622 272 664 290 700 286
             L700 520 L-80 520 Z"
          fill="url(#dune-crest)"
        />
      </g>

      {/* The near dune, crossing lower and darker — the layering is what
          gives the field depth. */}
      <g filter="url(#dune-form)">
        <path
          d="M-80 470
             C 60 440 164 398 266 386
             C 348 376 424 398 520 410
             C 598 420 664 414 700 404
             L700 520 L-80 520 Z"
          fill="url(#dune-front)"
        />
      </g>

      {/* Light along the windward flanks, shadow down the lee of each
          crest. Heavy blur: tone only, never an edge. */}
      <g filter="url(#dune-tone)">
        <path
          d="M40 356 C 120 330 210 286 292 268 C 330 262 352 272 372 286
             C 300 284 230 310 150 346 C 110 364 70 376 30 384 Z"
          fill={RUST_LIT}
          opacity="0.7"
        />
        <path
          d="M452 300 C 500 296 530 286 580 280 C 630 274 668 286 700 288
             L700 312 C 650 300 600 300 540 310 C 500 316 470 312 450 308 Z"
          fill={RUST_LIT}
          opacity="0.45"
        />
        <path
          d="M292 260 C 352 254 382 290 432 304 C 470 316 492 310 520 304
             L520 372 C 450 356 380 324 316 292 Z"
          fill={RUST_DEEP}
          opacity="0.4"
        />
        <path
          d="M-80 478 C 80 452 200 424 300 420 C 420 416 540 440 700 430
             L700 520 L-80 520 Z"
          fill={RUST_DEEP}
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
