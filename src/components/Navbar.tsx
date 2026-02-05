import { motion, useScroll } from 'framer-motion';
import { Github, Download, Monitor, Apple, Terminal } from 'lucide-react';
import { getDownloadLink } from '../constants';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className={`
        max-w-4xl mx-auto flex items-center justify-between px-5 py-2.5 transition-all duration-300
        ${scrolled ? 'nav-float' : 'bg-transparent border-transparent'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <img src="/softdo-icon.png" alt="SoftDo" className="w-8 h-8 rounded-lg" />
          <TextScramble text={t('softdo')} className="font-semibold text-lg tracking-tight font-display" />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          
          <a 
            href="https://github.com/xxomega2077xx/softdo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Github size={18} />
          </a>

          {/* Download Dropdown */}
          <div className="relative group">
            <button 
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <Download size={14} />
              Download
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="min-w-[200px] p-2 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1">
                <DownloadOption label="Windows" icon={<Monitor size={14} />} platform="windows" />
                <DownloadOption label="macOS" icon={<Apple size={14} />} platform="mac" />
                <DownloadOption label="Linux" icon={<Terminal size={14} />} platform="linux" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

const TextScramble = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+~`|?><";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={className}
    >
      {displayText}
    </span>
  );
};

const DownloadOption = ({ label, icon, platform }: { label: string; icon: React.ReactNode; platform: 'windows' | 'mac' | 'linux' }) => (
  <a
    href={getDownloadLink(platform)}
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
  >
    {icon}
    <span>{label}</span>
  </a>
);
