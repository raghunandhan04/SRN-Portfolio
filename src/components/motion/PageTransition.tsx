import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface PageTransitionProps extends PropsWithChildren {
  routeKey: string;
}

export function PageTransition({ routeKey, children }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.2;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
