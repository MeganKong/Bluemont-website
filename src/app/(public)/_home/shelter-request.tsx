// Owner: Nika. For shelter staff who'd like Bluemont to donate plushies.
// The request form isn't built yet. So far we know it will ask for contact
// information and what the organization does; more questions may come.
import { buttonSoon, card, eyebrow } from "./styles";

export function ShelterRequest() {
  return (
    <section id="shelters" className={`${card} gap-4`}>
      <p className={eyebrow}>For shelter staff</p>
      <h2 className="font-display text-3xl font-semibold text-balance">
        Would your shelter like plushies?
      </h2>
      <p className="max-w-2xl text-ink">
        If you work at a shelter or an organization that serves children, ask us to donate
        handmade plushies. We&apos;ll ask for your contact information and what your
        organization does.
      </p>
      <span className={buttonSoon}>Request form coming soon</span>
    </section>
  );
}
