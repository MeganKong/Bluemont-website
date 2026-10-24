// Owner: Megan (shared; built by Adhya). Small helpers for showing shared
// work: dates and lesson names.
import { lessons } from "@/app/(app)/lessons/_placeholder";

// "2026-10-23T18:20:00Z" → "Oct 23, 2026".
export function formatDate(dateTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateTime));
}

// "magic-ring" → "Magic ring". Unknown or empty → null.
export function lessonTitle(lessonId: string | null) {
  return lessons.find((lesson) => lesson.id === lessonId)?.title ?? null;
}

// The lessons volunteers can pick from when they share work.
export const lessonChoices = [...lessons]
  .sort((a, b) => a.order - b.order)
  .map((lesson) => ({ id: lesson.id, title: `Lesson ${lesson.order}: ${lesson.title}` }));
