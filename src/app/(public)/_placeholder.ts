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

// Photo gallery spots. Each one will become a photo of plushies (no faces).
export const galleryPhotos = [
  { id: "g1", label: "Plushie photo" },
  { id: "g2", label: "Plushie photo" },
  { id: "g3", label: "Chapter meeting photo (no faces)" },
  { id: "g4", label: "Plushie photo" },
  { id: "g5", label: "Kit photo" },
  { id: "g6", label: "Plushie photo" },
];

// Donation amounts people can pick. The real amounts and kit price come later.
export const donationAmounts = ["$10", "$25", "$50", "$100"];

// Community mock-up posts. Made-up, and shown as a preview only.
export type CommunityPost = { id: string; author: string; text: string; hearts: number };

export const communityPosts: CommunityPost[] = [
  { id: "c1", author: "A volunteer from Chapter 1", text: "Finished my first bunny! The ears took three tries.", hearts: 12 },
  { id: "c2", author: "A volunteer from Chapter 2", text: "Tip: count your stitches out loud. It really helps.", hearts: 8 },
  { id: "c3", author: "A Bluemont officer", text: "Thank you all! 20 plushies are on their way to a shelter this week.", hearts: 31 },
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

// Questions for the FAQ. Answers come later.
export const faqs = [
  { question: "Do I need to know how to crochet?", answer: "[To write.]" },
  { question: "Does it cost anything to volunteer?", answer: "[To write.]" },
  { question: "Where do the plushies go?", answer: "[To write.]" },
  { question: "Can I get volunteer hours?", answer: "[To write.]" },
];
