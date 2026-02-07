import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Edit3, CheckCircle2, Pin } from 'lucide-react';

export const WorkflowSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      id: 1,
      icon: <Edit3 size={28} />,
      title: t('workflow.step1'),
      desc: t('workflow.step1_desc'),
      delay: 0.1,
      color: 'from-indigo-500 to-violet-500',
      glow: 'rgba(99, 102, 241, 0.4)',
    },
    {
      id: 2,
      icon: <Pin size={28} />,
      title: t('workflow.step2'),
      desc: t('workflow.step2_desc'),
      delay: 0.3,
      color: 'from-violet-500 to-purple-500',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    {
      id: 3,
      icon: <CheckCircle2 size={28} />,
      title: t('workflow.step3'),
      desc: t('workflow.step3_desc'),
      delay: 0.5,
      color: 'from-purple-500 to-fuchsia-500',
      glow: 'rgba(168, 85, 247, 0.4)',
    }
  ];

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-600/[0.06] via-violet-600/[0.08] to-fuchsia-600/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{t('workflow.title')}</h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">Simple steps to stay organized</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Animated Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gradient-to-r from-indigo-500/40 via-violet-500/50 to-fuchsia-500/40 origin-left"
            />
            {/* Pulsing dots on connector */}
            {[0, 50, 100].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400/60 animate-dot-pulse"
                style={{ left: `${pos}%`, animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: step.delay }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                 {/* Outer ring */}
                 <div className="absolute -inset-3 rounded-full border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500" />

                 <motion.div
                   whileHover={{ scale: 1.1 }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white z-10 relative group-hover:border-white/20 transition-all duration-500"
                 >
                    {step.icon}
                 </motion.div>

                 {/* Halo Glow */}
                 <div
                   className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-full"
                   style={{ background: step.glow }}
                 />

                 {/* Step number */}
                 <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--bg-primary)] border border-white/10 flex items-center justify-center text-xs font-medium text-white/50 z-20">
                   {step.id}
                 </div>
              </div>

              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-[var(--text-secondary)] max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
