import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Edit3, CheckCircle2, Pin } from 'lucide-react'; // Using icons as visual anchors

export const WorkflowSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      id: 1,
      icon: <Edit3 size={32} />,
      title: t('workflow.step1'),
      desc: t('workflow.step1_desc'),
      delay: 0.1
    },
    {
      id: 2,
      icon: <Pin size={32} />,
      title: t('workflow.step2'),
      desc: t('workflow.step2_desc'),
      delay: 0.3
    },
    {
      id: 3,
      icon: <CheckCircle2 size={32} />,
      title: t('workflow.step3'),
      desc: t('workflow.step3_desc'),
      delay: 0.5
    }
  ];

  return (
    <section ref={ref} className="relative py-40 px-6 border-b border-[var(--border)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-cyan-600/10 via-violet-600/5 to-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">{t('workflow.title')}</h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: step.delay }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                 <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white z-10 relative group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                 </div>
                 {/* Halo Glow */}
                 <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-full" />
              </div>
              
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
