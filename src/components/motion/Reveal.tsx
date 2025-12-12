import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, y = 12 }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.3;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, ease: "easeOut", delay: delay * 0.5 }}
    >
      {children}
    </motion.div>
  );
}
