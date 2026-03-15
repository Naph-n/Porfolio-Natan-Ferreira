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
    { name: t('nav.resume'), href: "https://storage.googleapis.com/studiovozeverso/Curr%C3%ADculo%20-%20Natan%20Ferreira.pdf", isExternal: true },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <a href="#" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.017 30.976" className="h-7 w-auto fill-white">
              <g>
                <path d="M 43.017 0.09 L 34.007 0.09 C 31.696 0.09 29.821 1.818 29.821 3.949 L 29.821 30.976 L 35.962 30.976 L 35.962 7.171 C 35.962 6.387 36.651 5.751 37.502 5.751 L 43.017 5.751 L 43.017 0.09 Z" />
                <path d="M 25.41 7.196 L 30.473 7.196 L 30.473 12.837 L 25.41 12.837 Z M 22.472 3.382 C 22.472 1.514 20.829 0 18.804 0 L 3.669 0 C 1.643 0 0 1.514 0 3.382 L 0 30.886 L 6.14 30.886 L 6.14 6.539 C 6.14 6.054 6.567 5.661 7.093 5.661 L 15.379 5.661 C 15.905 5.661 16.332 6.054 16.332 6.539 L 16.332 30.886 L 22.472 30.886 Z" />
              </g>
            </svg>
          </a>
          <p className="text-sm text-white/50">
            {t('footer.rights')}
          </p>
          <p className="text-xs text-white/30 mt-1">
            {t('footer.signature')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:items-end">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-end">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/naph.n/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/50 hover:text-blue-500 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/natan-ferreira" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/50 hover:text-blue-500 transition-colors"
            >
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
