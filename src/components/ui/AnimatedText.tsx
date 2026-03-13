import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}

export function AnimatedText({ text, className = '', delay = 0, trigger = true }: AnimatedTextProps) {
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
      y: 0,
      transition: {
        type: 'tween' as const,
        ease: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number],
        duration: 1.2,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      key={text}
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      whileInView={trigger ? "visible" : "hidden"}
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <motion.span
            variants={child}
            className="inline-block"
          >
            {word}
          </motion.span>
          {wordIndex !== words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
