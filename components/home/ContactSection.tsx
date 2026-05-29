"use client";

import { FormEvent, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

const signupEndpoint = "/api/signup";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) throw new Error("Signup failed");

      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="testing-phase-2"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-10 sm:py-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(170,125,255,0.2)_0%,_transparent_62%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-primary/35 bg-surface/80 p-6 text-center shadow-[0_0_70px_rgba(170,125,255,0.18)] backdrop-blur sm:p-10 lg:p-12"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-4 py-2 text-sm font-semibold text-primary-light">
            <Sparkles size={16} />
            Testing Phase 2 opens soon
          </div>

          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold text-text-primary sm:text-5xl">
            Get early access to BinderWiz
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-text-secondary sm:text-xl">
            Join the next test group, try the app before launch, and help shape
            the collection tools collectors will use every day.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {["Early app access", "Direct feedback", "Limited invites"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-card-border bg-card-bg/80 px-4 py-2 text-sm font-medium text-text-secondary"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="testing-email">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                id="testing-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-h-14 w-full rounded-2xl border border-card-border bg-background/60 px-12 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 font-bold text-white shadow-[0_14px_36px_rgba(170,125,255,0.28)] transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Joining..." : "Join the Test Group"}
              <ArrowRight size={20} />
            </button>
          </motion.form>

          {status === "sent" && (
            <p className="mt-4 text-sm font-medium text-primary-light">
              You are on the testing waitlist.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm font-medium text-secondary">
              Something went wrong. Please try again in a moment.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
