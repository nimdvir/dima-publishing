import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ReaderEntryCoverRotatorProps {
  classicUrl: string;
  goldUrl: string;
  autoRotateMs?: number;
}

export default function ReaderEntryCoverRotator({
  classicUrl,
  goldUrl,
  autoRotateMs = 4800,
}: ReaderEntryCoverRotatorProps) {
  const reducedMotion = useReducedMotion();
  const [showClassic, setShowClassic] = useState(true);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      setShowClassic(current => !current);
    }, autoRotateMs);
    return () => window.clearInterval(interval);
  }, [autoRotateMs, reducedMotion]);

  return (
    <div className="reader-entry-cover-stage">
      <motion.img
        src={classicUrl}
        alt=""
        aria-hidden="true"
        className="reader-entry-cover-img"
        initial={false}
        animate={{ opacity: showClassic ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeInOut' }}
      />
      <motion.img
        src={goldUrl}
        alt=""
        aria-hidden="true"
        className="reader-entry-cover-img"
        initial={false}
        animate={{ opacity: showClassic ? 0 : 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeInOut' }}
      />
    </div>
  );
}