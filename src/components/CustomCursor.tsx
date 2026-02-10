import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core cursor - ultra responsive
  const coreConfig = { damping: 28, stiffness: 1200, mass: 0.08 };
  const coreXSpring = useSpring(cursorX, coreConfig);
  const coreYSpring = useSpring(cursorY, coreConfig);

  // Trail ring - softer follow with subtle lag
  const trailConfig = { damping: 20, stiffness: 200, mass: 0.3 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea'));
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, [isVisible]);

  return (
    <>
      {/* Trail ring - follows with delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 28,
            height: isHovering ? 48 : 28,
            opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border border-white/30 backdrop-blur-[2px]"
        />
      </motion.div>

      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: coreXSpring,
          y: coreYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovering ? 0.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Core */}
          <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.25)]" />
          {/* Subtle glow */}
          <div className="absolute inset-0 -m-0.5 rounded-full bg-white/15 blur-sm" />
        </motion.div>
      </motion.div>
    </>
  );
};
