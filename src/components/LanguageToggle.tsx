import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'cn' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="relative px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-200"
    >
      <div className="relative z-10 flex items-center space-x-2 text-sm font-medium">
        <span className={i18n.language === 'en' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>EN</span>
        <span className="text-[var(--border-hover)]">/</span>
        <span className={i18n.language === 'cn' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>中文</span>
      </div>
    </button>
  );
};
