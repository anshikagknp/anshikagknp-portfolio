import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useCountUp from "../hooks/useCountUp";
import Reveal from "./Reveal";

function StatBlock({ stat }) {
  if (stat.literal) {
    return (
      <div>
        <span className="font-display text-xl text-brass sm:text-2xl">{stat.literal}</span>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">{stat.label}</p>
      </div>
    );
  }
  const { ref, display } = useCountUp(stat.value, 0, 1.4);
  return (
    <div ref={ref}>
      <span className="font-display text-xl text-brass sm:text-2xl">
        {display}
        {stat.suffix || ""}
      </span>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">{stat.label}</p>
    </div>
  );
}

export default function ProjectCard({ project, reverse }) {
  const cardRef = useRef(null);
  const hasHover = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e) => {
    if (!hasHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal
      as="article"
      className={`grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink-2"
      >
        <span className="absolute left-5 top-5 font-mono text-xs text-ash">{project.index}</span>
        <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">
          {project.year}
        </span>
        <div className="pointer-events-none px-8 text-center font-display text-3xl italic text-paper/15 sm:text-4xl">
          {project.title.split(" — ")[0]}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ash">{project.tag}</p>
        <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">{project.title}</h3>
        <p className="mt-3 max-w-lg text-sm text-ash sm:text-base">{project.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
          {project.stats.map((s, i) => (
            <StatBlock key={i} stat={s} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-ink"
          >
            {project.liveLabel} ↗
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-paper hover:border-brass hover:text-brass"
          >
            Source ↗
          </a>
        </div>
      </div>
    </Reveal>
  );
}
