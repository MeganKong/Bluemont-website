// Owner: Nika. Fake donation numbers until Megan sends the real ones.
// Update the total here each time plushies are delivered; the counter on the
// page counts up to it. Later this can come from the database instead.
//
// Only list shelters that said it's OK to be named, and never add their
// address: many shelters keep their location private to keep kids safe.

// Total plushies donated so far.
export const plushiesDonated = 150;

export type Donation = { id: string; place: string; kind: string; plushies: number };

export const donations: Donation[] = [
  { id: "1", place: "[Shelter name]", kind: "Family shelter", plushies: 60 },
  { id: "2", place: "[Shelter name]", kind: "Children's hospital", plushies: 50 },
  { id: "3", place: "[Organization name]", kind: "Foster care program", plushies: 40 },
];

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
