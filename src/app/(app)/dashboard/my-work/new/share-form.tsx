"use client";
// Owner: Megan (built by Adhya). The "Share my work" form. Runs in the
// browser because it shrinks the photo and uploads it straight to the
// volunteer's own private folder in Supabase storage. Then the server saves
// the submission (src/lib/work/actions.ts).
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { shareWork } from "@/lib/work/actions";
import { PHOTO_BUCKET } from "@/lib/work/bucket";
import { Message } from "@/components/work/message";
import { Spinner } from "@/app/(auth)/spinner";
import { buttonMain, field, hint, label } from "@/components/portal-styles";

// Photos are shrunk so the longest side is at most this many pixels.
const MAX_SIDE = 1600;

type ShareFormProps = { lessons: { id: string; title: string }[] };

export function ShareForm({ lessons }: ShareFormProps) {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [noteLength, setNoteLength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Free the preview's memory when it changes or the form closes.
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setError(null);
    if (file && !file.type.startsWith("image/")) {
      setError("That file isn't a photo. Please pick a photo of your crochet.");
      return;
    }
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function share(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!photo) {
      setError("Please add a photo of your work first.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { data } = await supabase.auth.getClaims();
    const myId = data?.claims.sub;
    if (!myId) {
      setBusy(false);
      setError("Please sign in again, then share your work.");
      return;
    }

    let shrunk: Blob;
    try {
      shrunk = await shrinkPhoto(photo);
    } catch {
      setBusy(false);
      setError("We couldn't open that photo. Try taking a new one, or pick a JPG or PNG photo.");
      return;
    }

    // Each volunteer's photos go in a folder named after their account.
    const path = `${myId}/${crypto.randomUUID()}.jpg`;
    const upload = await supabase.storage
      .from(PHOTO_BUCKET)
      .upload(path, shrunk, { contentType: "image/jpeg" });
    if (upload.error) {
      setBusy(false);
      setError("We couldn't upload your photo. Check your internet and try again.");
      return;
    }

    const result = await shareWork({
      photoPath: path,
      lessonId: String(form.get("lessonId") ?? ""),
      note: String(form.get("note") ?? ""),
    });
    if (result.done) {
      router.push("/dashboard/my-work?shared=1");
      return;
    }
    // Saving failed, so tidy up the photo we just uploaded.
    await supabase.storage.from(PHOTO_BUCKET).remove([path]);
    setBusy(false);
    setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <form onSubmit={share} className="flex flex-col gap-6">
      {/* The whole box is the "pick a photo" button: it opens the camera or photo library. */}
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed border-line bg-cream p-6 text-center transition hover:border-blue has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue">
        <input type="file" accept="image/*" onChange={choosePhoto} className="sr-only" />
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="The photo you picked"
              className="max-h-80 w-auto rounded-xl object-contain"
            />
            <span className="font-bold text-blue">Change photo</span>
          </>
        ) : (
          <>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-9 text-blue"
            >
              <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            <span className="text-lg font-bold">Add a photo</span>
            <span className="text-ink">Take one now or pick one from your phone.</span>
          </>
        )}
      </label>

      <Message kind="info">
        Only your crochet in the photo, please: no faces, names or school logos.
      </Message>

      <label className={label}>
        <span>
          Which lesson is this from? <span className={hint}>(optional)</span>
        </span>
        <select name="lessonId" defaultValue="" className={`${field} min-h-12`}>
          <option value="">Not from a lesson</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </label>

      <label className={label}>
        <span>
          A note for officers <span className={hint}>(optional)</span>
        </span>
        <textarea
          name="note"
          rows={3}
          maxLength={500}
          placeholder="What did you make? Anything you want help with?"
          onChange={(event) => setNoteLength(event.target.value.length)}
          className={field}
        />
        <span className={`${hint} self-end`}>{noteLength}/500</span>
      </label>

      {error && <Message kind="error">{error}</Message>}

      <button type="submit" disabled={busy} className={`${buttonMain} gap-3 sm:self-start`}>
        {busy ? (
          <>
            <Spinner /> Sharing…
          </>
        ) : (
          "Share my work"
        )}
      </button>
    </form>
  );
}

// Makes the photo smaller (faster to upload on a phone) and saves it as a new
// JPG. The new file leaves out hidden details like where the photo was taken.
async function shrinkPhoto(file: File): Promise<Blob> {
  const image = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Couldn't save photo"))), "image/jpeg", 0.85),
  );
}
