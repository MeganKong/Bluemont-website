// Owner: Nika. A photo with its credit line underneath, used on the public
// pages. All photos so far are free stock photos from Pexels
// (pexels.com/license); the credit links back to the photo's page.
// Never use photos that show children's faces, names or which shelter
// they're at.
import Image, { type StaticImageData } from "next/image";

type PhotoProps = {
  src: StaticImageData;
  // Describes the photo for people using screen readers.
  alt: string;
  // The photographer's name and the link to the photo on Pexels.
  credit: string;
  href: string;
  // Extra classes for the picture itself, e.g. its shape ("aspect-square").
  className?: string;
};

export function Photo({ src, alt, credit, href, className = "" }: PhotoProps) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes="(min-width: 768px) 40vw, 100vw"
        className={`h-auto w-full rounded-3xl border-2 border-navy object-cover shadow-[4px_4px_0_var(--color-navy)] ${className}`}
      />
      <figcaption className="text-xs text-muted">
        Photo:{" "}
        <a href={href} className="underline hover:text-blue">
          {credit} on Pexels
        </a>
      </figcaption>
    </figure>
  );
}
