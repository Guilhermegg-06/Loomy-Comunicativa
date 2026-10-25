"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionDirector() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Entry establishes the reading order; content is visible without JavaScript.
      gsap.from(".hero-copy > *", { y: 36, opacity: 0, duration: 0.85, stagger: 0.11, ease: "power3.out", clearProps: "all" });
      gsap.from(".hero-art", { scale: 0.88, opacity: 0, rotate: -7, duration: 1.2, ease: "power3.out", clearProps: "opacity" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { y: 38, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 94%", once: true }, clearProps: "all" });
      });
      // Word contrast follows reading progress through the manifesto.
      gsap.from(".manifesto-word", { opacity: 0.65, stagger: 0.14, ease: "none", scrollTrigger: { trigger: ".manifesto-copy", start: "top 85%", end: "bottom 50%", scrub: true } });
      // The brand circle expands into the contact surface, concluding the narrative.
      gsap.fromTo(".contact-disc", { scale: 0.55 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".contact-section", start: "top bottom", end: "top 20%", scrub: 1 } });
    });

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".hero-parallax", { y: 115, rotate: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-orbit-secondary", { rotate: -22, y: -55, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".about-disc", { y: -60, rotate: 12, ease: "none", scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1 } });
    });

    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const art = document.querySelector<HTMLElement>(".hero-pointer");
      if (!hero || !art) return;
      const moveX = gsap.quickTo(art, "x", { duration: 0.8, ease: "power3.out" });
      const moveY = gsap.quickTo(art, "y", { duration: 0.8, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const bounds = hero.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 32);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 26);
      };
      const reset = () => { moveX(0); moveY(0); };
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", reset);
      return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", reset); };
    });

    return () => media.revert();
  }, []);

  return null;
}
