// Owner: Nika. Photo gallery. Each box is an empty photo spot for now.
// When adding real photos: plushies and hands are fine, but no children's
// faces, names, or anything that shows which shelter they're at.
import { galleryPhotos } from "../_placeholder";
import { eyebrow, sectionTitle } from "./styles";

export function Gallery() {
  return (
    <section id="gallery" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Gallery</p>
        <h2 className={sectionTitle}>Made by our volunteers</h2>
      </div>
      {/* Two photos per row on phones, three on wider screens. */}
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {galleryPhotos.map((photo) => (
          <li
            key={photo.id}
            className="grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-navy bg-sand p-3 text-center text-sm text-muted"
          >
            {photo.label} coming soon
          </li>
        ))}
      </ul>
    </section>
  );
}
