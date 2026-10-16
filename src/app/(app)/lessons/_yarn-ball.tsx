// Owner: Nika. A small navy ball of yarn with a loose tail, used as decoration.
// aria-hidden tells screen readers to skip it, since it's only a picture.
export function YarnBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="42" className="fill-navy" />
      {/* Strands wrapped around the ball */}
      <g fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-gold">
        <path d="M18 30 Q50 60 78 18" />
        <path d="M12 46 Q48 78 88 32" />
        <path d="M14 64 Q50 90 90 52" />
        <path d="M30 14 Q22 50 46 90" />
        <path d="M50 9 Q38 50 64 91" />
      </g>
      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="4" className="stroke-navy" />
      {/* The loose tail */}
      <path
        d="M88 66 Q100 80 112 70 Q118 64 114 58"
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="stroke-navy"
      />
    </svg>
  );
}
