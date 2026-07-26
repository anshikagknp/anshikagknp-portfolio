import { motion } from "framer-motion";
import { nav, email, socials } from "../data/content";

export default function MobileMenu({ onClose, active }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink px-6 pt-24 pb-10 md:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <nav className="flex flex-col gap-1">
        {nav.map((item, i) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            onClick={onClose}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl xs:text-4xl ${
              active === item.id ? "text-brass" : "text-paper"
            }`}
          >
            <span className="font-mono text-xs text-ash">{item.no}</span>
            {item.label}
          </motion.a>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col gap-4 font-mono text-sm"
      >
        <a href={`mailto:${email}`} className="text-paper">
          {email}
        </a>
        <div className="flex gap-5 text-ash">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
