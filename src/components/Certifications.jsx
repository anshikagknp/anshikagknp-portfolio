import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certifications } from "../data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta) => {
    setDir(delta);
    setIndex((i) => (i + delta + certifications.length) % certifications.length);
  };

  const cert = certifications[index];

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        no="05"
        label="Certifications"
        lines={[{ plain: "Proof," }, { pre: "", em: "on file.", post: "" }]}
        lede="Completed and in progress, along the way."
      />

      <Reveal className="mx-auto max-w-xl">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 px-8 py-14 text-center sm:px-12">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${
                  cert.status === "In progress"
                    ? "border-signal text-signal-soft"
                    : "border-brass text-brass-soft"
                }`}
              >
                {cert.status}
              </span>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-ash">{cert.badge}</p>
              <h3 className="mt-3 font-display text-2xl text-paper sm:text-3xl">{cert.title}</h3>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous certificate"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-brass hover:text-brass"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex gap-2">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to certificate ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-brass" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next certificate"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-brass hover:text-brass"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
