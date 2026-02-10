import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Github, Download, Monitor, Apple, Terminal } from 'lucide-react';
import { getDownloadLink } from '../constants';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className={`
        max-w-4xl mx-auto flex items-center justify-between px-6 py-2.5 transition-all duration-700
        ${scrolled ? 'nav-float' : 'bg-transparent border-transparent'}
      `}
      style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img src="/softdo-icon.png" alt="SoftDo" className="w-8 h-8 rounded-lg transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]" />
          <TextScramble text={t('softdo')} className="font-semibold text-lg tracking-tight font-display" />
        </motion.div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <LanguageToggle />

          <motion.a
            href="https://github.com/xxomega2077xx/softdo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-400 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Github size={18} />
          </motion.a>

          {/* Download Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-medium text-sm transition-all duration-400 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <Download size={14} />
              Download
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full pt-3"
                >
                  <div className="min-w-[220px] p-2 rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_0_0.5px_rgba(255,255,255,0.03)_inset] flex flex-col gap-0.5">
                    <DownloadOption label="Windows" icon={<Monitor size={15} />} platform="windows" />
                    <DownloadOption label="macOS" icon={<Apple size={15} />} platform="mac" />
                    <DownloadOption label="Linux" icon={<Terminal size={15} />} platform="linux" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.08] transition-all duration-300 whitespace-nowrap group"
  >
    <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
);
