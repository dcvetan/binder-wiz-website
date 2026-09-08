"use client";

import { useEffect, useRef, useState } from "react";

type Controls = { rotate: (direction: number) => void; reset: () => void };

export default function Artwork3D({ src, alt, aspect, spin = false, className = "" }: {
  src: string;
  alt: string;
  aspect: number;
  spin?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let started = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      void import("@/lib/artwork-scene").then(async ({ createArtworkScene }) => {
        if (disposed) return;
        const scene = await createArtworkScene(element, { src, aspect, spin });
        if (disposed) { scene.dispose(); return; }
        cleanup = scene.dispose;
        controls.current = scene;
        setReady(true);
      }).catch(() => { /* Keep the original artwork visible if WebGL is unavailable. */ });
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); controls.current = null; };
  }, [src, aspect, spin]);

  return (
    <div className={`relative ${className}`} data-artwork-3d={spin ? "card" : "palette"}>
      <div
        ref={host}
        role="group"
        aria-label={`${alt}, interactive 3D view`}
        tabIndex={0}
        className="absolute inset-0 touch-pan-y cursor-grab rounded-lg outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); controls.current?.rotate(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home") { event.preventDefault(); controls.current?.reset(); }
        }}
      >
        {/* The original image also serves as a no-WebGL and loading fallback. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" draggable={false} className={`pointer-events-none absolute inset-0 m-auto h-[78%] w-[82%] object-contain transition-opacity ${ready ? "opacity-0" : "opacity-100"}`} />
      </div>
    </div>
  );
}
