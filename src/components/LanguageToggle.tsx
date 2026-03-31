import { useLanguage } from "../contexts/LanguageContext";
import { MagneticButton } from "./ui/MagneticButton";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="fixed bottom-6 left-6 z-[999] md:bottom-8 md:left-8">
      <MagneticButton
        onClick={toggleLanguage}
        ariaLabel="Toggle language"
        className="!h-12 !w-12 text-sm font-bold text-white"
        idleColor="#1a1a1a" // Dark
        activeColor="#2563eb" // Blue
        shrinkIdleOnHover={language === 'pt'}
      >
        {language === 'pt' ? 'EN' : 'PT'}
      </MagneticButton>
    </div>
  );
}
