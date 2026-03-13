import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="group fixed bottom-20 left-6 z-[999] flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full text-white shadow-xl md:bottom-24 md:left-8"
          aria-label="Back to top"
        >
          {/* Base background - Fades out on hover */}
          <span className="absolute inset-0 bg-[#1a1a1a] transition-opacity duration-500 group-hover:opacity-0" />
          
          {/* Expanding background circle - Intelligent fill */}
          <span className="absolute inset-0 origin-center scale-0 rounded-full bg-blue-600 transition-transform duration-500 ease-in-out group-hover:scale-100" />
          
          <ArrowUp size={20} strokeWidth={2.5} className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
