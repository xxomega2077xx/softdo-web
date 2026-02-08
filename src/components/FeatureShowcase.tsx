import { useInView, motion } from 'framer-motion';
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
      className: "from-[#D4714E]/20 to-[#D9A962]/10",
      iconGlow: "group-hover:shadow-[0_0_25px_rgba(212,113,78,0.5)]",
      iconBg: "group-hover:bg-[#D4714E]/20",
      accentColor: "rgba(212, 113, 78, 0.5)",
    },
    {
      icon: <Layers size={24} />,
      title: t('features.glass'),
      description: t('features.glass_desc'),
      className: "from-[#D9A962]/20 to-[#D4714E]/10",
      iconGlow: "group-hover:shadow-[0_0_25px_rgba(217,169,98,0.5)]",
      iconBg: "group-hover:bg-[#D9A962]/20",
      accentColor: "rgba(217, 169, 98, 0.5)",
    },
    {
      icon: <Wifi size={24} className="rotate-45" />,
      title: t('features.privacy'),
      description: t('features.privacy_desc'),
      className: "from-[#E8956F]/20 to-[#D4714E]/10",
      iconGlow: "group-hover:shadow-[0_0_25px_rgba(232,149,111,0.5)]",
      iconBg: "group-hover:bg-[#E8956F]/20",
      accentColor: "rgba(232, 149, 111, 0.5)",
    }
  ];

  return (
    <section className="relative py-40 px-6">
      {/* Section Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#D4714E]/[0.06] to-[#D9A962]/[0.04] blur-[140px] rounded-full pointer-events-none animate-breathe" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <SectionHeading>
            {t('features.sectionTitle')} <br />
            <span className="text-gradient-warm">{t('features.sectionSubtitle')}</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <SpotlightCard className={feature.className} accentColor={feature.accentColor}>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-[#1C1917] border border-[rgba(255,247,237,0.08)] flex items-center justify-center mb-6 text-[#D6D3D1] transition-all duration-500 ${feature.iconGlow} ${feature.iconBg}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-medium mb-4 tracking-tight text-[#FAF9F7]">
                      {feature.title}
                    </h3>
                    <p className="text-[#A8A29E] leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
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
    <h2 ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]">
      <div className={`transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-10'} `}>
        {children}
      </div>
    </h2>
  );
};

const SpotlightCard = ({ children, className = "", accentColor }: { children: React.ReactNode, className?: string, accentColor?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full overflow-hidden rounded-3xl border border-[rgba(255,247,237,0.08)] bg-[#121110] p-8 transition-all duration-500 hover:border-[rgba(255,247,237,0.16)] group hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)]"
    >
      {/* Spotlight follow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212,113,78,0.04), transparent 40%)`,
        }}
      />
      {/* Color gradient follow */}
      <div
        className={`pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r ${className} blur-3xl`}
        style={{
           maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
           WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />
      {/* Top border accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${accentColor || 'rgba(212,113,78,0.3)'}, transparent)`,
        }}
      />
      {children}
    </div>
  );
};
