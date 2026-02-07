import { motion, useScroll, useTransform } from 'framer-motion';
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
      {!isComplete && <span className="animate-pulse text-[var(--accent)]">|</span>}
    </span>
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

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
      {/* Soft warm gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[var(--accent)]/[0.06] via-[var(--accent)]/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <span className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">v{VERSION} Available</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--text-muted)]" />
          </span>
        </motion.div>

        {/* Typewriter Heading — Serif display */}
        <h1 key={i18n.language} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.05] text-[var(--text-primary)]">
          <div>
            <TypewriterText text={t('hero.title1')} delay={300} />
          </div>
          <div className="text-[var(--text-muted)]">
            <TypewriterText text={t('hero.title2')} delay={1200} />
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Platform Switcher & Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >

          {/* Switcher */}
          <div className="p-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center gap-1">
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

          <a
            href={getDownloadLink()}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white rounded-full transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_4px_20px_rgba(217,119,87,0.3)] active:scale-[0.98]"
          >
            <Download size={18} />
            <span className="font-medium text-lg">Download for {platform === 'mac' ? 'macOS' : yearCapitalize(platform)}</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
    </motion.section>
  );
};

const PlatformTab = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
      ${isActive
        ? 'text-[var(--text-primary)] bg-white shadow-sm'
        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-black/[0.03]'}
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const yearCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
