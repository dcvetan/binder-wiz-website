"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const palettes = [
  {
    label: "Blue Palette",
    src: "/images/palettes/blue-palette.png",
    alt: "Blue Pokemon card color matching binder palette",
  },
  {
    label: "Gold Palette",
    src: "/images/palettes/gold-palette.png",
    alt: "Gold Pokemon card color matching binder palette",
  },
  {
    label: "Purple Palette",
    src: "/images/palettes/purple-palette.png",
    alt: "Purple Pokemon card color matching binder palette",
  },
];

export default function ColorMatchingSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-text-primary"
          >
            See Color Matching in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Our algorithm groups cards by color palette so your binder always
            looks stunning.
          </motion.p>
        </div>

        <motion.div
          style={{ y }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {palettes.map((palette, i) => (
            <motion.div
              key={palette.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="relative aspect-[1074/1566] overflow-hidden rounded-xl border border-card-border bg-surface shadow-[0_0_48px_rgba(170,125,255,0.1)]"
            >
              <Image
                src={palette.src}
                alt={palette.alt}
                fill
                sizes="(max-width: 640px) 92vw, 31vw"
                quality={100}
                unoptimized
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                {palette.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          BinderWiz also helps you create polished, shareable collection visuals
          like these, so your color-matched binder pages are easy to show off.
        </motion.p>
      </div>
    </section>
  );
}
