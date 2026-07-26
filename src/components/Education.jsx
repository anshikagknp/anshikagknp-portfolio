import { education } from "../data/content";
import SectionHeading from "./SectionHeading";
import { RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        no="04"
        label="Education"
        lines={[{ plain: "Four campuses," }, { pre: "", em: "one thread.", post: "" }]}
        lede="Inter-disciplinary exposure, start to present."
      />

      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {education.map((edu) => (
          <motion.article
            key={edu.title}
            variants={revealItem}
            className="group overflow-hidden rounded-2xl border border-line bg-ink-2"
          >
            <div className="relative h-44 overflow-hidden sm:h-52">
              <img
                src={edu.img}
                alt={`${edu.title} campus`}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <span className="font-mono text-xs text-brass">{edu.date}</span>
              <h3 className="mt-1.5 font-display text-lg text-paper sm:text-xl">{edu.title}</h3>
              <p className="mt-1 text-sm text-ash">{edu.course}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.grades.map((g) => (
                  <span
                    key={g}
                    className="inline-block rounded-full border border-line px-3 py-1 font-mono text-[11px] text-signal-soft"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </section>
  );
}
