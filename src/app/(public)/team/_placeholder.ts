// Owner: Nika. Fake team list until we know who to show. Many of us are
// under 18: use first names and roles only, and no photos unless each
// person (and a parent, if under 18) says yes.
export type TeamMember = { id: string; name: string; role: string };

export const team: TeamMember[] = [
  { id: "t1", name: "Megan", role: "Founder" },
  { id: "t2", name: "[First name]", role: "[Role, e.g. website builder]" },
  { id: "t3", name: "[First name]", role: "[Role, e.g. chapter officer]" },
  { id: "t4", name: "[First name]", role: "[Role, e.g. kits coordinator]" },
  { id: "t5", name: "[First name]", role: "[Role]" },
  { id: "t6", name: "[First name]", role: "[Role]" },
];
