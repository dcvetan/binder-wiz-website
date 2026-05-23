"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Palette,
  BarChart3,
  PackageSearch,
  ShieldCheck,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

const features = [
  {
    icon: BarChart3,
    title: "Portfolio Price Tracking",
    description:
      "Track your Pokemon card collection value in one portfolio. Follow live market prices from TCGPlayer and Cardmarket, monitor gains and losses, and see which cards are moving over time.",
    mockupLayout: "double",
    imageSrc: "/images/mockups/features/price-second.png",
    imageAlt: "BinderWiz Pokemon TCG portfolio price tracking screen",
    secondaryImageSrc: "/images/mockups/features/price-first.png",
    secondaryImageAlt: "BinderWiz Pokemon TCG collection binder screen",
  },
  {
    icon: PackageSearch,
    title: "Product Price Details",
    description:
      "Check price details for cards, booster boxes, packs, and other sealed Pokemon TCG products. Review price history, market movement, and quick value insights before you buy or sell.",
    mockupLayout: "triple",
    imageSrc: "/images/mockups/features/price-details-2.png",
    imageAlt: "BinderWiz Pokemon TCG product price details screen",
    secondaryImageSrc: "/images/mockups/features/price-details-3.png",
    secondaryImageAlt: "BinderWiz Pokemon TCG card price detail screen",
    tertiaryImageSrc: "/images/mockups/features/price-details-1.png",
    tertiaryImageAlt: "BinderWiz Pokemon TCG sealed product price detail screen",
  },
  {
    icon: ShieldCheck,
    title: "Graded and Ebay pokemon prices",
    description:
      "Track PSA graded Pokemon cards alongside raw cards. Compare graded card prices for PSA, and CGC, and understand how condition and grade can change your collection's value. (Soon adding other grading companies)",
    mockupLayout: "double",
    imageSrc: "/images/mockups/features/graded-1.png",
    imageAlt: "BinderWiz PSA and graded Pokemon card prices screen",
    secondaryImageSrc: "/images/mockups/features/graded-2.png",
    secondaryImageAlt: "BinderWiz graded Pokemon card market prices screen",
  },
  {
    icon: Palette,
    title: "Card Color Matching",
    description:
      "Build better binders with smart card color matching. Get card recommendations based on dominant colors, gradients, artwork style, and your binder's overall aesthetic.",
    mockupLayout: "double",
    imageSrc: "/images/mockups/features/features-binder.png",
    imageAlt: "BinderWiz Pokemon card color matching binder screen",
    secondaryImageSrc: "/images/mockups/front-color-matching.png",
    secondaryImageAlt: "BinderWiz Pokemon card color matching recommendations screen",
  },
  {
    icon: Sparkles,
    title: "Budget-Based Binder Page Upgrades",
    description:
      "Enter a budget and get Pokemon TCG binder page upgrade suggestions that match your page colors. BinderWiz finds cards that fit the palette, improve the page, and stay within the price range you choose.",
    mockupLayout: "triple",
    imageSrc: "/images/mockups/features/page-upgrade-3.png",
    imageAlt: "BinderWiz binder page upgrade suggestions screen",
    secondaryImageSrc: "/images/mockups/features/page-upgrade-1.png",
    secondaryImageAlt: "BinderWiz color matched binder recommendations screen",
    tertiaryImageSrc: "/images/mockups/features/page-upgrade-2.png",
    tertiaryImageAlt: "BinderWiz Pokemon card budget and price details screen",
  },
  {
    icon: BookOpen,
    title: "Complete Pokedex Tracker",
    description:
      "Use a Pokedex to track every Pokemon you own, find missing cards across sets, and organize your progress toward a complete living card collection.",
    mockupLayout: "triple",
    imageSrc: "/images/mockups/features/pokedex-3.png",
    imageAlt: "BinderWiz Pokemon TCG Pokedex tracker screen",
    secondaryImageSrc: "/images/mockups/features/pokedex-2.png",
    secondaryImageAlt: "BinderWiz Pokemon TCG collection progress screen",
    tertiaryImageSrc: "/images/mockups/features/pokedex-1.png",
    tertiaryImageAlt: "BinderWiz Pokemon TCG missing Pokemon cards screen",
  },
  {
    icon: Layers,
    title: "Track Your Expansions",
    description:
      "See how many cards you own from each expansion, follow your set completion progress, and quickly spot which cards are still missing from every set.",
    mockupLayout: "double",
    imageSrc: "/images/mockups/features/expansions-2.png",
    imageAlt: "BinderWiz Pokemon TCG expansion completion tracker screen",
    secondaryImageSrc: "/images/mockups/features/expansions-1.png",
    secondaryImageAlt: "BinderWiz Pokemon TCG set completion progress screen",
  },
];

