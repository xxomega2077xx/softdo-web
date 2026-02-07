import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Download, ArrowRight, Apple, Monitor, Terminal } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Platform = 'windows' | 'mac' | 'linux';

import { VERSION } from '../constants';

const GITHUB_REPO = 'xxomega2077xx/softdo';

// Typewriter component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 60);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const [platform, setPlatform] = useState<Platform>('windows');
  const { t, i18n } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const getDownloadLink = () => {
    const baseUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}`;
    switch (platform) {
      case 'mac': return `${baseUrl}/SoftDo-${VERSION}-macOS.dmg`;
      case 'linux': return `${baseUrl}/SoftDo-${VERSION}-Linux.AppImage`;
      default: return `${baseUrl}/SoftDo-${VERSION}-Windows.exe`;
    }
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, y }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent rounded-full blur-[100px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/10 via-fuchsia-600/10 to-transparent rounded-full blur-[100px] animate-orb-float-2 pointer-events-none" />

      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-b from-indigo-500/[0.07] via-white/[0.03] to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <span className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">v{VERSION} Available</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />

            {/* Bottom Glow */}
            <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent blur-[1px]" />
          </span>
        </motion.div>

        {/* Typewriter Heading */}
        <h1 key={i18n.language} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 leading-[0.9] text-[var(--text-primary)]">
          <div>
            <TypewriterText text={t('hero.title1')} delay={300} />
          </div>
          <div className="text-[var(--text-secondary)]">
            <TypewriterText text={t('hero.title2')} delay={1200} />
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Platform Switcher & Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >

          {/* Switcher */}
          <div className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-md flex items-center gap-1 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
            <PlatformTab
              isActive={platform === 'windows'}
              onClick={() => setPlatform('windows')}
              icon={<Monitor size={16} />}
              label="Windows"
            />
             <PlatformTab
              isActive={platform === 'mac'}
              onClick={() => setPlatform('mac')}
              icon={<Apple size={16} />}
              label="macOS"
            />
             <PlatformTab
              isActive={platform === 'linux'}
              onClick={() => setPlatform('linux')}
              icon={<Terminal size={16} />}
              label="Linux"
            />
          </div>

          <BorderBeamButton href={getDownloadLink()}>
             <Download size={18} />
             <span>Download for {platform === 'mac' ? 'macOS' : yearCapitalize(platform)}</span>
          </BorderBeamButton>
        </motion.div>

      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
    </motion.section>
  );
};

const PlatformTab = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
      ${isActive
        ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.25),0_2px_8px_rgba(0,0,0,0.3)]'
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const yearCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const BorderBeamButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      className="group relative flex items-center gap-3 px-10 py-5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full overflow-hidden transition-all duration-300 active:scale-95 hover:shadow-[0_0_60px_rgba(99,102,241,0.15)]"
    >
      {/* Border Beam */}
      <div className="absolute inset-[0px] rounded-full pointer-events-none">
         <div className="absolute inset-0 rounded-full border border-[var(--border)]" />
         <div className="absolute inset-0 rounded-full animate-border-beam border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-full after:animate-border-beam after:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] after:content-[''] after:[offset-anchor:center_center] after:[offset-path:rect(0_auto_auto_0_round_calc(100cqh/2)_calc(100cqh/2))]" />
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(99, 102, 241, 0.2),
              transparent 80%
            )
          `
        }}
      />

      <span className="relative z-10 font-semibold text-lg tracking-wide flex items-center gap-2">
        {children}
      </span>
      <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};
