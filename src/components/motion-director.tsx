"use client";

import { useEffect } from "react";

export function MotionDirector() {
  useEffect(() => {
    const preference = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let revision = 0;
    let cleanup = () => {};
    async function sync() {
      const current = ++revision;
      cleanup();
      cleanup = () => {};
      if (!preference.matches || document.documentElement.dataset.motion==="paused") return;
      const { initializeDesktopMotion } = await import("./desktop-motion");
      if (!disposed && current === revision && preference.matches) cleanup = initializeDesktopMotion();
    }
    const update = () => { void sync().catch(() => { /* Motion is optional; content stays visible if the chunk cannot load. */ }); };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("loomy:motionchange",update);
    const observer=new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-in-view",entry.isIntersecting));
    },{threshold:.05});
    document.querySelectorAll("[data-motion-surface]").forEach((element) => observer.observe(element));
    return () => { disposed = true; preference.removeEventListener("change", update); window.removeEventListener("loomy:motionchange",update); observer.disconnect(); cleanup(); };
  }, []);

  return null;
}
