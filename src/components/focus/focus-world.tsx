import Image from "next/image";

// Decorative worlds are rendered twice: soft outside the O's, sharp inside them.
// They share coordinates; only the foreground copy receives the moving lens clip.
export function FocusWorld() {
  return <>
    <div className="focus-world-panel world-hero" data-world-panel="0"><p className="world-title">Ideias<br />em<br />foco.</p></div>
    <div className="focus-world-panel world-service" data-world-panel="1"><p className="world-title">Produção</p></div>
    <div className="focus-world-panel world-service" data-world-panel="2"><p className="world-title">Design</p></div>
    <div className="focus-world-panel world-service" data-world-panel="3"><p className="world-title">Marketing</p></div>
    <div className="focus-world-panel world-film" data-world-panel="4"><Image src="/media/loomy-film-poster.webp" alt="" fill sizes="100vw" unoptimized /><div className="world-film-shade" /></div>
    <div className="focus-world-panel world-coast" data-world-panel="5"><picture><source media="(max-width:767px)" srcSet="/media/loomy-coast-mobile.webp" /><Image src="/media/loomy-coast.webp" alt="" fill sizes="100vw" unoptimized /></picture></div>
    <div className="focus-world-panel world-process" data-world-panel="6">
      <div className="process-photo process-photo-one"><Image src="/media/loomy-film-poster.webp" alt="" fill sizes="(max-width:767px) 38vw, 24vw" unoptimized /><p>01. Ouvir<span>Todo projeto começa com uma conversa.</span></p></div>
      <div className="process-photo process-photo-two"><Image src="/media/loomy-crystal.webp" alt="" fill sizes="(max-width:767px) 44vw, 32vw" unoptimized /><p>02. Criar<span>Diferentes olhares. Uma mesma intenção.</span></p></div>
    </div>
    <div className="focus-world-panel world-contact" data-world-panel="7"><p className="world-title">Vamos criar<br />juntos.</p></div>
  </>;
}
