import { useInView, useSpring, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const StatItem = ({ value, label, suffix = '', delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center group relative py-8"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.04] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

      <div className="relative">
        <div
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter tabular-nums"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayValue}{suffix}
        </div>
        <div className="text-[var(--text-muted)] font-medium text-sm uppercase tracking-[0.25em]">{label}</div>
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section className="relative py-36 px-6">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          <div className="flex-1"><StatItem value={10} label="Downloads" suffix="+" delay={0} /></div>
          <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          <div className="flex-1"><StatItem value={3} label="Countries" suffix="+" delay={0.15} /></div>
          <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          <div className="flex-1"><StatItem value={3} label="Win · macOS · Ubuntu" suffix="" delay={0.3} /></div>
        </div>
      </div>
    </section>
  );
};
