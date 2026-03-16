import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  // Split text into words
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.02, // Slightly faster stagger for better flow
        delayChildren: delay + 0.3 // Reduced initial delay
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      x: 20, // Reduced distance for smoother look
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween' as const,
        ease: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number], // easeOutExpo
        duration: 0.8, // Slightly faster duration
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text} // Re-animate when text changes (language switch)
        className={`${className} inline-flex flex-wrap notranslate`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        translate="no"
      >
        {words.map((word, wordIndex) => (
          <span key={`${text}-word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${text}-${wordIndex}-${charIndex}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {/* Add space after word if not the last one, ensuring it doesn't wrap alone */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
