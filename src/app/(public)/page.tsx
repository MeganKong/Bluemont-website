// Owner: Nika (assigned by Megan). The public home page at "/".
//
// What this page will do (month 1 build plan):
// - Say what Bluemont is and send visitors to sign up.
// Done when: Home, About and Sign in look finished.
//
// Each section lives in its own file in _home/, so you can change one
// without scrolling through the others. To move a section, move its line
// below. The team gets its own page later, not a homepage section.
import { SampleNote } from "@/components/sample-note";
import { Community } from "./_home/community";
import { FounderStory } from "./_home/founder-story";
import { FreeLessons } from "./_home/free-lessons";
import { Gallery } from "./_home/gallery";
import { GetInvolved } from "./_home/get-involved";
import { Hero } from "./_home/hero";
import { HowItWorks } from "./_home/how-it-works";
import { Impact } from "./_home/impact";
import { Parents } from "./_home/parents";
import { PartnerStories } from "./_home/partner-stories";
import { ShelterRequest } from "./_home/shelter-request";
import { SponsorKit } from "./_home/sponsor-kit";
import { Trust } from "./_home/trust";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Remove once the placeholder text and photos are replaced. */}
      <SampleNote />
      <Hero />
      <FounderStory />
      <GetInvolved />
      <Impact />
      <HowItWorks />
      <FreeLessons />
      <SponsorKit />
      <PartnerStories />
      <Gallery />
      <Community />
      <ShelterRequest />
      <Parents />
      <Trust />
    </div>
  );
}
