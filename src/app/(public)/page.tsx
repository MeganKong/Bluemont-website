// Owner: Nika (assigned by Megan). The public home page at "/".
//
// What this page will do (month 1 build plan):
// - Say what Bluemont is and send visitors to sign up.
// Done when: Home, About and Sign in look finished.
//
// Each section lives in its own file in _home/, so you can change one
// without scrolling through the others. To move a section, move its line
// below.
//
// Our team, Give (sponsor a kit), For shelters (plushie requests) and Our
// donations (with the partner stories) are in the menu. Volunteer,
// Community and FAQ have their own pages too; Explore links to them.
import { SampleNote } from "@/components/sample-note";
import { Explore } from "./_home/explore";
import { FounderStory } from "./_home/founder-story";
import { GetInvolved } from "./_home/get-involved";
import { Hero } from "./_home/hero";
import { HowItWorks } from "./_home/how-it-works";
import { Impact } from "./_home/impact";
import { Parents } from "./_home/parents";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Remove once the placeholder text and photos are replaced. */}
      <SampleNote />
      <Hero />
      <HowItWorks />
      <FounderStory />
      <GetInvolved />
      <Impact />
      <Parents />
      <Explore />
    </div>
  );
}
