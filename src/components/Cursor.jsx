import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(hasHover);
    if (!hasHover) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    let raf;
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.add("scale-[1.8]", "border-brass");
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.remove("scale-[1.8]", "border-brass");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[80] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-brass"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[80] h-8 w-8 -ml-4 -mt-4 rounded-full border border-paper/30 transition-transform duration-200 ease-out"
      />
    </>
  );
}
