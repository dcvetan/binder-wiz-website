"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(170,125,255,0.15)_0%,_rgba(232,121,249,0.05)_40%,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            alt="BinderWiz logo"
            width={92}
            height={92}
            className="h-16 w-16 sm:h-20 sm:w-20"
            preload
          />
          <span className="text-2xl font-bold text-text-primary sm:text-3xl">
            BinderWiz
          </span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 bg-surface border border-card-border rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-text-secondary text-sm">
            Coming soon for iOS &amp; Android
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary max-w-4xl leading-tight"
        >
          The Pokémon TCG App That Does It All
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl"
        >
          Track card prices, build your portfolio, manage your binder with color
          matching, all in one place.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          href="#testing-phase-2"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-light"
        >
          Join the Testing Group
        </motion.a>

        {/* Phone Mockups */}
        <div className="mt-16 hidden items-end justify-center gap-2 sm:flex sm:gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden w-52 -rotate-6 sm:block lg:w-64 xl:w-72"
          >
            <PhoneMockup alt="Pokemon TCG App binder screen" src="/images/mockups/front-color-matching.png" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-60 lg:w-72 xl:w-80"
          >
            <PhoneMockup alt="Pokemon card prices portfolio" src="/images/mockups/front-portfolio.png" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden w-52 rotate-6 sm:block lg:w-64 xl:w-72"
          >
            <PhoneMockup alt="Pokemon card color matching feature" src="/images/mockups/front-pokedex.png" />
          </motion.div>
        </div>

        {/* SEO copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-text-muted text-sm"
        >
          Supports TCGPlayer, Cardmarket &amp; Ebay &middot; Graded Card
          Prices
        </motion.p>
      </div>

      <motion.a
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.9,
          y: { repeat: Infinity, repeatType: "reverse", duration: 0.9 },
        }}
        href="#features"
        aria-label="Scroll to features"
        className="absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-card-border bg-surface/80 text-text-secondary shadow-[0_0_32px_rgba(170,125,255,0.16)] backdrop-blur-sm transition-colors hover:text-text-primary sm:hidden"
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  );
}
