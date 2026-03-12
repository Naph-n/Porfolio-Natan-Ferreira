import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  // Split text into words to handle wrapping properly
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween' as const,
        ease: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number], // easeOutExpo approximation
        duration: 1.2,
      },
    },
    hidden: {
      opacity: 0,
      x: 40,
    },
  };

  return (
    <motion.span
      className={`${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={child}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
          {wordIndex !== words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
