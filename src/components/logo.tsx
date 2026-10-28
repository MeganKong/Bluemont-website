// Owner: Megan (shared). The Bluemont name with its small yarn mark: a
// circle with a strand of honey yarn through it. Used in the header and
// footer. This is a stand-in until we have a real logo.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 font-serif leading-none ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" />
        <path
          d="M8 26 C 14 18, 20 30, 26 20 S 32 14, 34 18"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M11 15 C 16 11, 24 11, 29 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      Bluemont
    </span>
  );
}
