import Image from "next/image";

export function Brand({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      className={`brand-image ${className}`}
      src={priority ? "/media/loomy-reference-wordmark.webp" : "/media/loomy-wordmark-small.webp"}
      alt="Loomy"
      width={642}
      height={284}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      sizes={priority ? "(max-width: 767px) 92vw, (max-width: 1536px) 46vw, 610px" : "(max-width: 767px) 120px, 145px"}
    />
  );
}
