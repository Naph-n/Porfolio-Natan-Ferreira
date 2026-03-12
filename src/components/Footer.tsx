import { motion } from "motion/react";
import { Instagram, Linkedin, Dribbble } from "lucide-react";

export function Footer() {
  const links = [
    { name: "Sobre", href: "#about" },
    { name: "Meu trabalho", href: "#our-work" },
    { name: "Serviços", href: "#services" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <a href="#" className="font-display text-2xl font-normal tracking-tight text-white">
            nr
          </a>
          <p className="text-sm text-white/50">
            © 2025 Natan Ferreira. Todos os direitos reservados.
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
