import { useEffect, useState } from "react";
import useLenis from "./hooks/useLenis";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import About from "./components/About";
import Stack from "./components/Stack";
import Work from "./components/Work";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={loaded ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Stack />
        <Work />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
