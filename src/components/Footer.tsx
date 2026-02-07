import { useTranslation } from 'react-i18next';
import { Github } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-12 px-6">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 group">
            <img src="/softdo-icon.png" alt="SoftDo" className="w-6 h-6 rounded opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium text-sm text-white/70 group-hover:text-white/90 transition-colors">SoftDo</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)]">{t('footer.rights')}</p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/xxomega2077xx/softdo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm group"
            >
              <Github size={14} className="group-hover:rotate-12 transition-transform duration-300" />
              GitHub
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
