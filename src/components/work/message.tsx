// Owner: Megan (shared; built by Adhya). A message box with an icon in a
// small circle, so the meaning never depends on color alone.
export function Message({ kind, children }: { kind: "error" | "success" | "info"; children: React.ReactNode }) {
  const look = {
    error: { icon: "!", box: "border-pink bg-pink-pale", role: "alert" },
    success: { icon: "✓", box: "border-mint bg-mint-pale", role: "status" },
    info: { icon: "i", box: "border-line bg-tint", role: "note" },
  }[kind];

  return (
    <div role={look.role} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${look.box}`}>
      <span
        aria-hidden="true"
        className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-card text-sm font-bold"
      >
        {look.icon}
      </span>
      <div className="text-[15px] font-semibold">{children}</div>
    </div>
  );
}
