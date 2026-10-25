import { Brand } from "@/components/brand";
import { Navigation } from "@/components/navigation";
import { Services } from "@/components/services";
import { MotionPlayer } from "@/components/motion-player";
import { MotionDirector } from "@/components/motion-director";
import { ArrowRightIcon, ArrowUpRightIcon, AsteriskIcon, InstagramLogoIcon } from "@/components/icons";
import { projects, site } from "@/content/site";

const manifesto = "A gente acredita nas ideias que não ficam paradas.".split(" ");

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navigation />
      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-layout shell">
            <div className="hero-copy">
              <p className="eyebrow">Criatividade que conecta.</p>
              <h1 id="hero-title">Ideias fora<br />do <span>óbvio.</span><span className="title-asterisk" aria-hidden="true"><AsteriskIcon weight="bold" /></span></h1>
              <p className="hero-description">Produção, design e marketing para marcas que têm algo a dizer.</p>
              <a className="button button-lime" href="#projetos">Nosso universo <ArrowUpRightIcon size={22} aria-hidden /></a>
            </div>
            <div className="hero-art">
              <div className="hero-orbit hero-orbit-secondary" aria-hidden="true" />
              <div className="hero-parallax">
                <div className="hero-pointer">
                  <div className="hero-orbit hero-orbit-main" aria-hidden="true" />
                  <div className="brand-stage"><Brand priority className="hero-brand" /></div>
                  <span className="orbit-satellite" aria-hidden="true"><AsteriskIcon weight="bold" /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto-section" aria-labelledby="manifesto-title">
          <div className="manifesto-inner shell">
            <p className="section-label" id="manifesto-title">O que move a Loomy</p>
            <p className="manifesto-copy">
              <span className="sr-only">A gente acredita nas ideias que não ficam paradas.</span>
              {manifesto.map((word, index) => <span className="manifesto-word" aria-hidden="true" key={`${word}-${index}`}>{word}{" "}</span>)}
            </p>
            <div className="manifesto-bottom" data-reveal><AsteriskIcon size={55} weight="bold" aria-hidden /><p>É no encontro entre estratégia e sensibilidade que uma marca encontra seu jeito de aparecer no mundo.</p></div>
          </div>
        </section>

        <section className="services-section section-space shell" id="servicos" aria-labelledby="services-title">
          <div className="section-heading" data-reveal><h2 id="services-title">Do primeiro insight<br />ao último <span className="muted">detalhe.</span></h2><p>Três formas de criar. Um mesmo olhar.</p></div>
          <Services />
        </section>

        <section className="projects-section section-space" id="projetos" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-heading" data-reveal><h2 id="projects-title">Entre no nosso<br /><span className="outlined">universo.</span><span className="small-star" aria-hidden="true"><AsteriskIcon weight="bold" /></span></h2><p>Um olhar para a identidade que nos coloca em movimento.</p></div>
            {projects.map((project) => <article className="featured-project" key={project.id} data-reveal>
              <MotionPlayer project={project} />
              <div className="project-caption"><h3>{project.title}</h3><span>{project.category}</span></div>
            </article>)}
            <div className="portfolio-note" data-reveal><span className="portfolio-note-icon" aria-hidden="true"><ArrowRightIcon size={31} /></span><div><h3>O próximo capítulo está sendo criado.</h3><p>Novos projetos e histórias vão ocupar este espaço.</p></div><a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">Acompanhe no Instagram <ArrowUpRightIcon size={19} aria-hidden /><span className="sr-only"> (abre em nova aba)</span></a></div>
          </div>
        </section>

        <section className="about-section section-space shell" id="sobre" aria-labelledby="about-title">
          <div className="about-visual" aria-hidden="true"><div className="about-disc"><AsteriskIcon weight="bold" /></div><span className="about-outline">L</span></div>
          <div className="about-copy" data-reveal>
            <p className="section-label">Prazer, Loomy.</p>
            <h2 id="about-title">De Alagoas.<br />De muitas <span className="muted">ideias.</span></h2>
            <p>Somos uma agência alagoana de produção, design e marketing. Unimos diferentes olhares para dar forma ao que sua marca quer comunicar.</p>
            <p>Gostamos de boas perguntas, trocas de verdade e ideias que encontram espaço para acontecer.</p>
            <a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">Acompanhe no Instagram <ArrowUpRightIcon size={20} aria-hidden /><span className="sr-only"> (abre em nova aba)</span></a>
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="contact-disc" aria-hidden="true" />
          <div className="contact-content shell">
            <p>Tem uma ideia por aí?</p>
            <h2 id="contact-title">Bora dar<br />o próximo <span>passo?</span></h2>
            <a className="button button-dark" href={site.instagram} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRightIcon size={24} aria-hidden /><span className="sr-only"> (abre o Instagram em nova aba)</span></a>
            <span className="contact-handle">{site.instagramHandle}</span>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <a href="#inicio" className="footer-brand" aria-label="Loomy, voltar ao início"><Brand /></a>
        <p>Produção, design e marketing.<br /><span>Feito de ideias. Feito em Alagoas.</span></p>
        <a className="footer-social" href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Loomy no Instagram, abre em nova aba"><InstagramLogoIcon size={24} aria-hidden /><ArrowUpRightIcon size={16} aria-hidden /></a>
      </footer>
      <MotionDirector />
    </>
  );
}
