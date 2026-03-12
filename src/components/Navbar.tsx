import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.work'), href: "#our-work" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.faqs'), href: "#faqs" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <nav className={`fixed lg:absolute top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md py-4 shadow-lg lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:py-6' : 'bg-transparent py-6'}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.017 30.976" className="h-8 w-auto fill-white">
              <g>
                <path d="M 43.017 0.09 L 34.007 0.09 C 31.696 0.09 29.821 1.818 29.821 3.949 L 29.821 30.976 L 35.962 30.976 L 35.962 7.171 C 35.962 6.387 36.651 5.751 37.502 5.751 L 43.017 5.751 L 43.017 0.09 Z" />
                <path d="M 25.41 7.196 L 30.473 7.196 L 30.473 12.837 L 25.41 12.837 Z M 22.472 3.382 C 22.472 1.514 20.829 0 18.804 0 L 3.669 0 C 1.643 0 0 1.514 0 3.382 L 0 30.886 L 6.14 30.886 L 6.14 6.539 C 6.14 6.054 6.567 5.661 7.093 5.661 L 15.379 5.661 C 15.905 5.661 16.332 6.054 16.332 6.539 L 16.332 30.886 L 22.472 30.886 Z" />
              </g>
            </svg>
          </motion.a>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 lg:flex">
              {links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CV Button */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black lg:px-5 lg:py-2"
            >
              {t('nav.resume')}
            </motion.a>

            {/* Mobile Toggle */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white lg:hidden relative flex h-8 w-8 items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={{
                closed: {
                  opacity: 0,
                  y: -20,
                  scale: 0.95,
                  transition: { duration: 0.2, ease: "easeIn", staggerChildren: 0.05, staggerDirection: -1 }
                },
                open: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.1 }
                }
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute left-6 right-6 top-20 rounded-2xl bg-[#111] p-6 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      closed: { opacity: 0, x: -10 },
                      open: { opacity: 1, x: 0 }
                    }}
                    className="text-lg font-medium text-white/80 hover:text-white"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
