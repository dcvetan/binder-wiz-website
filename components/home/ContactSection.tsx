"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Apple,
  Bug,
  ExternalLink,
  MessageCircle,
  MessagesSquare,
  Smartphone,
  Sparkles,
} from "lucide-react";

const discordUrl = "https://discord.gg/vsFH4rbGJ";
const testFlightUrl = "https://testflight.apple.com/join/jFNV3P5q";
const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.binderwiz";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testing-phase-2"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-12 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(170,125,255,0.2)_0%,_transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-semibold text-primary-light">
            <Sparkles size={16} />
            Public testing is live
          </div>
          <h2 className="text-3xl font-bold text-text-primary sm:text-5xl">
            Test BinderWiz and help shape what comes next
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Install the app, try it with your collection, and tell us what works,
            what breaks, and what you want us to build next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 grid items-center gap-7 rounded-2xl border border-primary/55 bg-primary/15 p-6 shadow-[0_0_64px_rgba(170,125,255,0.16)] sm:p-8 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <MessageCircle size={25} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary">
              Join the BinderWiz Discord
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Discord is the main place for tester feedback. Report bugs, suggest
              improvements, share ideas, and talk directly with the BinderWiz
              team.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Bug, label: "Report bugs" },
                { icon: MessagesSquare, label: "Share feedback" },
                { icon: Sparkles, label: "Suggest features" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/45 px-3 py-1.5 text-sm font-medium text-text-secondary"
                >
                  <Icon size={15} className="text-primary-light" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <a
            href={discordUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-7 font-bold text-white shadow-[0_14px_36px_rgba(170,125,255,0.28)] transition-colors hover:bg-primary-light"
          >
            Join Discord
            <ExternalLink size={19} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-light">
              Choose your platform
            </p>
            <h3 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
              Install the BinderWiz test
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-card-border bg-surface/75 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card-bg text-primary-light">
                  <Apple size={25} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">iPhone</p>
                  <h4 className="text-xl font-bold text-text-primary">
                    Join through TestFlight
                  </h4>
                </div>
              </div>

              <ol className="mt-6 space-y-4 text-left text-text-secondary">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary-light">
                    1
                  </span>
                  <span className="pt-0.5">
                    Download <strong className="text-text-primary">TestFlight</strong>{" "}
                    from the Apple App Store.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary-light">
                    2
                  </span>
                  <span className="pt-0.5">
                    Open our invitation link and accept the BinderWiz test.
                  </span>
                </li>
              </ol>

              <a
                href={testFlightUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-5 font-semibold text-primary-light transition-colors hover:bg-primary/20"
              >
                Open TestFlight invitation
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex flex-col rounded-2xl border border-card-border bg-surface/75 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card-bg text-primary-light">
                  <Smartphone size={25} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Android</p>
                  <h4 className="text-xl font-bold text-text-primary">
                    Download from Google Play
                  </h4>
                </div>
              </div>

              <p className="mt-6 flex-1 text-left leading-relaxed text-text-secondary">
                Open the Google Play listing, install BinderWiz, and start
                testing. No additional testing app is required.
              </p>

              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-5 font-semibold text-primary-light transition-colors hover:bg-primary/20"
              >
                Open Google Play
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          Thank you for testing BinderWiz and helping us improve the app. We
          truly appreciate your time and feedback.
        </p>
      </div>
    </section>
  );
}
