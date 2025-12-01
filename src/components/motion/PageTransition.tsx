import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface PageTransitionProps extends PropsWithChildren {
  routeKey: string;
}

export function PageTransition({ routeKey, children }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.35;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
        transition={{ duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
