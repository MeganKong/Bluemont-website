// Owner: Nika. Fake lessons to build with until the database is ready.
// The "_" at the start of the file name keeps it from becoming a web page.
import type { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "slip-knot-and-chain",
    order: 1,
    title: "Slip knot and chain stitch",
    summary: "Hold the hook, tie a slip knot, and make your first chain of 20.",
    videoUrl: "",
    steps: [
      "Make a slip knot and put it on the hook",
      "Wrap the yarn over the hook and pull it through",
      "Repeat until you have 20 even chains",
    ],
  },
  {
    id: "single-crochet",
    order: 2,
    title: "Single crochet",
    summary: "Work rows of single crochet into your chain to make a swatch.",
    videoUrl: "",
    steps: [
      "Insert the hook into the second chain from the hook",
      "Yarn over, pull up a loop, yarn over, pull through both loops",
      "Work 4 rows and photograph your swatch",
    ],
  },
  {
    id: "magic-ring",
    order: 3,
    title: "Magic ring",
    summary: "Start a round piece, the base of every plushie head and body.",
    videoUrl: "",
    steps: [
      "Wrap the yarn around two fingers",
      "Work 6 single crochet into the ring",
      "Pull the tail to close the ring tight",
    ],
  },
];
