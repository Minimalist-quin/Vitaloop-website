/**
 * Hand-drawn "vitaloop" wordmark, styled after Nuro's logotype: heavy
 * geometric lowercase, uniform stroke, fully rounded terminals. The two
 * o's are fused into an infinity symbol.
 *
 * Construction: every glyph is a stroked skeleton on a shared grid —
 * x-height spans y 0→100, stroke 34, so centrelines sit at y 17 and 83
 * and round caps land the outer edges exactly on the x-height. Change
 * strokeWidth alone and the whole mark stays consistent.
 */
export function VitaloopWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-4 -71 684 240"
      className={className}
      role="img"
      aria-label="vitaloop"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth={34} strokeLinecap="round" strokeLinejoin="round">
        {/* v */}
        <path d="M17 17 L50 83 L83 17" />
        {/* i — stem */}
        <path d="M129 17 L129 83" />
        {/* t */}
        <path d="M193 -38 L193 83" />
        <path d="M175 8 L219 8" />
        {/* a — bowl + stem */}
        <circle cx={298} cy={50} r={33} />
        <path d="M331 17 L331 83" />
        {/* l */}
        <path d="M377 -50 L377 83" />
        {/* oo — fused into an infinity symbol */}
        <path d="M423 50 C423 6 463 6 485 50 C507 94 547 94 547 50 C547 6 507 6 485 50 C463 94 423 94 423 50 Z" />
        {/* p — bowl + descender */}
        <circle cx={626} cy={50} r={33} />
        <path d="M593 17 L593 148" />
      </g>
      {/* i — dot */}
      <circle cx={129} cy={-25} r={17} fill="currentColor" />
    </svg>
  );
}
