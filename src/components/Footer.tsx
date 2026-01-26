import { useTranslation } from 'react-i18next';
import { Github } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-12 px-6 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--text-muted)] flex items-center justify-center text-[var(--bg-primary)] opacity-80">
               <span className="font-bold text-xs font-display">S</span>
            </div>
            <span className="font-medium text-sm">SoftDo</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)]">{t('footer.rights')}</p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/xxomega2077xx/softdo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
