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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      className="text-center group relative"
    >
      <div className="relative">
        <div className="font-serif text-5xl md:text-7xl font-medium mb-3 tracking-tight tabular-nums text-[var(--text-primary)]">
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
