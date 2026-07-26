# Anshika Gupta — Portfolio

A React + Vite portfolio built with Framer Motion, GSAP and Three.js.

## Stack

- **React 19 + Vite** — component structure, fast dev/build
- **Tailwind CSS v4** — design tokens (colors, type, layout) defined once in `src/index.css`
- **Framer Motion** — scroll reveals, the nav's active-tab pill, the timeline fill, the certifications carousel
- **GSAP** — the infinite skills marquee, wired to `ScrollTrigger` via Lenis
- **Lenis** — smooth-scroll, ticked through `gsap.ticker` so it stays in sync with ScrollTrigger
- **Three.js** — the hero's signature visual: a node graph literally connecting a "Pol. Sci." node to a "Prod. Code" node, lazy-loaded so it doesn't block the first paint

All content (bio, timeline, stack, projects, education, certifications) lives in one place: `src/data/content.js`. Edit that file to update the site — no need to touch components for text/data changes.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  data/content.js       # single source of truth for all site copy/data
  hooks/
    useLenis.js          # smooth scroll setup
    useCountUp.js         # animated number counters
  components/
    Navbar.jsx / MobileMenu.jsx
    Hero.jsx / HeroGraph.jsx   # Three.js signature visual
    Marquee.jsx
    Stats.jsx
    About.jsx            # scroll-linked timeline
    Stack.jsx
    Work.jsx / ProjectCard.jsx
    Education.jsx
    Certifications.jsx
    Contact.jsx
    Footer.jsx
    Reveal.jsx / SectionHeading.jsx   # shared animation/layout primitives
```

## Notes for extending

- Add a project: append an object to the `projects` array in `content.js`.
- Add a stack group or certification: same pattern in `content.js`.
- Respect `prefers-reduced-motion`: the Three.js graph, Lenis, and marquee already check this and fall back to a static render — keep that pattern for any new motion you add.
- The color/type tokens are defined once in `src/index.css` under `@theme`; every `bg-*`/`text-*` class in components reads from those, so a rebrand is a one-file change.
