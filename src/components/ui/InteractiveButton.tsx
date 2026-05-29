import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: 'button' | 'a' | 'div';
  href?: string;
  className?: string;
  circleClassName?: string;
  iconClassName?: string;
  hoverIconClassName?: string;
  textClassName?: string;
  hoverTextClassName?: string;
}

export function InteractiveButton({ 
  children, 
  as = 'button', 
  href, 
  className = '', 
  circleClassName = 'right-2 h-8 w-8 bg-white',
  iconClassName = 'text-black',
  hoverIconClassName = '',
  textClassName = 'text-white',
  hoverTextClassName = '',
  ...props 
}: InteractiveButtonProps) {
  const Component = motion[as as any] || (motion as any).button;
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = circleClassName.includes('h-10');
  const sizeClass = isLarge ? 'h-10 w-10' : 'h-8 w-8';
  const circlePositionClass = isLarge ? 'right-3' : 'right-2';

  return (
    <Component
      href={href}
      className={`group relative inline-flex items-center justify-between gap-4 overflow-hidden border border-transparent antialiased cursor-pointer transition-colors duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Dynamic background that expands beautifully from the center of the right circle */}
      <motion.span 
        className={`absolute ${circlePositionClass} top-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none z-0 ${sizeClass}`}
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 40 : 1 }}
        transition={{ 
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1] // Classic ease-in-out curve with fast acceleration and smooth deceleration
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Button Text */}
      <span className="relative z-10">
        <motion.span 
          className={`inline-block ${textClassName}`}
          animate={{ color: isHovered ? '#000000' : '#ffffff' }}
          transition={{ 
            duration: 0.45,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {children}
        </motion.span>
      </span>
      
      {/* Arrow Circle Container */}
      <span className={`relative z-10 flex shrink-0 items-center justify-center rounded-full bg-white text-black ${sizeClass}`}>
        <motion.span
          className="flex items-center justify-center"
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ 
            duration: 0.45,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          <ArrowUpRight size={isLarge ? 20 : 16} className={`${iconClassName}`} />
        </motion.span>
      </span>
    </Component>
  );
}

