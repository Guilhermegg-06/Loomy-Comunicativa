"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowClockwiseIcon, ArrowCounterClockwiseIcon, CubeIcon } from "@phosphor-icons/react";
import { Brand } from "./brand";
import type { CrystalController } from "./crystal-scene";

export function CrystalLogo() {
  const host=useRef<HTMLDivElement>(null);
  const controller=useRef<CrystalController | null>(null);
  const launcher=useRef<(() => void) | null>(null);
  const manual=useRef(false);
  const [status,setStatus]=useState<"poster"|"loading"|"ready"|"unavailable">("poster");

  useEffect(() => {
    let disposed=false;
    let loading=false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled=() => !preference.matches && document.documentElement.dataset.motion!=="paused";
    async function load() {
      if (!host.current || loading || controller.current) return;
      loading=true;setStatus("loading");
      try {
        const {createCrystalScene}=await import("./crystal-scene");
        if (disposed || !host.current) return;
        const scene=await createCrystalScene(host.current,enabled());
        if (disposed) { scene.dispose();return; }
        controller.current=scene;
        scene.setMotion(enabled());
        setStatus("ready");
        if (manual.current) host.current?.querySelector("canvas")?.focus({preventScroll:true});
      } catch {
        if (!disposed) setStatus("unavailable");
      } finally { loading=false; }
    }
    launcher.current=() => { void load(); };
    const observer=new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && enabled() && !matchMedia("(pointer: coarse)").matches && !loading && !controller.current) {
        timer=setTimeout(() => { if (enabled()) void load(); },900);
        observer.disconnect();
      }
    },{threshold:.1});
    if (host.current) observer.observe(host.current);
    const sync=() => controller.current?.setMotion(enabled());
    preference.addEventListener("change",sync);
    window.addEventListener("loomy:motionchange",sync);
    return () => {
      disposed=true;clearTimeout(timer);observer.disconnect();
      preference.removeEventListener("change",sync);window.removeEventListener("loomy:motionchange",sync);
      controller.current?.dispose();controller.current=null;launcher.current=null;
    };
  },[]);

  return (
    <div className={`crystal-logo ${status==="ready" ? "is-ready" : ""}`} data-status={status}>
      <div className="crystal-fallback ambient-motion" aria-hidden={status==="ready"}><Brand priority className="hero-brand" /></div>
      <div className="crystal-canvas" ref={host} />
      <div className="crystal-tools">
        {status!=="ready" ? <button type="button" onClick={() => {manual.current=true;launcher.current?.();}} disabled={status==="loading" || status==="unavailable"}><CubeIcon size={16} aria-hidden />{status==="loading" ? "Preparando 3D" : status==="unavailable" ? "Logo em imagem" : "Explorar 3D"}</button> : <>
          <span className="crystal-hint">Arraste para girar</span>
          <button type="button" onClick={() => controller.current?.rotate()} aria-label="Girar logo"><ArrowClockwiseIcon size={17} aria-hidden /><span>Girar</span></button>
          <button type="button" onClick={() => controller.current?.reset()} aria-label="Restaurar posição da logo"><ArrowCounterClockwiseIcon size={17} aria-hidden /><span className="sr-only">Restaurar</span></button>
        </>}
      </div>
      <span role="status" className="sr-only">{status==="ready" ? "Logo 3D pronta. Arraste, use as setas do teclado ou os botões para girar." : status==="unavailable" ? "Visualização 3D indisponível neste dispositivo. A imagem da logo foi preservada." : ""}</span>
    </div>
  );
}
