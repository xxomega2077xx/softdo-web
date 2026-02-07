import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea'));
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* Core — warm terracotta dot */}
        <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full opacity-80" />
        {/* Soft halo */}
        <div className="absolute inset-0 -m-0.5 rounded-full bg-[var(--accent)] opacity-20 blur-sm" />
      </motion.div>
    </motion.div>
  );
};
