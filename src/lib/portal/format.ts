// Owner: Megan (shared; built by Adhya). Small helpers for showing hours and
// dates on the signed-in pages. Dates like "2026-11-15" are read as UTC,
// which stops them showing a day early for people west of London.

// 6.5 → "6.5", 6 → "6".
export function formatHours(hours: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(hours);
}

// 1 → "1 hour", 6.5 → "6.5 hours".
export function hoursLabel(hours: number) {
  return `${formatHours(hours)} ${hours === 1 ? "hour" : "hours"}`;
}

function part(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

// "2026-11-15" → "Nov 15, 2026".
export function formatDay(date: string) {
  return part(date, { month: "short", day: "numeric", year: "numeric" });
}

// "2026-11-15" → "Sunday, Nov 15".
export function formatEventDay(date: string) {
  return part(date, { weekday: "long", month: "short", day: "numeric" });
}

// "2026-11-15" → "Nov" and "15", for the little date boxes.
export function monthOf(date: string) {
  return part(date, { month: "short" });
}
export function dayOf(date: string) {
  return part(date, { day: "numeric" });
}
