// Owner: Megan (shared). Yellow highlight for a fact or quote Megan still
// needs to confirm, e.g. <Tbd>[year]</Tbd>. Before launch, search the code
// for "<Tbd>" and replace each one with the real words; the site shouldn't
// go live with any left.
export function Tbd({ children }: { children: React.ReactNode }) {
  return <mark className="rounded bg-tbd px-1 text-navy">{children}</mark>;
}
