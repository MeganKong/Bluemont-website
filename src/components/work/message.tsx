// Owner: Megan (shared; built by Adhya). A message box with an icon in a
// round badge, so the meaning never depends on color alone.
export function Message({ kind, children }: { kind: "error" | "success" | "info"; children: React.ReactNode }) {
  const look = {
    error: { icon: "!", background: "bg-pink-pale", role: "alert" },
    success: { icon: "✓", background: "bg-mint-pale", role: "status" },
    info: { icon: "i", background: "bg-sand", role: "note" },
  }[kind];

  return (
    <div role={look.role} className={`flex items-start gap-3 rounded-2xl border-2 border-navy p-3 ${look.background}`}>
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-navy bg-card font-black"
      >
        {look.icon}
      </span>
      <div className="pt-0.5 font-semibold">{children}</div>
    </div>
  );
}
