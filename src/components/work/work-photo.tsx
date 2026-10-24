// Owner: Megan (shared; built by Adhya). A photo of shared work.
// Photos are private, so they come as short-lived links from Supabase, which
// Next.js's <Image> can't resize. A plain <img> shows them as they are (the
// website already shrinks them before uploading).
export function WorkPhoto({ src, alt, className = "" }: { src: string | null; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className={`grid place-items-center bg-sand p-4 text-center font-bold text-muted ${className}`}>
        Photo unavailable
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={`bg-sand ${className}`} />;
}
