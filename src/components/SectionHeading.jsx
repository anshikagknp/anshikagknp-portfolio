import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeading({ no, label, lines, lede, align = "left" }) {
  return (
    <div className={`relative mb-14 sm:mb-20 ${align === "center" ? "text-center mx-auto max-w-3xl" : ""}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-x-hidden">
        <span
          className={`absolute top-[-0.35em] select-none font-display font-medium leading-none text-brass/10 ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-1 sm:-left-2"
          }`}
          style={{ fontSize: "clamp(7rem, 20vw, 15rem)" }}
        >
          {no}
        </span>
      </div>

      <div className="relative z-10">
        <Reveal className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="font-mono text-xs text-brass tracking-[0.2em]">{no}</span>
          <span className="h-px w-8 bg-line" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ash">{label}</span>
        </Reveal>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-h2 font-medium text-paper"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line.plain ? (
                line.plain
              ) : (
                <>
                  {line.pre}
                  <em className="italic text-brass">{line.em}</em>
                  {line.post}
                </>
              )}
            </span>
          ))}
        </motion.h2>

        {lede && (
          <Reveal delay={0.15} className={`mt-5 max-w-lg ${align === "center" ? "mx-auto" : ""}`}>
            <p className="text-lede text-ash">{lede}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
