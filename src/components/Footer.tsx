import { useTranslation } from 'react-i18next';
import { Github } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-16 px-6">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2.5 group">
            <img src="/softdo-icon.png" alt="SoftDo" className="w-6 h-6 rounded opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(212,113,78,0.2)]" />
            <span className="font-medium text-sm text-[#A8A29E] group-hover:text-[#D6D3D1] transition-colors">SoftDo</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#57534E]">{t('footer.rights')}</p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/xxomega2077xx/softdo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#57534E] hover:text-[#E8956F] transition-colors text-sm group"
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
