import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Download, Monitor, Apple, Terminal } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDownloadLink, VERSION } from '../constants';

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <section ref={ref} className="relative py-44 px-6 overflow-hidden">
      {/* Multi-layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/[0.08] to-violet-600/[0.04] rounded-full blur-[140px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/[0.06] to-fuchsia-600/[0.03] rounded-full blur-[120px] animate-orb-float-2 pointer-events-none" />

      {/* Central glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-gradient-to-t from-indigo-500/[0.05] via-white/[0.02] to-transparent blur-[120px] rounded-full pointer-events-none animate-breathe" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-7 tracking-tight"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-14 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20">
            {/* Download Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn relative inline-flex items-center gap-3 px-9 py-4.5 bg-white text-black font-medium rounded-full transition-all duration-400 hover:shadow-[0_0_50px_rgba(255,255,255,0.15),0_0_100px_rgba(99,102,241,0.08)]"
              >
                <Download size={18} />
                {t('cta.button')}
                <div className="w-px h-4 bg-black/10 mx-1" />
                <span className="text-xs opacity-40 font-normal">v{VERSION}</span>

                {/* Button shimmer effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 text-sm text-[var(--text-muted)]"
          >
            {t('cta.note')}
          </motion.p>
        </motion.div>
      </div>
    </section>
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
