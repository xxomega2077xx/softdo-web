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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-[120px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-gradient-to-br from-violet-600/8 to-transparent rounded-full blur-[100px] animate-orb-float-2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-sm text-white/80">{t('showcase.badge')}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
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
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm group hover:border-white/15 transition-all duration-300 cursor-default"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.done
                      ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]'
                      : 'border-white/30 group-hover:border-white/50'
                  }`}>
                    {todo.done && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`text-lg transition-colors ${todo.done ? 'text-white/40 line-through' : 'text-white group-hover:text-white'}`}>
                    {todo.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Floating Widget Image */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Multi-layered glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-500/[0.08] blur-[100px] rounded-full animate-pulse-glow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-violet-500/[0.06] blur-[60px] rounded-full" />

            {/* Main Image with float animation */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <img
                src="/widget-showcase.png"
                alt="SoftDo Widget"
                className="w-full rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_-10px_rgba(99,102,241,0.15)]"
              />

              {/* Reflection line on top */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Decorative glow orbs */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/25 to-cyan-500/15 blur-2xl animate-pulse-glow" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/15 blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
