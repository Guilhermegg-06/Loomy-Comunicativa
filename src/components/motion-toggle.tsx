"use client";

import { useState, useSyncExternalStore } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

function subscribe(callback: () => void) {
  const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change",callback);
  return () => preference.removeEventListener("change",callback);
}
function getReduced() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

export function MotionToggle() {
  const [paused,setPaused]=useState(false);
  const reduced=useSyncExternalStore(subscribe,getReduced,() => false);
  function toggle() {
    const next=!paused;
    setPaused(next);
    document.documentElement.dataset.motion=next ? "paused" : "playing";
    window.dispatchEvent(new Event("loomy:motionchange"));
  }
  return (
    <button className="motion-toggle" type="button" onClick={toggle} disabled={reduced} aria-pressed={paused || reduced}>
      {paused || reduced ? <PlayIcon size={14} weight="fill" aria-hidden /> : <PauseIcon size={14} weight="fill" aria-hidden />}
      <span>{reduced ? "Movimento reduzido" : paused ? "Ativar efeitos" : "Pausar efeitos"}</span>
    </button>
  );
}
