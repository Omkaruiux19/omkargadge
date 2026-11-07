import { useReducedMotion } from 'framer-motion';

/** Spring transitions tuned for a macOS-like feel. */
export const spring = {
  gentle: { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const,
  snappy: { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 } as const,
  windowOpen: { type: 'spring', stiffness: 300, damping: 28, mass: 1 } as const,
  dock: { type: 'spring', stiffness: 400, damping: 30 } as const,
};

/** Returns transform props that collapse to instant when reduced motion is requested. */
export function useMotionPrefs() {
  const reduce = useReducedMotion();
  return {
    reduce,
    duration: reduce ? 0 : undefined,
  };
}
