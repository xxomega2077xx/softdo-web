import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Apple, Monitor, Terminal } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Platform = 'windows' | 'mac' | 'linux';

import { VERSION } from '../constants';

const GITHUB_REPO = 'xxomega2077xx/softdo';

// Typewriter component with smoother animation
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
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.85em] bg-indigo-400 ml-1 align-middle rounded-full"
        />
      )}
    </span>
  );
};

// Aurora background with layered gradients
const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary aurora orb */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-indigo-600/[0.12] via-violet-600/[0.08] to-transparent rounded-full blur-[140px] animate-orb-float-1" />
      {/* Secondary orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/[0.08] via-fuchsia-600/[0.06] to-transparent rounded-full blur-[120px] animate-orb-float-2" />
      {/* Tertiary accent orb */}
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/[0.05] via-blue-600/[0.04] to-transparent rounded-full blur-[100px] animate-orb-float-3" />

      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-radial from-indigo-500/[0.06] via-white/[0.02] to-transparent blur-[150px] rounded-full animate-breathe" />

      {/* Radial vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(3,3,3,0.8) 100%)',
      }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};

// Floating particles - optimized with fewer DOM elements
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.2 + 0.05,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
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

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      <AuroraBackground />
      <FloatingParticles />

      <motion.div
        style={{ filter: useMotionTemplate`blur(${blur}px)` }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-12"
        >
          <span className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl transition-all duration-700 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_0_50px_rgba(99,102,241,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </span>
            <span className="text-sm font-medium tracking-wider text-white/80 group-hover:text-white/95 transition-colors duration-300">v{VERSION} Available</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-500 text-white/50" />
            {/* Bottom edge glow */}
            <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          </span>
        </motion.div>

        {/* Typewriter Heading */}
        <motion.h1
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-semibold tracking-[-0.04em] mb-8 leading-[0.88]"
        >
          <div className="text-gradient-hero">
            <TypewriterText text={t('hero.title1')} delay={400} />
          </div>
          <div className="text-[var(--text-muted)]">
            <TypewriterText text={t('hero.title2')} delay={1400} />
          </div>
        </motion.h1>

        {/* Subtext with staggered entrance */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Platform Switcher & Download */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 3.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Switcher with AnimatePresence */}
          <div className="p-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl flex items-center gap-1 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.5)]">
            <PlatformTab
              isActive={platform === 'windows'}
              onClick={() => setPlatform('windows')}
              icon={<Monitor size={15} />}
              label="Windows"
            />
             <PlatformTab
              isActive={platform === 'mac'}
              onClick={() => setPlatform('mac')}
              icon={<Apple size={15} />}
              label="macOS"
            />
             <PlatformTab
              isActive={platform === 'linux'}
              onClick={() => setPlatform('linux')}
              icon={<Terminal size={15} />}
              label="Linux"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <BorderBeamButton href={getDownloadLink()}>
                <Download size={18} />
                <span>Download for {platform === 'mac' ? 'macOS' : yearCapitalize(platform)}</span>
              </BorderBeamButton>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent pointer-events-none" />
    </motion.section>
  );
};

const PlatformTab = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`
      relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-400 flex items-center gap-2
      ${isActive
        ? 'text-black bg-white shadow-[0_0_25px_rgba(255,255,255,0.2),0_2px_10px_rgba(0,0,0,0.3)]'
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'}
    `}
    style={{ transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
  >
    {isActive && (
      <motion.div
        layoutId="platform-active-bg"
        className="absolute inset-0 bg-white rounded-full"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </span>
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
    <motion.a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex items-center gap-3 px-10 py-5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(99,102,241,0.12)]"
    >
      {/* Border Beam */}
      <div className="absolute inset-[0px] rounded-full pointer-events-none">
         <div className="absolute inset-0 rounded-full border border-[var(--border)]" />
         <div className="absolute inset-0 rounded-full animate-border-beam border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-full after:animate-border-beam after:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] after:content-[''] after:[offset-anchor:center_center] after:[offset-path:rect(0_auto_auto_0_round_calc(100cqh/2)_calc(100cqh/2))]" />
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `
        }}
      />

      <span className="relative z-10 font-semibold text-lg tracking-wide flex items-center gap-2">
        {children}
      </span>
      <ArrowRight size={18} className="relative z-10 transition-transform duration-400 group-hover:translate-x-1.5" />
    </motion.a>
  );
};
