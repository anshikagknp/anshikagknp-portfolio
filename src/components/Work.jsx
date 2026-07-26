import { projects } from "../data/content";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        no="03"
        label="Selected work"
        lines={[{ plain: "Built end to" }, { pre: "", em: "end.", post: "" }]}
        lede="Built to learn, shipped to prove it."
      />

      <div className="flex flex-col gap-24 sm:gap-32">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
