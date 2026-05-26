"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const games = [
  "Yu-Gi-Oh!",
  "MTG",
  "One Piece TCG",
  "More coming soon...",
];

const postReleasePlans = [
  "Camera scan for cards",
  "Japanese and Chinese cards",
  "All grading companies",
  "Improving color matching ever more",
];

export default function ComingSoonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-8 sm:py-14">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,121,249,0.1)_0%,_transparent_60%)]" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-surface/60 backdrop-blur border border-card-border rounded-3xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Pokémon Is Just the Beginning
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            BinderWiz currently supports the Pokémon Trading Card Game with
            22,000+ cards. We&apos;re actively working on expanding to other TCGs, so
            you can manage every part of your collection in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {games.map((game, i) => (
              <motion.span
                key={game}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                className="bg-chip-unselected border border-card-border rounded-full px-4 py-2 text-text-secondary text-sm"
              >
                {game}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="mt-8 border-t border-card-border/70 pt-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-light mb-5">
              Planned after release
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {postReleasePlans.map((plan, i) => (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.85 + i * 0.08 }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left ${
                    i === 0
                      ? "border-primary/60 bg-primary/15 shadow-[0_0_32px_rgba(170,125,255,0.18)]"
                      : "border-card-border bg-card-bg/70"
                  }`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary-light shadow-[0_0_16px_rgba(187,154,255,0.6)]" />
                  <span
                    className={`text-sm font-medium ${
                      i === 0 ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {plan}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
