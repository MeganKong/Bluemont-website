// Owner: Nika. The three steps (Learn, Make, Give), each with a photo.
// Used on the homepage and the Volunteer page.
import Image from "next/image";
import alpacas from "./_images/velvet-alpacas.jpg";
import orangeKnit from "./_images/orange-chenille-knit.jpg";
import chenilleSkeins from "./_images/chenille-yarn-skeins.jpg";

// The photos are free to use; we still credit each photographer. A photo
// under a Creative Commons licence (CC BY) must also link to that licence.
const steps = [
  {
    title: "Learn",
    text: "Short video lessons take you from your first loop to your first plushie, at your own pace. No experience needed.",
    photo: chenilleSkeins,
    alt: "Skeins of soft velvet chenille yarn in dark plum and dusty lilac",
    credit: "LollyKnit / Flickr",
    license: { name: "CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/" },
  },
  {
    title: "Make",
    text: "Request a free kit with yarn, a hook and stuffing. Crochet at home or with your chapter.",
    photo: orangeKnit,
    alt: "Close-up of chunky loops of soft orange velvet yarn",
    credit: "Larysa_Shche / Pixabay",
  },
  {
    title: "Give",
    text: "Bring your plushie to your chapter. We check it, tag it and deliver it to a child in a shelter.",
    photo: alpacas,
    alt: "A row of crocheted alpaca plushies with colorful scarves",
    credit: "Magda Ehlers / Pexels",
  },
];

export function Steps() {
  return (
    <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-2.5">
          <figure className="flex flex-col gap-1">
            <Image
              src={step.photo}
              alt={step.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 370px, (min-width: 640px) 45vw, 90vw"
              className="h-64 w-full rounded-3xl object-cover"
            />
            <figcaption className="text-xs text-ink">
              Photo: {step.credit}
              {step.license && (
                <>
                  {", "}
                  <a href={step.license.url} className="underline">
                    {step.license.name}
                  </a>
                </>
              )}
            </figcaption>
          </figure>
          <span className="text-sm font-bold text-blue">Step {i + 1}</span>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="text-ink">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
