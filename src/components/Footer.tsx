import { useTranslation } from 'react-i18next';
import { Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-16 px-6">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5 group cursor-default"
          >
            <img src="/softdo-icon.png" alt="SoftDo" className="w-6 h-6 rounded opacity-70 group-hover:opacity-100 transition-all duration-400" />
            <span className="font-medium text-sm text-white/60 group-hover:text-white/85 transition-colors duration-400 font-display tracking-tight">SoftDo</span>
          </motion.div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            Made with <Heart size={10} className="text-red-400/60" /> {t('footer.rights')}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/xxomega2077xx/softdo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-400 text-sm group px-3 py-1.5 rounded-full hover:bg-white/[0.04]"
            >
              <Github size={14} className="group-hover:rotate-12 transition-transform duration-400" />
              <span className="font-medium">GitHub</span>
            </motion.a>
          </div>

        </div>
      </div>
    </footer>
  );
};
