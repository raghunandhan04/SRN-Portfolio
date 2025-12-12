import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren, memo } from "react";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal = memo(function Reveal({ children, delay = 0, y = 10, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  
  // Skip animations entirely if user prefers reduced motion
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "-50px" }}
      transition={{ 
        duration: 0.25, 
        ease: [0.25, 0.1, 0.25, 1], // Custom ease for snappy feel
        delay: Math.min(delay * 0.4, 0.3) // Cap max delay at 0.3s
      }}
    >
      {children}
    </motion.div>
  );
});
