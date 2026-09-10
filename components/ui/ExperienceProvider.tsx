"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { X } from "lucide-react";

type Preview = { src: string; alt: string };
const PreviewContext = createContext<(image: Preview) => void>(() => {});
export const useImagePreview = () => useContext(PreviewContext);

export default function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const open = useCallback((image: Preview) => setPreview(image), []);

  useEffect(() => {
    if (!preview || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => { document.body.style.overflow = previousOverflow; element.close(); };
  }, [preview]);

  return (
    <MotionConfig reducedMotion="user">
      <PreviewContext.Provider value={open}>
        {children}
        <dialog ref={dialog} aria-label={preview?.alt ?? "App screenshot"} className="image-preview fixed inset-0 m-auto max-h-[100svh] max-w-[100vw] bg-transparent p-0 text-white backdrop:bg-black/90" onCancel={(event) => { event.preventDefault(); setPreview(null); }} onClose={() => { if (!dialog.current?.open) setPreview(null); }} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
          {preview && <div className="relative flex h-[100svh] w-screen items-center justify-center px-4 py-16" onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
            <button type="button" aria-label="Close screenshot" title="Close screenshot" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-background text-white hover:bg-surface focus-visible:outline-2 focus-visible:outline-white" onClick={() => setPreview(null)}><X size={22} /></button>
            {/* Full-resolution source preserves small app labels when enlarged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.src} alt={preview.alt} className="max-h-full max-w-full rounded-lg object-contain" />
          </div>}
        </dialog>
      </PreviewContext.Provider>
    </MotionConfig>
  );
}
