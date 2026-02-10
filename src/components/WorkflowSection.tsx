import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Edit3, CheckCircle2, Pin } from 'lucide-react';

export const WorkflowSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      id: 1,
      icon: <Edit3 size={26} />,
      title: t('workflow.step1'),
      desc: t('workflow.step1_desc'),
      delay: 0.15,
      color: 'from-indigo-500 to-violet-500',
      glow: 'rgba(99, 102, 241, 0.35)',
      accent: '#6366f1',
    },
    {
      id: 2,
      icon: <Pin size={26} />,
      title: t('workflow.step2'),
      desc: t('workflow.step2_desc'),
      delay: 0.35,
      color: 'from-violet-500 to-purple-500',
      glow: 'rgba(139, 92, 246, 0.35)',
      accent: '#8b5cf6',
    },
    {
      id: 3,
      icon: <CheckCircle2 size={26} />,
      title: t('workflow.step3'),
      desc: t('workflow.step3_desc'),
      delay: 0.55,
      color: 'from-purple-500 to-fuchsia-500',
      glow: 'rgba(168, 85, 247, 0.35)',
      accent: '#a855f7',
    }
  ];

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-600/[0.04] via-violet-600/[0.06] to-fuchsia-600/[0.04] blur-[140px] rounded-full pointer-events-none animate-breathe" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-5">{t('workflow.title')}</h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">Simple steps to stay organized</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Animated Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%]">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/40 to-fuchsia-500/30 origin-left"
            />
            {/* Pulsing dots on connector */}
            {[0, 50, 100].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400/50 animate-dot-pulse"
                style={{ left: `${pos}%`, animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: step.delay, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-10">
                 {/* Outer ring with animation */}
                 <motion.div
                   animate={isInView ? { scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                   transition={{ duration: 3, repeat: Infinity, delay: step.delay * 2 }}
                   className="absolute -inset-4 rounded-full border border-white/[0.05]"
                 />

                 <motion.div
                   whileHover={{ scale: 1.1, rotate: 5 }}
                   transition={{ type: "spring", stiffness: 300, damping: 15 }}
                   className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white z-10 relative group-hover:border-white/15 transition-all duration-600"
                 >
                    {step.icon}
                 </motion.div>

                 {/* Halo Glow */}
                 <div
                   className="absolute -inset-2 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-full"
                   style={{ background: step.glow }}
                 />

                 {/* Step number */}
                 <motion.div
                   whileHover={{ scale: 1.2 }}
                   className="absolute -top-1 -right-1 w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-xs font-semibold z-20"
                   style={{ background: step.accent, color: 'white', boxShadow: `0 0 15px ${step.glow}` }}
                 >
                   {step.id}
                 </motion.div>
              </div>

              <h3 className="text-xl font-medium mb-3 tracking-tight">{step.title}</h3>
              <p className="text-[var(--text-secondary)] max-w-xs text-[15px] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
