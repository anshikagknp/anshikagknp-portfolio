import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const HeroGraph = lazy(() => import("./HeroGraph"));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const line = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden pt-28 sm:pt-32">
      {/* faint index grid, blueprint feel — not an ambient color wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
        <div>
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display font-medium text-hero text-paper"
            aria-label="Anshika Gupta"
          >
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                Anshika
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block text-brass">
                Gupta
              </motion.span>
            </span>
          </motion.h1>

          <Reveal delay={0.55} className="mt-7 sm:mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal-soft sm:text-sm">
              Software Engineer — Backend — Data Analysis &amp; AI
            </p>
          </Reveal>

          <Reveal delay={0.65} className="mt-4 max-w-md">
            <p className="text-lede text-ash">
              I build full-stack apps with Java &amp; Spring backends, JS frontends, and
              Python-powered data pipelines — currently looking for an SDE internship
              to put that in production.
            </p>
          </Reveal>

          <Reveal delay={0.75} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5"
            >
              See the work
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="mailto:anshikagknp@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:border-brass hover:text-brass"
            >
              Get in touch
            </a>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[220px] sm:h-[300px] lg:h-[420px]"
        >
          <Suspense fallback={<div className="h-full w-full" />}>
            <HeroGraph />
          </Suspense>
        </motion.div>
      </div>

      <Reveal delay={1} className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Scroll</span>
        <motion.svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M5 1v13M1 10l4 4 4-4" stroke="var(--color-ash)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </Reveal>
    </section>
  );
}
