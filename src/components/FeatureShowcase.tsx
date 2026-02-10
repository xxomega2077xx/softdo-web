import { useInView, motion } from 'framer-motion';
import { Pin, Layers, Wifi } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const FeatureShowcase = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Pin size={24} />,
      title: t('features.pin'),
      description: t('features.pin_desc'),
      gradient: "from-violet-500/20 to-fuchsia-500/10",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
      iconBg: "group-hover:bg-violet-500/20",
      accentColor: "rgba(139, 92, 246, 0.5)",
      borderAccent: "rgba(139, 92, 246, 0.3)",
    },
    {
      icon: <Layers size={24} />,
      title: t('features.glass'),
      description: t('features.glass_desc'),
      gradient: "from-cyan-500/20 to-blue-500/10",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
      iconBg: "group-hover:bg-cyan-500/20",
      accentColor: "rgba(34, 211, 238, 0.5)",
      borderAccent: "rgba(34, 211, 238, 0.3)",
    },
    {
      icon: <Wifi size={24} className="rotate-45" />,
      title: t('features.privacy'),
      description: t('features.privacy_desc'),
      gradient: "from-emerald-500/20 to-teal-500/10",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]",
      iconBg: "group-hover:bg-emerald-500/20",
      accentColor: "rgba(16, 185, 129, 0.5)",
      borderAccent: "rgba(16, 185, 129, 0.3)",
    }
  ];

  return (
    <section className="relative py-40 px-6">
      {/* Section Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-violet-600/[0.06] to-cyan-600/[0.04] blur-[140px] rounded-full pointer-events-none animate-breathe" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-28 text-center">
          <SectionHeading>
            {t('features.sectionTitle')} <br />
            <span className="text-[var(--text-muted)]">{t('features.sectionSubtitle')}</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard gradient={feature.gradient} accentColor={feature.accentColor} borderAccent={feature.borderAccent}>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center mb-7 text-white/90 transition-all duration-600 ${feature.iconGlow} ${feature.iconBg}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-medium mb-4 tracking-tight text-[var(--text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <h2 ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </h2>
  );
};

const TiltCard = ({ children, gradient = "", accentColor, borderAccent }: { children: React.ReactNode, gradient?: string, accentColor?: string, borderAccent?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / centerY * -6;
    const tiltY = (x - centerX) / centerX * 6;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformPerspective: 800 }}
      className="relative h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 lg:p-9 transition-all duration-600 hover:border-[var(--border-hover)] group hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Spotlight follow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-600 group-hover:opacity-100"
        style={{
          background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 40%)`,
        }}
      />
      {/* Color gradient follow */}
      <div
        className={`pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-600 group-hover:opacity-100 bg-gradient-to-r ${gradient} blur-3xl`}
        style={{
           maskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent)`,
           WebkitMaskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />
      {/* Top border accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-600"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${borderAccent || 'rgba(255,255,255,0.2)'}, transparent)`,
        }}
      />
      {/* Inner shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
        style={{
          background: isHovered ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${accentColor?.replace('0.5', '0.03') || 'rgba(255,255,255,0.02)'}, transparent 60%)` : 'none',
        }}
      />
      {children}
    </motion.div>
  );
};
