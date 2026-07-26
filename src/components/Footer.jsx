export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-5 py-8 font-mono text-xs text-ash sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span>© {year} Anshika Gupta</span>
      <span>designed &amp; built with React · Vite · Framer Motion · GSAP · Three.js</span>
    </footer>
  );
}
