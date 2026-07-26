import { useEffect, useRef } from "react";
import gsap from "gsap";
import { marqueeSkills } from "../data/content";

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || prefersReduced) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 26,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  const items = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl italic text-paper/70 sm:text-3xl"
          >
            {s}
            <span className="font-mono text-sm not-italic text-brass">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
