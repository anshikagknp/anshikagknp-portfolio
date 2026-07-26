import { motion } from "framer-motion";

/**
 * Single, consistent reveal used site-wide for paragraphs, labels and
 * blocks of any size: one clean fade + upward drift, triggered once
 * when the element enters view. Deliberately NOT a per-character /
 * per-word split effect — that pattern is what produced the ghosting
 * bug on small subheadings in the previous build.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  y = 18,
  className = "",
  once = true,
  amount = 0.3,
  ...rest
}) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, className = "", stagger = 0.08, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ staggerChildren: stagger }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
