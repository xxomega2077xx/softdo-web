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
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Multi-layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/[0.1] to-violet-600/[0.05] rounded-full blur-[120px] animate-orb-float-1 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-purple-600/[0.08] to-fuchsia-600/[0.04] rounded-full blur-[100px] animate-orb-float-2 pointer-events-none" />

      {/* Central glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-t from-indigo-500/[0.06] via-white/[0.03] to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
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
                className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2),0_0_80px_rgba(99,102,241,0.1)] active:scale-95"
              >
                <Download size={18} />
                {t('cta.button')}
                <div className="w-px h-4 bg-black/10 mx-1" />
                <span className="text-xs opacity-50 font-normal">v{VERSION}</span>

                {/* Button shimmer effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="min-w-[200px] p-2 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] flex flex-col gap-1">
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
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
  >
    {icon}
    <span>{label}</span>
  </a>
);
