import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="group fixed bottom-6 left-6 z-[999] flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white shadow-xl md:bottom-8 md:left-8"
      aria-label="Toggle language"
    >
      {/* Base background - Fades out on hover */}
      <span className="absolute inset-0 bg-blue-600 transition-opacity duration-500 group-hover:opacity-0" />
      
      {/* Expanding background circle - Intelligent fill */}
      <span className="absolute inset-0 origin-center scale-0 rounded-full bg-[#1a1a1a] transition-transform duration-500 ease-in-out group-hover:scale-100" />
      
      <span className="relative z-10 transition-colors duration-500">
        {language === 'pt' ? 'EN' : 'PT'}
      </span>
    </motion.button>
  );
}
