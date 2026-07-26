import { stack } from "../data/content";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

const groupVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function StackGroup({ group, index }) {
  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden bg-ink-2 p-6 sm:p-7"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] bg-brass"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">{group.group}</span>
        <span className="font-mono text-[10px] text-ash/60">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <motion.span
            key={item}
            variants={tagVariants}
            whileHover={{
              scale: 1.08,
              y: -2,
              borderColor: "var(--color-signal)",
              color: "var(--color-signal-soft)",
              transition: { duration: 0.2 },
            }}
            className="cursor-default rounded-full border border-line px-3 py-1 text-xs text-paper/85 transition-colors"
          >
            {item}
          </motion.span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-ash/50">
        <span className="h-1 w-1 rounded-full bg-signal/60" />
        {group.items.length} {group.items.length === 1 ? "tool" : "tools"}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        no="02"
        label="Stack"
        lines={[{ plain: "Tools in" }, { pre: "", em: "active rotation.", post: "" }]}
        lede="Languages, frameworks and the rest of the current toolkit."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <StackGroup key={group.group} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
