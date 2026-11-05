"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { Brand } from "../brand";
import { MotionPlayer } from "../motion-player";
import { MotionToggle } from "../motion-toggle";
import { projects, services, site } from "@/content/site";
import { chapters } from "./focus-content";
import { ContactBrief } from "./contact-brief";

export function FocusExperience({world}: {world: ReactNode}) {
  const root=useRef<HTMLDivElement>(null);
  const scroller=useRef<HTMLElement>(null);
  const goRef=useRef<((index:number)=>void)|null>(null);
  const [active,setActive]=useState(0);
  const [ready,setReady]=useState(false);
  const go=useCallback((index:number)=>{
    const target=Math.max(0,Math.min(7,index));
    if(goRef.current) goRef.current(target);
    else {
      scroller.current?.scrollTo({top:target*scroller.current.clientHeight,behavior:"instant"});
      history.replaceState(null,"",`#${chapters[target].id}`);
      setActive(target);
    }
  },[]);
  useEffect(()=>{
    let disposed=false,cleanup=()=>{};
    void import("./focus-engine").then(({initializeFocus})=>{
      if (disposed || !root.current || !scroller.current) return;
      const engine=initializeFocus(root.current,scroller.current,index=>setActive(index),()=>setReady(true));
      goRef.current=engine.go;
      cleanup=engine.dispose;
    });
    return ()=>{disposed=true;cleanup();goRef.current=null;};
  },[]);
  function link(event: React.MouseEvent<HTMLAnchorElement>,index:number) {event.preventDefault();go(index);}
  return <div ref={root} className={`focus-experience ${ready ? "has-webgl" : ""} ${active===5 || active===6 ? "is-light" : ""}`} data-stage={active} data-3d={ready ? "ready" : "fallback"}>
    <a className="skip-link" href="#conteudo" onClick={()=>scroller.current?.focus()}>Pular para o conteúdo</a>
    <main id="conteudo" className="focus-scroll" ref={scroller} tabIndex={-1} aria-label="Experiência Loomy em foco">
    <header className="focus-header">
      <a className="focus-brand" href="#inicio" aria-label="Loomy, início" onClick={event=>link(event,0)}><Brand /></a>
      <nav aria-label="Navegação principal">{services.map((service,index)=><a key={service.id} href={`#${service.id}`} onClick={event=>link(event,index+1)} aria-current={active===index+1 ? "location" : undefined}>{service.name}</a>)}</nav>
    </header>
      <div className="focus-stage">
        <div className="focus-world focus-soft" aria-hidden="true">{world}</div>
        <svg className="focus-clip-defs" aria-hidden="true" width="0" height="0"><defs><clipPath id="loomy-focus-lenses" clipPathUnits="userSpaceOnUse"><polygon data-lens-clip="0" points="0,0" /><polygon data-lens-clip="1" points="0,0" /></clipPath></defs></svg>
        <div className="focus-world focus-clear" aria-hidden="true">{world}<p className="lens-label" data-lens-label="0">Ideias<br />em<br />foco.</p><p className="lens-label" data-lens-label="1">Ideias<br />em<br />foco.</p></div>
        <div className="focus-fallback" aria-hidden="true"><div data-fallback-o="0" /><div data-fallback-o="1" /></div>
        <div className="focus-canvas" aria-hidden="true" />
      </div>
      {chapters.map((chapter,index)=><section className="focus-waypoint" id={chapter.id} key={chapter.id} aria-labelledby={`chapter-${chapter.id}`}>
        {index===0 ? <h1 id={`chapter-${chapter.id}`} className="sr-only">Loomy. Ideias em foco.</h1> : <h2 id={`chapter-${chapter.id}`} className="sr-only">{chapter.name}</h2>}
        <p className="sr-only">{chapter.description}</p>
      </section>)}
    <div className="focus-interface">
      {active<4 ? <>
        <div className="focus-arrows"><button type="button" onClick={()=>go(active-1)} disabled={active===0} aria-label="Etapa anterior"><ArrowLeftIcon size={17} aria-hidden /></button><button type="button" onClick={()=>go(active+1)} aria-label="Próxima etapa"><ArrowRightIcon size={17} aria-hidden /></button></div>
        <nav className="focus-service-dots" aria-label="Explorar serviços">{services.map((service,index)=><button key={service.id} type="button" onClick={()=>go(index+1)} aria-label={`Explorar ${service.name}`} aria-current={active===index+1 ? "step" : undefined}><span /></button>)}</nav>
      </> : null}
      <div className="focus-caption" key={active}>
        {active===0 ? <p className="intro-caption">Produção, design<br />e marketing.<br /><strong>De Alagoas.</strong></p> : null}
        {active>0 && active<4 ? <><p className="caption-count">0{active}/03</p><p className="caption-title">{services[active-1].name}</p><p className="caption-description">{services[active-1].phrase}</p><p className="caption-disciplines">{services[active-1].disciplines.join(" · ")}</p></> : null}
        {active===4 ? <><p className="caption-title">Por trás das ideias.</p><p className="caption-description">Da primeira conversa ao último detalhe.</p><div className="focus-film-trigger"><MotionPlayer project={projects[0]} /></div></> : null}
        {active===5 ? <><p className="caption-title">De Alagoas.<br />Para novas conexões.</p><p className="caption-description">Estratégia e criatividade para aproximar<br />sua marca das pessoas.</p></> : null}
        {active===6 ? <><p className="caption-title">03. Conectar</p><p className="caption-description">A ideia encontra seu lugar no mundo.</p><button className="focus-text-button" type="button" onClick={()=>go(7)}>Vamos conversar <ArrowUpRightIcon size={16} aria-hidden /></button></> : null}
      </div>
      {active===0 ? <><a href="#contato" className="focus-hero-cta" onClick={event=>link(event,7)}>Vamos conversar<span /></a><span className="focus-outline" aria-hidden="true">oo</span></> : null}
      <div className="focus-contact" hidden={active!==7}><ContactBrief /><a className="contact-handle" href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}<span className="sr-only"> (abre em nova aba)</span></a></div>
    </div>
    <MotionToggle />
    </main>
    <p className="sr-only" role="status" aria-live="polite">{active+1} de {chapters.length}. {chapters[active].name}.</p>
  </div>;
}
