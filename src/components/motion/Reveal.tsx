import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, y = 16 }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
