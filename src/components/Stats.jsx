import { stats } from "../data/content";
import useCountUp from "../hooks/useCountUp";
import { RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";

function Stat({ value, decimals, label }) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <motion.div ref={ref} variants={revealItem} className="border-t border-line px-6 py-8 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0">
      <span className="font-display text-4xl text-brass sm:text-5xl">{display}</span>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ash">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 border-b border-line">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </RevealGroup>
    </section>
  );
}
