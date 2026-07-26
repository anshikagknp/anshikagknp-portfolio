import { useState } from "react";
import { email, socials } from "../data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — the mailto link still works either way
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
      <SectionHeading
        no="06"
        label="Contact"
        lines={[{ pre: "Let's build ", em: "something.", post: "" }]}
        lede="Open to collaboration and SDE internships. Let's connect."
      />

      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center gap-3 border-b border-line pb-4">
          <a
            href={`mailto:${email}`}
            data-cursor-hover
            className="font-display text-2xl text-paper transition-colors hover:text-brass sm:text-4xl"
          >
            {email}
          </a>
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            data-cursor-hover
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-brass hover:text-brass"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
        <span className="mt-2 block font-mono text-xs text-signal-soft">
          {copied ? "Copied to clipboard" : "Click the address to email me directly"}
        </span>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 flex gap-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-ash transition-colors hover:text-paper"
          >
            {s.label}
            <span aria-hidden>↗</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
