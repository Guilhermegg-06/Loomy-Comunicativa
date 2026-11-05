import Image from "next/image";
import { CrystalLogo } from "./crystal-logo";
import { site } from "@/content/site";
import "./field-hero.css";

export function FieldHero() {
  return (
    <section id="inicio" className="hero field-hero" data-layout="field" aria-labelledby="hero-title" data-motion-surface>
      <h1 id="hero-title" className="sr-only">Loomy. Produção, design e marketing.</h1>
      <div className="field-scene" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/loomy-field-mobile.webp" />
          <Image className="field-photo" src="/media/loomy-field.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" unoptimized />
        </picture>
      </div>
      <div className="field-wordmark hero-parallax">
        <div className="hero-pointer"><CrystalLogo variant="field" /></div>
      </div>
      <div className="field-foreground" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/loomy-field-mobile.webp" />
          <Image className="field-photo" src="/media/loomy-field.webp" alt="" fill sizes="100vw" unoptimized />
        </picture>
      </div>
      <div className="field-mist ambient-motion" aria-hidden="true" />
      <div className="field-shade" aria-hidden="true" />
      <div className="field-info">
        <div className="field-brand"><p>Loomy</p><span>Ideias fora do óbvio.</span></div>
        <div className="field-columns">
          <nav aria-label="Explore a Loomy"><h2>Explore</h2><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#sobre">A Loomy</a></nav>
          <nav aria-label="Criação Loomy"><h2>Criação</h2><a href="#service-button-producao">Produção</a><a href="#service-button-design">Design</a><a href="#service-button-marketing">Marketing</a></nav>
          <nav aria-label="Contato Loomy"><h2>Contato</h2><a href="#contato">Vamos conversar</a><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> (abre em nova aba)</span></a></nav>
        </div>
      </div>
      <p className="field-copyright">© 2026 Loomy</p>
    </section>
  );
}
