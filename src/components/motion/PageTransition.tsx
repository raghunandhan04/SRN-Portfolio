import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren, memo } from "react";

interface PageTransitionProps extends PropsWithChildren {
  routeKey: string;
}

export const PageTransition = memo(function PageTransition({ routeKey, children }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  
  // Skip animations for reduced motion preference
  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});
