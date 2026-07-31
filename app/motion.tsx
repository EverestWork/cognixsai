"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    const sectionItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-motion]"),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-section-active",
            entry.isIntersecting && entry.intersectionRatio > 0.06,
          );
        });
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: [0, 0.06, 0.2, 0.6] },
    );
    sectionItems.forEach((item) => sectionObserver.observe(item));

    const typingItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-type-reveal]"),
    );
    const typingCompletionTimers = new Set<number>();
    const typingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const typingItem = entry.target as HTMLElement;
            typingItem.classList.add("is-typing");

            const revealDuration = Number(typingItem.dataset.typeDuration);
            const completionTimer = window.setTimeout(
              () => {
                typingItem.classList.add("is-typing-complete");
                typingCompletionTimers.delete(completionTimer);
              },
              Number.isFinite(revealDuration) ? revealDuration : 0,
            );
            typingCompletionTimers.add(completionTimer);
            typingObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.28 },
    );
    typingItems.forEach((item) => typingObserver.observe(item));

    const hero = document.querySelector<HTMLElement>(".hero");
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);

      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--hero-x", x.toFixed(3));
      hero.style.setProperty("--hero-y", y.toFixed(3));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      typingObserver.disconnect();
      typingCompletionTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
