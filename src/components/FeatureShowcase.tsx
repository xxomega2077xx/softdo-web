import { useInView } from 'framer-motion';
import { Pin, Layers, Wifi } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FeatureShowcase = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Pin size={24} />,
      title: t('features.pin'),
      description: t('features.pin_desc'),
      // Subtle purple glow
      className: "from-violet-500/20 to-fuchsia-500/10",
      iconGlow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
    },
    {
      icon: <Layers size={24} />,
      title: t('features.glass'),
      description: t('features.glass_desc'),
      // Subtle cyan glow
      className: "from-cyan-500/20 to-blue-500/10",
      iconGlow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
    },
    {
      icon: <Wifi size={24} className="rotate-45" />,
      title: t('features.privacy'),
      description: t('features.privacy_desc'),
      // Subtle green glow (for "offline/safe")
      className: "from-emerald-500/20 to-teal-500/10",
      iconGlow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
    }
  ];

  return (
    <section className="relative py-40 px-6">
      {/* Section Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-violet-600/10 to-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <SectionHeading>
            {t('features.sectionTitle')} <br />
            <span className="text-[var(--text-muted)]">{t('features.sectionSubtitle')}</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <SpotlightCard key={idx} className={feature.className}>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center mb-6 text-white transition-shadow duration-500 ${feature.iconGlow}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-medium mb-4 tracking-tight text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
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
    <h2 ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]">
      <div className={`transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-10'} `}>
        {children}
      </div>
    </h2>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 transition-colors duration-300 hover:border-[var(--border-hover)] group`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div
        className={`pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-r ${className} blur-3xl`}
        style={{
           maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
           WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />
      {children}
    </div>
  );
};
