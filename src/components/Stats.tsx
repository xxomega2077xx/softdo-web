import { useInView, useSpring, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const StatItem = ({ value, label, suffix = '', delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="text-center group relative"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.05] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

      <div className="relative">
        <div className="text-5xl md:text-7xl font-bold mb-3 tracking-tighter tabular-nums bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          {displayValue}{suffix}
        </div>
        <div className="text-[var(--text-muted)] font-medium text-sm uppercase tracking-[0.2em]">{label}</div>
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <StatItem value={10} label="Downloads" suffix="+" delay={0} />
          <StatItem value={3} label="Countries" suffix="+" delay={0.15} />
          <StatItem value={3} label="Win · macOS · Ubuntu" suffix="" delay={0.3} />
        </div>
      </div>
    </section>
  );
};
