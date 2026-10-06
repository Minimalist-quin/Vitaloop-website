/**
 * Hand-drawn "vitaloop" wordmark, styled after Nuro's logotype: geometric
 * lowercase, uniform stroke, fully rounded terminals. The two o's are
 * fused into an infinity symbol.
 *
 * Construction: every glyph is a stroked skeleton on a shared grid —
 * x-height spans y 0→100 with stroke 26, so centrelines sit at y 13 and
 * 87 and the round caps land the outer edges exactly on the x-height.
 * Bowl radii are 37 for the same reason (37 + 13 = 50).
 *
 * Letters sit on a 4-unit gap, except "a", which is kerned 18 units
 * closer: the "t" only reaches full width at its crossbar, so measuring
 * from the crossbar left a visible hole at mid-height, where the "t" is
 * just a stem. The overlap is safe — at crossbar height the a's bowl has
 * narrowed enough to clear it.
 */
export function VitaloopWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-4 -71 600 240"
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
        {/* a — bowl + stem, kerned into the t */}
        <circle cx={238} cy={50} r={37} />
        <path d="M275 13 L275 87" />
        {/* l */}
        <path d="M305 -54 L305 87" />
        {/* oo — fused into an infinity symbol */}
        <path d="M335 50 C335 1 380 1 405 50 C430 99 475 99 475 50 C475 1 430 1 405 50 C380 99 335 99 335 50 Z" />
        {/* p — bowl + descender */}
        <circle cx={542} cy={50} r={37} />
        <path d="M505 13 L505 152" />
      </g>
      {/* i — dot */}
      <circle cx={113} cy={-22} r={13} fill="currentColor" />
    </svg>
  );
}
