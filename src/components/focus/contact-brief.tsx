"use client";

import { useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";
import { site } from "@/content/site";

export function ContactBrief() {
  const [service,setService]=useState("Produção");
  const [draft,setDraft]=useState("");
  const [copied,setCopied]=useState(false);
  const [idea,setIdea]=useState("");
  async function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message=`Olá, Loomy! Quero conversar sobre ${service.toLowerCase()}.\n\n${idea.trim()}`;
    setDraft(message);
    try { await navigator.clipboard.writeText(message);setCopied(true); } catch { setCopied(false); }
  }
  return <div className="focus-contact-panel">
    <h2>Vamos criar juntos.</h2><p className="contact-intro">Sua próxima ideia merece um novo olhar.</p>
    {draft ? <div className="brief-ready">
      <p role="status">{copied ? <><CheckIcon size={16} aria-hidden /> Briefing copiado. Cole na conversa com a Loomy.</> : "Seu briefing está pronto. Copie o texto e envie na conversa."}</p>
      <label htmlFor="brief-draft">Seu briefing</label><textarea id="brief-draft" value={draft} readOnly onFocus={event=>event.currentTarget.select()} />
      <a className="focus-submit" href={site.instagram} target="_blank" rel="noopener noreferrer">Abrir Instagram <ArrowUpRightIcon size={18} aria-hidden /><span className="sr-only"> (abre em nova aba)</span></a>
      <button className="brief-edit" type="button" onClick={()=>setDraft("")}>Editar minha ideia</button>
    </div> : <form onSubmit={prepare}>
      <fieldset><legend>O que precisa de foco?</legend><div className="brief-options">{["Produção","Design","Marketing"].map(name=><button key={name} type="button" aria-pressed={service===name} onClick={()=>setService(name)}>{name}</button>)}</div></fieldset>
      <label htmlFor="brief-idea">Conte um pouco da sua ideia</label><textarea value={idea} onChange={event=>setIdea(event.currentTarget.value)} id="brief-idea" name="ideia" rows={2} maxLength={1200} placeholder="O que você quer colocar no mundo?" required />
      <button type="submit" className="focus-submit">Preparar conversa <ArrowUpRightIcon size={18} aria-hidden /></button>
      <p className="brief-note">Prepare seu briefing aqui. A conversa acontece no Instagram.</p>
    </form>}
  </div>;
}