function FeatureMockups({ feature }: { feature: (typeof features)[0] }) {
  if (
    feature.mockupLayout === "triple" &&
    feature.secondaryImageSrc &&
    feature.tertiaryImageSrc
  ) {
    return (
      <div className="relative h-[18rem] w-full max-w-[18rem] overflow-visible sm:h-[25rem] sm:max-w-[30rem] lg:h-[29rem] lg:max-w-[34rem]">
        <div className="absolute left-0 top-1/2 w-[45%] -translate-y-1/2 -rotate-10 sm:left-[-10%] sm:w-[49%] sm:-rotate-12 lg:left-0">
          <PhoneMockup
            src={feature.secondaryImageSrc}
            alt={feature.secondaryImageAlt}
            className="shadow-[0_0_40px_rgba(170,125,255,0.1)]"
          />
        </div>
        <div className="absolute left-1/2 top-1/2 z-20 w-[56%] -translate-x-1/2 -translate-y-1/2 sm:w-[60%]">
          <PhoneMockup src={feature.imageSrc} alt={feature.imageAlt} />
        </div>
        <div className="absolute right-0 top-1/2 w-[45%] -translate-y-1/2 rotate-10 sm:right-[-10%] sm:w-[49%] sm:rotate-12 lg:right-0">
          <PhoneMockup
            src={feature.tertiaryImageSrc}
            alt={feature.tertiaryImageAlt}
            className="shadow-[0_0_40px_rgba(170,125,255,0.1)]"
          />
        </div>
      </div>
    );
  }

  if (feature.mockupLayout === "double" && feature.secondaryImageSrc) {
    return (
      <div className="relative h-[18rem] w-full max-w-[18rem] overflow-visible sm:h-[25rem] sm:max-w-[30rem] lg:h-[29rem] lg:max-w-[34rem]">
        <div className="absolute left-0 top-1/2 w-[45%] -translate-y-1/2 -rotate-8 sm:left-[-4%] sm:w-[49%] sm:-rotate-12 lg:left-0">
          <PhoneMockup
            src={feature.secondaryImageSrc}
            alt={feature.secondaryImageAlt}
            className="shadow-[0_0_45px_rgba(170,125,255,0.12)]"
          />
        </div>
        <div className="absolute right-0 top-1/2 z-20 w-[56%] -translate-y-1/2 rotate-5 sm:right-[-4%] sm:w-[60%] sm:rotate-[7deg] lg:right-0">
          <PhoneMockup src={feature.imageSrc} alt={feature.imageAlt} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[18rem] w-full max-w-[18rem] overflow-visible sm:h-[25rem] sm:max-w-[30rem] lg:h-[29rem] lg:max-w-[34rem]">
      <div className="absolute left-1/2 top-1/2 z-20 w-[56%] -translate-x-1/2 -translate-y-1/2 sm:w-[60%]">
        <PhoneMockup src={feature.imageSrc} alt={feature.imageAlt} />
      </div>
    </div>
  );
}

function FeatureBlock({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-20 py-24 sm:gap-16 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-36"
    >
      {/* Text - alternates side on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={index % 2 === 1 ? "lg:order-2" : ""}
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4">
          <Icon size={24} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          {feature.title}
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          {feature.description}
        </p>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`flex justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}
      >
        <FeatureMockups feature={feature} />
      </motion.div>
    </div>
  );
}

export default function FeaturesScrollSection() {
  return (
    <section id="features" className="mx-auto max-w-[88rem] scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="divide-y divide-divider">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
