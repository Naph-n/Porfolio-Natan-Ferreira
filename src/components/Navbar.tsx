import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Sobre", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Meu Trabalho", href: "#our-work" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold tracking-tight text-white">
            nr
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-6 right-6 top-20 rounded-2xl bg-[#111] p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/80 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
