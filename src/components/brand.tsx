import Image from "next/image";

export function Brand({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const mark = (
    <Image
      className={`brand-image ${className}`}
      src={priority ? "/media/loomy-crystal.webp" : "/media/loomy-crystal-small.webp"}
      alt="Loomy"
      width={1100}
      height={458}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      unoptimized
      sizes={priority ? "(max-width: 767px) 92vw, (max-width: 1536px) 46vw, 610px" : "(max-width: 767px) 120px, 145px"}
    />
  );
  return priority ? <picture><source media="(max-width: 767px)" srcSet="/media/loomy-crystal-mobile.webp" type="image/webp" />{mark}</picture> : mark;
}
