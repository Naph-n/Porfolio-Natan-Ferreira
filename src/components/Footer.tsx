import { motion } from "motion/react";
import { Instagram, Linkedin, Dribbble } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const links = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.work'), href: "#our-work" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.faqs'), href: "#faqs" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <a href="#" className="font-display text-2xl font-normal tracking-tight text-white">
            nr
          </a>
          <p className="text-sm text-white/50">
            {t('footer.rights')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:items-end">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-end">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-blue-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/50 hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-white/50 hover:text-blue-500 transition-colors">
              <Dribbble size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
