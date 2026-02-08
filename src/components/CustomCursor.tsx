import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  // Ultra-responsive "1-to-1" tracking (High stiffness, low mass)
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
    <>
      {/* Warm Glossy Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
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
            scale: isHovering ? 2.5 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {/* Core - Warm White */}
          <div className="w-3 h-3 bg-[#FAF9F7] rounded-full shadow-[0_0_10px_2px_rgba(212,113,78,0.2)] backdrop-blur-sm" />
          
          {/* Warm Glow Halo */}
          <div className="absolute inset-0 -m-1 rounded-full bg-[#D4714E]/15 blur-md" />
        </motion.div>
      </motion.div>
    </>
  );
};
