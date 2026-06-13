import { motion, useReducedMotion } from 'motion/react';

interface AnimatedBookCoverProps {
  coverUrl: string;
}

export default function AnimatedBookCover({ coverUrl }: AnimatedBookCoverProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="animated-cover-shell" aria-label="Book cover preview">
      <motion.div
        className="animated-cover-book"
        initial={reducedMotion ? false : { opacity: 0, y: 24, rotateY: -8, scale: 0.96 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateY: -3, scale: 1 }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -8,
                rotateY: -1,
                rotateX: 2,
                scale: 1.02,
              }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 90, damping: 18, mass: 0.8 }
        }
      >
        <img
          src={coverUrl}
          alt="Classic animated cover of Using Data to Drive Business Performance"
          className="animated-cover-img"
          width={709}
          height={984}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
}
