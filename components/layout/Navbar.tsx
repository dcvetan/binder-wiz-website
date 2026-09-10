"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const chapters = [
  { id: "features", label: "Prices" },
  { id: "color-matching", label: "Binders" },
  { id: "palettes", label: "Palettes" },
  { id: "testing-phase-2", label: "Get the app" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
      let current = "";
      for (const chapter of chapters) {
        if ((document.getElementById(chapter.id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * 0.4) current = chapter.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    frame = requestAnimationFrame(update);
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);

  const links = chapters.map(chapter => <a key={chapter.id} href={`/#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} className={`chapter-link flex min-h-11 items-center justify-center whitespace-nowrap px-3 text-sm font-medium transition-colors ${active === chapter.id ? "text-white" : "text-text-muted hover:text-white"}`}>{chapter.label}<span className={`absolute bottom-0 h-0.5 w-5 rounded-full bg-primary transition-opacity ${active === chapter.id ? "opacity-100" : "opacity-0"}`} /></a>);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-divider bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="BinderWiz home" className="flex shrink-0 items-center gap-2">
          <Image src="/images/logo.png" alt="" width={34} height={34} />
          <span className="text-lg font-bold text-white sm:text-xl">BinderWiz</span>
        </Link>
        <nav aria-label="Page sections" className="hidden items-center gap-3 md:flex">{links}</nav>
        <a href="https://discord.gg/vsFH4rbGJ" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light sm:px-4"><MessageCircle size={16} /><span>Discord</span><ArrowUpRight size={14} className="hidden sm:block" /></a>
      </div>
      <nav aria-label="Mobile page sections" className="grid grid-cols-4 border-t border-divider/60 px-2 md:hidden">{links}</nav>
      <div ref={progress} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary" />
    </header>
  );
}
