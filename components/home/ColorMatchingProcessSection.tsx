"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Palette, ScanSearch, Sparkles } from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

const steps = [
  {
    icon: ScanSearch,
    eyebrow: "Step 1",
    title: "Choose the binder you want to improve",
    description:
      "Start with the cards already in your Pokemon TCG binder so BinderWiz can read the page layout, colors, and collection gaps.",
    imageSrc: "/images/mockups/features/color-matching-1.png",
    imageAlt: "BinderWiz Pokemon TCG binder selection screen",
  },
  {
    icon: Sparkles,
    eyebrow: "Step 2",
    title: "Generate matching card recommendations",
    description:
      "Adjust your filters, select reference cards, colors, types, generations etc.. and get creative!",
    imageSrc: "/images/mockups/features/color-matching-3.png",
    imageAlt: "BinderWiz Pokemon card recommendation screen",
  },
  {
    icon: Palette,
    eyebrow: "Step 3",
    title: "Analyze card colors and artwork",
    description:
      "The color matching engine compares dominant colors, gradients, and card art style to understand the visual flow of your binder.",
    imageSrc: "/images/mockups/features/color-matching-2.png",
    imageAlt: "BinderWiz Pokemon card color analysis screen",
  },  
];

export default function ColorMatchingProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-text-primary"
          >
            How Color Matching Builds Better Pokemon TCG Binders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-text-secondary text-lg max-w-3xl mx-auto"
          >
            BinderWiz turns binder generation into a simple three-step flow:
            inspect your cards, analyze their color palette, then suggest cards
            that complete the page.
          </motion.p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-5"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const delay = index * 0.18;

            return (
              <div key={step.title} className="contents">
                <motion.article
                  initial={{ opacity: 0, y: 36, scale: 0.96 }}
                  animate={
                    isInView ? { opacity: 1, y: 0, scale: 1 } : {}
                  }
                  transition={{ duration: 0.55, delay, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-48 sm:w-56 lg:w-60">
                    <PhoneMockup src={step.imageSrc} alt={step.imageAlt} />
                  </div>

                  <div className="mt-7 max-w-sm">
                    <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-surface px-3 py-1">
                      <Icon size={16} className="text-primary-light" />
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                        {step.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </motion.article>

                {index < steps.length - 1 && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: delay + 0.28,
                      ease: "easeOut",
                    }}
                    className="flex items-center justify-center text-primary-light lg:h-[29rem]"
                  >
                    <div className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-surface/80 shadow-[0_0_24px_rgba(170,125,255,0.18)]">
                      <ArrowRight size={24} />
                    </div>
                    <div className="flex h-12 w-px items-end justify-center bg-gradient-to-b from-primary/30 to-secondary/70 lg:hidden">
                      <ArrowRight
                        size={24}
                        className="rotate-90 translate-y-3 drop-shadow-[0_0_12px_rgba(170,125,255,0.45)]"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
