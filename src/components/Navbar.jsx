import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, email } from "../data/content";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[65] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "backdrop-blur-md bg-ink/70 border-b border-line" : ""
          }`}
        >
          <a href="#top" className="font-display text-lg font-medium text-paper">
            AG<span className="text-brass">·</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-line/70 bg-ink-2/60 p-1">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.12em] rounded-full transition-colors duration-300 ${
                  active === item.id ? "text-ink" : "text-ash hover:text-paper"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-brass"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="hidden sm:inline-flex items-center rounded-full border border-line px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-paper hover:border-brass hover:text-brass transition-colors"
            >
              Say hello
            </a>
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-[75] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line md:hidden"
            >
              <span
                className={`h-px w-4 bg-paper transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-paper transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} active={active} />}
      </AnimatePresence>
    </>
  );
}
