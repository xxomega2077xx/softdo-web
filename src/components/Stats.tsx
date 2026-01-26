import { useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const StatItem = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
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
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-7xl font-bold mb-2 tracking-tighter tabular-nums text-white">
        {displayValue}{suffix}
      </div>
      <div className="text-[var(--text-muted)] font-medium text-lg uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const Stats = () => {
  return (
    <section className="py-32 px-6 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <StatItem value={10} label="Downloads" suffix="+" />
        <StatItem value={3} label="Countries" suffix="+" />
        <StatItem value={3} label="Win · macOS · Ubuntu" suffix="" />
      </div>
    </section>
  );
};
