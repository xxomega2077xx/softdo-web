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
      className="relative px-3 py-1 rounded-full bg-[rgba(255,247,237,0.04)] border border-[rgba(255,247,237,0.08)] overflow-hidden group"
    >
      <div className="relative z-10 flex items-center space-x-2 text-sm font-medium">
        <span className={i18n.language === 'en' ? 'text-[#FAF9F7]' : 'text-[#57534E]'}>EN</span>
        <span className="text-[rgba(255,247,237,0.16)]">/</span>
        <span className={i18n.language === 'cn' ? 'text-[#FAF9F7]' : 'text-[#57534E]'}>中文</span>
      </div>
      <motion.div 
        layoutId="highlight"
        className="absolute inset-0 bg-[#D4714E]/[0.06] opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </button>
  );
};
