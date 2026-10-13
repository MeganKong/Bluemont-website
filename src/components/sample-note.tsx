// Owner: Sophia (shared). A small label for pages that still show fake data.
// Delete it from a page once that page uses real data from Supabase.
export function SampleNote() {
  return (
    <p className="self-start rounded-full bg-sand px-3 py-1 text-sm text-muted">
      Sample page · fake data
    </p>
  );
}
