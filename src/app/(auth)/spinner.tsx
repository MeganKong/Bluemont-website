// Owner: Megan (built by Adhya). A small spinning circle for busy buttons,
// next to words like "Signing in…" (screen readers read the words).
export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-5 shrink-0 animate-spin rounded-full border-3 border-navy border-t-transparent motion-reduce:animate-none"
    />
  );
}
