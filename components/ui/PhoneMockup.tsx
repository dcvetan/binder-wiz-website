interface PhoneMockupProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function PhoneMockup({
  src,
  alt,
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={`relative rounded-[1.7rem] border-2 border-card-border bg-card-bg p-1.5 shadow-[0_0_60px_rgba(170,125,255,0.15)] sm:rounded-[2.5rem] sm:p-2 ${className}`}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-card-bg sm:h-5 sm:w-20 sm:rounded-b-2xl" />
      <div className="relative flex aspect-[9/19.5] w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-surface sm:rounded-[2rem]">
        {src ? (
          // Phone screenshots need the original PNG; optimized variants looked soft in rotated mockups.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            draggable={false}
            decoding="async"
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-[1.25rem] object-cover [backface-visibility:hidden] [transform:translateZ(0)] sm:rounded-[2rem]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-surface to-surface-light flex items-center justify-center">
            <span className="text-text-muted text-xs">{alt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
