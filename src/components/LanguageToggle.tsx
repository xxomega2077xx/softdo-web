import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'cn' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] overflow-hidden group transition-all duration-400 hover:bg-white/[0.07] hover:border-white/[0.12]"
    >
      <div className="relative z-10 flex items-center space-x-2 text-sm font-medium">
        <span className={`transition-all duration-300 ${i18n.language === 'en' ? 'text-white' : 'text-white/40'}`}>EN</span>
        <span className="text-white/15">/</span>
        <span className={`transition-all duration-300 ${i18n.language === 'cn' ? 'text-white' : 'text-white/40'}`}>中文</span>
      </div>
      <motion.div
        className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
};
