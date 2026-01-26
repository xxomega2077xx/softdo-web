import { motion } from 'framer-motion';
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
      className="relative px-3 py-1 rounded-full bg-white/5 border border-white/10 overflow-hidden group"
    >
      <div className="relative z-10 flex items-center space-x-2 text-sm font-medium">
        <span className={i18n.language === 'en' ? 'text-white' : 'text-white/50'}>EN</span>
        <span className="text-white/20">/</span>
        <span className={i18n.language === 'cn' ? 'text-white' : 'text-white/50'}>中文</span>
      </div>
      <motion.div 
        layoutId="highlight"
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </button>
  );
};
