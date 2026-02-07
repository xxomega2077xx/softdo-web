import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles } from 'lucide-react';

export const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const floatingTodos = [
    { text: "Review Q4 Report", done: true, delay: 0 },
    { text: "Team Sync at 2PM", done: false, delay: 0.2 },
    { text: "Design System Update", done: false, delay: 0.4 },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)]"
            >
              <Sparkles size={16} className="text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">{t('showcase.badge')}</span>
            </motion.div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-[var(--text-primary)]">
              {t('showcase.title')}
            </h2>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {t('showcase.description')}
            </p>

            {/* Animated Todo Preview */}
            <div className="space-y-3 pt-4">
              {floatingTodos.map((todo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + todo.delay }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[var(--border)] group hover:border-[var(--border-hover)] hover:shadow-sm transition-all duration-200 cursor-default"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.done
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : 'border-[var(--border-hover)] group-hover:border-[var(--text-muted)]'
                  }`}>
                    {todo.done && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`text-lg transition-colors ${todo.done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                    {todo.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Floating Widget Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image with float animation */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <img
                src="/widget-showcase.png"
                alt="SoftDo Widget"
                className="w-full rounded-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] border border-[var(--border)]"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
