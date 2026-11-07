import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/**
 * Hero headline: "WELCOME TO MY" + "PORTFOLIO." in large italic serif,
 * revealed character-by-character with a soft upward movement.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const word = 'PORTFOLIO.';

  return (
    <div className="pointer-events-none relative z-10 flex select-none flex-col items-center justify-center text-center">
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-ink/70 sm:text-xs"
      >
        Welcome to my
      </motion.p>

      <h1
        aria-label="Portfolio."
        className="font-serif italic font-medium leading-[0.9] text-ink text-[clamp(3.4rem,12vw,9.5rem)]"
      >
        {word.split('').map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, y: '0.35em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { delay: 0.75 + i * 0.055, type: 'spring', stiffness: 220, damping: 24 }
            }
            className="inline-block will-change-transform"
          >
            {ch}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50 sm:text-xs"
      >
        Omkar Gadge &mdash; UI/UX &amp; Product Designer
      </motion.p>
    </div>
  );
}
