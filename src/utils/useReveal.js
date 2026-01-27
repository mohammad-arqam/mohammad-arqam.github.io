import { useEffect } from "react";

/**
 * Reveal-on-scroll helper.
 * When React re-renders lists (e.g., filtering projects), new elements need
 * to be observed again. Pass a `trigger` value that changes when the list changes.
 */
export function useReveal(trigger = "") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));

    const makeVisibleIfInView = (el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.92 && r.bottom > 0;
      if (inView) el.classList.add("is-visible");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      io.observe(el);
      makeVisibleIfInView(el);
    });

    return () => io.disconnect();
  }, [trigger]);
}
