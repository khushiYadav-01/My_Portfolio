import { useEffect, useRef } from "react";

// Adds the "in" class to an element (and its .reveal children) once it
// scrolls into view. Used for the fade-up animation and the loss-curve draw-in.
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.classList.contains("reveal")
      ? [root, ...root.querySelectorAll(".curve-wrap")]
      : [...root.querySelectorAll(".reveal, .curve-wrap")];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
