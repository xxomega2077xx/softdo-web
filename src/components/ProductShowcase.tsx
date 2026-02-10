import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles } from 'lucide-react';

export const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useTranslation();

  const floatingTodos = [
    { text: "Review Q4 Report", done: true, delay: 0 },
    { text: "Team Sync at 2PM", done: false, delay: 0.15 },
    { text: "Design System Update", done: false, delay: 0.3 },
  ];

  return (
    <section ref={ref} className="relative py-36 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/[0.07] to-transparent rounded-full blur-[140px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-600/[0.06] to-transparent rounded-full blur-[120px] animate-orb-float-2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
            >
              <Sparkles size={15} className="text-amber-400" />
              <span className="text-sm text-white/75 font-medium">{t('showcase.badge')}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]">
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
                  initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + todo.delay, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm group hover:border-white/[0.12] transition-all duration-400 cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-400 ${
                    todo.done
                      ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'border-white/25 group-hover:border-white/45'
                  }`}>
                    {todo.done && <Check size={12} className="text-white" />}
                  </motion.div>
                  <span className={`text-lg transition-all duration-300 ${todo.done ? 'text-white/35 line-through' : 'text-white/85 group-hover:text-white'}`}>
                    {todo.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Floating Widget Image */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Multi-layered glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-500/[0.06] blur-[120px] rounded-full animate-breathe" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-violet-500/[0.05] blur-[80px] rounded-full" />

            {/* Main Image with float animation */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7),0_0_50px_-10px_rgba(99,102,241,0.1)]">
                <img
                  src="/widget-showcase.png"
                  alt="SoftDo Widget"
                  className="w-full"
                />
                {/* Glass overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02]" />
              </div>

              {/* Reflection line on top */}
              <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Decorative glow orbs */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-3xl animate-pulse-glow" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
