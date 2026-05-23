"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Palette,
  TrendingUp,
  Award,
  BarChart2,
  BookOpen,
  Package,
  Globe,
  Search,
  Layers,
} from "lucide-react";

const cards = [
  {
    icon: Palette,
    title: "Color Matching Algorithm",
    description:
      "Get card recommendations based on dominant color, gradient, and art style for a perfect binder.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Card Prices",
    description:
      "Live prices from TCGPlayer, Cardmarket and Ebay for every card in your collection.",
  },
  {
    icon: Award,
    title: "Graded Card Support",
    description:
      "Track PSA, BGS, CGC and other graded cards with accurate graded market prices.",
  },
  {
    icon: BarChart2,
    title: "Portfolio Analytics",
    description:
      "See which cards and sealed products moved the most and how your collection value changes over time.",
  },
  {
    icon: BookOpen,
    title: "Pokédex Tracker",
    description:
      "Know exactly which Pokémon you've collected across every expansion.",
  },
  {
    icon: Package,
    title: "Sealed Product Tracking",
    description:
      "Track booster boxes, ETBs and other sealed products alongside your singles.",
  },
  {
    icon: Globe,
    title: "Multi-Market Prices",
    description:
      "Switch between TCGPlayer (USD) and Cardmarket (EUR) with one tap.",
  },
  {
    icon: Search,
    title: "Powerful Card Search",
    description:
      "Search across 22,000+ Pokémon cards instantly with advanced filters.",
  },
  {
    icon: Layers,
    title: "Binder Management",
    description:
      "Organize your physical binders digitally and get smart fill recommendations.",
  },
];

export default function FeatureCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Every Tool a Pokémon TCG Collector Needs
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            From price tracking to binder management, BinderWiz is the only
            Pokémon TCG app you&apos;ll ever need.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-surface border border-card-border rounded-2xl p-6 hover:scale-[1.03] hover:border-primary/30 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
