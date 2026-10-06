/**
 * Hand-drawn "vitaloop" wordmark, styled after Nuro's logotype: geometric
 * lowercase, uniform stroke, fully rounded terminals. The two o's are
 * fused into an infinity symbol.
 *
 * Construction: every glyph is a stroked skeleton on a shared grid —
 * x-height spans y 0→100 with stroke 26, so centrelines sit at y 13 and
 * 87 and the round caps land the outer edges exactly on the x-height.
 * Bowl radii are 37 for the same reason (37 + 13 = 50). Letters are set
 * on a 4-unit gap, so they very nearly touch.
 */
export function VitaloopWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-4 -71 618 240"
      className={className}
      role="img"
      aria-label="vitaloop"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
        {/* v */}
        <path d="M13 13 L48 87 L83 13" />
        {/* i — stem */}
        <path d="M113 13 L113 87" />
        {/* t */}
        <path d="M160 -42 L160 87" />
        <path d="M143 4 L189 4" />
        {/* a — bowl + stem */}
        <circle cx={256} cy={50} r={37} />
        <path d="M293 13 L293 87" />
        {/* l */}
        <path d="M323 -54 L323 87" />
        {/* oo — fused into an infinity symbol */}
        <path d="M353 50 C353 1 398 1 423 50 C448 99 493 99 493 50 C493 1 448 1 423 50 C398 99 353 99 353 50 Z" />
        {/* p — bowl + descender */}
        <circle cx={560} cy={50} r={37} />
        <path d="M523 13 L523 152" />
      </g>
      {/* i — dot */}
      <circle cx={113} cy={-22} r={13} fill="currentColor" />
    </svg>
  );
}
