"use client";
// Owner: Nika. A number that counts up from 0 when it scrolls into view,
// e.g. 0 → 150. "use client" is needed because the counting happens in the
// visitor's browser. People who turn off animations on their device
// (prefers-reduced-motion) just see the final number.
import { useEffect, useRef, useState } from "react";

// How long the count takes, in milliseconds.
const duration = 2000;

export function CountUp({ to }: { to: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(to);
        return;
      }
      const startTime = performance.now();
      const tick = (now: number) => {
        // Goes from 0 to 1 over the duration, slowing down near the end.
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setShown(Math.round(eased * to));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Wait until the number is on screen, then count once.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        start();
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <>
      {/* Screen readers read the final number, not every step of the count. */}
      <span className="sr-only">{to.toLocaleString("en-US")}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {shown.toLocaleString("en-US")}
      </span>
    </>
  );
}
