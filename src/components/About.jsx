import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "../data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        no="01"
        label="About"
        lines={[{ plain: "Political science to" }, { pre: "", em: "production code.", post: "" }]}
        lede="Two degrees in political science, a UGC-NET qualification, and a full pivot into computer applications — here's the timeline."
      />

      <div ref={railRef} className="relative pl-8 sm:pl-14">
        <div className="absolute left-1.5 top-1 bottom-1 w-px bg-line sm:left-[26px]">
          <motion.div style={{ height: fillHeight }} className="w-px bg-brass" />
        </div>

        <ol className="flex flex-col gap-10 sm:gap-14">
          {timeline.map((entry, i) => (
            <Reveal as="li" key={i} delay={i * 0.04} className="relative">
              <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-paper sm:-left-[37px]" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="font-mono text-xs text-brass">{entry.date}</span>
                <h3 className="font-display text-lg text-paper sm:text-xl">{entry.title}</h3>
              </div>
              <p className="mt-1.5 max-w-lg text-sm text-ash">{entry.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
