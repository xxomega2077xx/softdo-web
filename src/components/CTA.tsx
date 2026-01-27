import { motion, useInView } from 'framer-motion';
import { Download, Monitor, Apple, Terminal } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getDownloadLink } from '../constants';

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background Glow - Subtle white */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20">
            {/* Download Dropdown */}
            <div className="relative group">
              <button 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
              >
                <Download size={18} />
                {t('cta.button')}
                <div className="w-px h-4 bg-black/10 mx-1" />
                <span className="text-xs opacity-50 font-normal">v1.5.2</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="min-w-[200px] p-2 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1">
                  <DownloadOption label="Windows" icon={<Monitor size={16} />} platform="windows" />
                  <DownloadOption label="macOS" icon={<Apple size={16} />} platform="mac" />
                  <DownloadOption label="Linux" icon={<Terminal size={16} />} platform="linux" />
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-[var(--text-muted)]">
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
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
  >
    {icon}
    <span>{label}</span>
  </a>
);
