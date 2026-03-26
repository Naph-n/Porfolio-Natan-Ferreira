import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

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
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-6 z-[999] md:bottom-24 md:left-8"
        >
          <MagneticButton
            onClick={scrollToTop}
            ariaLabel="Back to top"
            className="!h-12 !w-12"
            idleColor="#1a1a1a" // Dark
            activeColor="#2563eb" // Blue
            textColor="white"
            activeTextColor="white"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
