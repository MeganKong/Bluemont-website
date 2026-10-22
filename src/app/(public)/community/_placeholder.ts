// Owner: Nika. Fake gallery spots and posts for the Community page. Never
// put real volunteer names or photos of children here.

// Photo gallery spots. Each one will become a photo of plushies (no faces).
export const galleryPhotos = [
  { id: "g1", label: "Plushie photo" },
  { id: "g2", label: "Plushie photo" },
  { id: "g3", label: "Chapter meeting photo (no faces)" },
  { id: "g4", label: "Plushie photo" },
  { id: "g5", label: "Kit photo" },
  { id: "g6", label: "Plushie photo" },
];

// Mock-up posts. Made up, and shown as a preview only.
export type CommunityPost = { id: string; author: string; text: string; hearts: number };

export const communityPosts: CommunityPost[] = [
  { id: "c1", author: "A volunteer from Chapter 1", text: "Finished my first bunny! The ears took three tries.", hearts: 12 },
  { id: "c2", author: "A volunteer from Chapter 2", text: "Tip: count your stitches out loud. It really helps.", hearts: 8 },
  { id: "c3", author: "A Bluemont officer", text: "Thank you all! 20 plushies are on their way to a shelter this week.", hearts: 31 },
];
