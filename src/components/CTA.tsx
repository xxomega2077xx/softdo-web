import { motion, useInView } from 'framer-motion';
import { Download, Monitor, Apple, Terminal } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getDownloadLink, VERSION } from '../constants';

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Soft warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-tertiary)]/50 to-[var(--bg-primary)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-6 tracking-tight text-[var(--text-primary)]">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20">
            {/* Download Dropdown */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white font-medium rounded-full transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_4px_20px_rgba(217,119,87,0.3)] active:scale-95"
              >
                <Download size={18} />
                {t('cta.button')}
                <div className="w-px h-4 bg-white/20 mx-1" />
                <span className="text-xs opacity-70 font-normal">v{VERSION}</span>
              </motion.button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="min-w-[200px] p-2 rounded-2xl bg-white border border-[var(--border)] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] flex flex-col gap-0.5">
                  <DownloadOption label="Windows" icon={<Monitor size={16} />} platform="windows" />
                  <DownloadOption label="macOS" icon={<Apple size={16} />} platform="mac" />
                  <DownloadOption label="Linux" icon={<Terminal size={16} />} platform="linux" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-[var(--text-muted)]">
            {t('cta.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const DownloadOption = ({ label, icon, platform }: { label: string; icon: React.ReactNode; platform: 'windows' | 'mac' | 'linux' }) => (
  <a
    href={getDownloadLink(platform)}
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all duration-200 whitespace-nowrap"
  >
    {icon}
    <span>{label}</span>
  </a>
);
