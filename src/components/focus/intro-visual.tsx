import Image from "next/image";

export function IntroVisual() {
  return <>
    <div className="intro-landscape" aria-hidden="true"><picture>
      <source media="(max-width:767px)" srcSet="/media/loomy-valley-mobile.webp" />
      <Image src="/media/loomy-valley.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" unoptimized />
    </picture></div>
    <div className="intro-logo" aria-hidden="true">
      <picture><source media="(max-width:767px)" srcSet="/media/loomy-crystal-mobile.webp" /><Image src="/media/loomy-crystal.webp" alt="" fill sizes="(max-width:767px) 94vw, 78vw" loading="eager" fetchPriority="high" unoptimized /></picture>
      <div className="intro-sheen"><div className="intro-sheen-sweep" /></div>
    </div>
    <div className="intro-foreground" aria-hidden="true"><picture>
      <source media="(max-width:767px)" srcSet="/media/loomy-valley-mobile.webp" />
      <Image src="/media/loomy-valley.webp" alt="" fill sizes="100vw" unoptimized />
    </picture></div>
  </>;
}
