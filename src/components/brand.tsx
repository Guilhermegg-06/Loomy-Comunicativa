import Image from "next/image";

export function Brand({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      className={`brand-image ${className}`}
      src="/media/loomy-reference-wordmark.png"
      alt="Loomy"
      width={963}
      height={426}
      priority={priority}
      sizes={priority ? "(max-width: 767px) 80vw, 42vw" : "160px"}
    />
  );
}
