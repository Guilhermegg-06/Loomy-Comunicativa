"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlayIcon, XIcon } from "@phosphor-icons/react";
import type { Project } from "@/content/site";

export function MotionPlayer({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    function cleanup() {
      video.current?.pause();
      document.body.style.overflow = "";
      opener.current?.focus();
    }
    element?.addEventListener("close", cleanup);
    return () => { element?.removeEventListener("close", cleanup); };
  }, []);

  function open() {
    setError(false);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    void video.current?.play().catch(() => { /* Native controls remain available if autoplay is denied. */ });
  }

  return (
    <>
      <button ref={opener} type="button" className="project-preview is-portrait" onClick={open} aria-label={`Ver vídeo: ${project.title}`} aria-haspopup="dialog">
        <span className="project-orbit ambient-motion" aria-hidden="true" />
        <Image className="project-poster" src={project.poster} alt={project.posterAlt} width={project.width} height={project.height} sizes="(max-width: 767px) 92vw, 420px" />
        <span className="play-button"><PlayIcon size={25} weight="fill" aria-hidden /><span>Ver vídeo</span></span>
      </button>
      <dialog ref={dialog} className="motion-dialog is-portrait" aria-labelledby="motion-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="dialog-inner">
          <div className="dialog-heading"><h3 id="motion-title">{project.title}</h3><button className="dialog-close" type="button" aria-label="Fechar vídeo" onClick={() => dialog.current?.close()}><XIcon size={26} aria-hidden /></button></div>
          <video ref={video} controls playsInline preload="none" poster={project.poster} onError={() => setError(true)} aria-label="Por trás das ideias. Vídeo de apresentação com áudio e legendas incorporadas">
            <source src={project.video} type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
          {error ? <p role="alert">Não foi possível carregar o vídeo. <a href={project.video}>Abrir o arquivo</a></p> : <p>Vídeo completo, com áudio e legendas no próprio vídeo.</p>}
        </div>
      </dialog>
    </>
  );
}
