// Owner: Nika (assigned by Megan). The public home page at "/".
//
// What this page will do (month 1 build plan):
// - Say what Bluemont is and send visitors to sign up.
// Done when: Home, About and Sign in look finished, and no <Tbd> is left.
//
// Each section lives in its own file in _home/, so you can change one
// without scrolling through the others. To move a section, move its line
// below. Yellow <Tbd> text is waiting for Megan's facts.
import { FounderStory } from "./_home/founder-story";
import { Hero } from "./_home/hero";
import { Impact } from "./_home/impact";
import { Mission } from "./_home/mission";
import { Parents } from "./_home/parents";
import { WaysToHelp } from "./_home/ways-to-help";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Impact />
      <FounderStory />
      <WaysToHelp />
      <Parents />
    </>
  );
}
