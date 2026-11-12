// Owner: Megan (shared). A small calendar square ("NOV / 15") for events.
import { dayOf, monthOf } from "@/lib/portal/format";

export function DateBox({ date }: { date: string }) {
  return (
    <time
      dateTime={date}
      className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-tint py-1.5 leading-none text-blue"
    >
      <span className="text-[11px] font-bold tracking-wider uppercase">{monthOf(date)}</span>
      <span className="font-serif text-2xl">{dayOf(date)}</span>
    </time>
  );
}
