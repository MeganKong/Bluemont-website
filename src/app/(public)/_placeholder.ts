// Owner: Nika. Fake text for the homepage until the real words, photos and
// database are ready. Replace each "[To write: ...]" when you get the real
// text. Never put real volunteer names, emails or photos of children here.

// Founder story. Megan is writing the real one.
export const founder = {
  name: "Megan",
  role: "Founder",
  story: [
    "[To write by Megan: why she started Bluemont and the moment that made her want to help children in shelters.]",
    "[To write by Megan: how Bluemont grew from one person crocheting to school chapters.]",
  ],
};

// Partner stories. Some will come from partners, some from team members.
export type PartnerStory = { quote: string; name: string; role: string };

export const partnerStories: PartnerStory[] = [
  {
    quote: "[To write: a story from a partner shelter about receiving plushies.]",
    name: "[Partner name]",
    role: "[Shelter or organization]",
  },
  {
    quote: "[To write: a story from a school or club that partners with Bluemont.]",
    name: "[Partner name]",
    role: "[School or club]",
  },
  {
    quote: "[To write: a story from a team member about making and giving plushies.]",
    name: "[First name only]",
    role: "[Role, e.g. chapter officer]",
  },
];

// What parents need to know.
export const parentInfo = [
  {
    title: "What we do",
    text: "Students learn to crochet online, then make plushies that we give to children in shelters.",
  },
  { title: "Who runs Bluemont", text: "[To write: who runs Bluemont and which adults are involved.]" },
  {
    title: "How it works",
    text: "Volunteers take free online lessons, get a crochet kit, and drop off finished plushies at their chapter.",
  },
  { title: "Time commitment", text: "[To write: how much time volunteers usually spend each week.]" },
];
