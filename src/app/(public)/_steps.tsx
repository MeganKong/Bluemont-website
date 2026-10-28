// Owner: Nika. The three steps (Learn, Make, Give), each with a photo.
// Used on the homepage and the Volunteer page.
import Image from "next/image";
import basket from "./_images/yarn-basket.jpg";
import child from "./_images/child-with-bunny.jpg";
import yarn from "./_images/pink-yarn-and-hook.jpg";

const steps = [
  {
    title: "Learn",
    text: "Short video lessons take you from your first loop to your first plushie, at your own pace. No experience needed.",
    photo: yarn,
    alt: "Pink yarn and a crochet hook with the first stitches",
  },
  {
    title: "Make",
    text: "Request a free kit with yarn, a hook and stuffing. Crochet at home or with your chapter.",
    photo: basket,
    alt: "A basket of soft yarn in blue, pink and cream",
  },
  {
    title: "Give",
    text: "Bring your plushie to your chapter. We check it, tag it and deliver it to a child in a shelter.",
    photo: child,
    alt: "A child by a window holding a soft pink bunny, face not shown",
  },
];

export function Steps() {
  return (
    <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-2.5">
          <Image
            src={step.photo}
            alt={step.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 45vw, 90vw"
            className="h-64 w-full rounded-3xl object-cover"
          />
          <span className="text-sm font-bold text-blue">Step {i + 1}</span>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="text-ink">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
