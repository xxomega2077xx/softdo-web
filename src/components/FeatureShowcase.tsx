import { useInView, motion } from 'framer-motion';
import { Pin, Layers, Wifi } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const FeatureShowcase = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Pin size={24} />,
      title: t('features.pin'),
      description: t('features.pin_desc'),
      accentBg: "bg-orange-50",
      accentText: "text-[var(--accent)]",
    },
    {
      icon: <Layers size={24} />,
      title: t('features.glass'),
      description: t('features.glass_desc'),
      accentBg: "bg-blue-50",
      accentText: "text-blue-600",
    },
    {
      icon: <Wifi size={24} className="rotate-45" />,
      title: t('features.privacy'),
      description: t('features.privacy_desc'),
      accentBg: "bg-emerald-50",
      accentText: "text-emerald-600",
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <SectionHeading>
            {t('features.sectionTitle')} <br />
            <span className="text-[var(--text-muted)]">{t('features.sectionSubtitle')}</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-8 transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feature.accentBg} flex items-center justify-center mb-6 ${feature.accentText} transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-3 tracking-tight text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <h2 ref={ref} className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
      <div className={`transition-all duration-700 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {children}
      </div>
    </h2>
  );
};
