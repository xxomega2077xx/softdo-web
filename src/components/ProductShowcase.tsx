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
    <section ref={ref} className="relative py-36 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Warm ambient orbs */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-gradient-to-br from-[#D4714E]/[0.08] to-transparent rounded-full blur-[140px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[380px] h-[380px] bg-gradient-to-br from-[#D9A962]/[0.06] to-transparent rounded-full blur-[120px] animate-orb-float-2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4714E]/[0.08] border border-[#D4714E]/20 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-[#D9A962]" />
              <span className="text-sm text-[#D6D3D1]">{t('showcase.badge')}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gradient-hero">
              {t('showcase.title')}
            </h2>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {t('showcase.description')}
            </p>

            {/* Animated Todo Preview */}
            <div className="space-y-3 pt-2">
              {floatingTodos.map((todo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + todo.delay }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(212,113,78,0.06)' }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#1C1917]/60 border border-[rgba(255,247,237,0.08)] backdrop-blur-sm group hover:border-[#D4714E]/20 transition-all duration-300 cursor-default"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.done
                      ? 'bg-[#D4714E] border-[#D4714E] shadow-[0_0_12px_rgba(212,113,78,0.4)]'
                      : 'border-[#57534E] group-hover:border-[#E8956F]'
                  }`}>
                    {todo.done && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`text-lg transition-colors ${todo.done ? 'text-[#57534E] line-through' : 'text-[#D6D3D1] group-hover:text-[#FAF9F7]'}`}>
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
            {/* Multi-layered warm glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#D4714E]/[0.06] blur-[120px] rounded-full animate-pulse-glow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#D9A962]/[0.04] blur-[80px] rounded-full" />

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
                className="w-full rounded-2xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.7),0_0_50px_-10px_rgba(212,113,78,0.1)]"
              />

              {/* Reflection line on top */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#E8956F]/30 to-transparent" />

              {/* Decorative warm glow orbs */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#D4714E]/20 to-[#D9A962]/10 blur-2xl animate-pulse-glow" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#D9A962]/15 to-[#D4714E]/10 blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
