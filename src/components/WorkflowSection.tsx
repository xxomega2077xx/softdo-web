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
    },
    {
      id: 2,
      icon: <Pin size={28} />,
      title: t('workflow.step2'),
      desc: t('workflow.step2_desc'),
      delay: 0.3,
    },
    {
      id: 3,
      icon: <CheckCircle2 size={28} />,
      title: t('workflow.step3'),
      desc: t('workflow.step3_desc'),
      delay: 0.5,
    }
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4 text-[var(--text-primary)]">{t('workflow.title')}</h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">Simple steps to stay organized</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[var(--border)] origin-left"
            />
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: step.delay }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   className="w-24 h-24 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] z-10 relative group-hover:border-[var(--border-hover)] group-hover:text-[var(--accent)] transition-all duration-300 shadow-sm"
                 >
                    {step.icon}
                 </motion.div>

                 {/* Step number */}
                 <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-xs font-medium text-[var(--text-muted)] z-20">
                   {step.id}
                 </div>
              </div>

              <h3 className="font-serif text-xl font-medium mb-3 text-[var(--text-primary)]">{step.title}</h3>
              <p className="text-[var(--text-secondary)] max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
