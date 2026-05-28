import React, { useRef, useState } from 'react';
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
  hoverIconClassName = 'group-hover:text-black',
  textClassName = 'text-white',
  hoverTextClassName = 'group-hover:text-black',
  ...props 
}: InteractiveButtonProps) {
  const Component = motion[as as any] || (motion as any).button;
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = circleClassName.includes('h-10');
  const sizeClass = isLarge ? 'h-10 w-10' : 'h-8 w-8';

  const buttonContent = (
    <>
      <span className="relative z-20 flex items-center justify-start gap-2">
        <motion.span 
          className={`relative ${textClassName}`}
          animate={{ color: isHovered ? '#000000' : '#ffffff' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.span>
      </span>
      
      <span className={`relative z-10 flex shrink-0 items-center justify-center rounded-full ${sizeClass} ${circleClassName.includes('bg-white') ? 'bg-white' : ''} antialiased`}>
        {/* Absolute Centered Expanding Background */}
        <motion.span 
          className="absolute inset-0 rounded-full bg-white pointer-events-none z-0"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 40 : 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.76, 0, 0.24, 1] // Dennis Snellenberg easing: starts agile, decelerates smoothly. Works perfectly in reverse.
          }}
          style={{ 
            transformOrigin: "center" 
          }}
        />
        <motion.span
          className="relative z-20 flex items-center justify-center"
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <ArrowUpRight size={isLarge ? 20 : 16} className={`${iconClassName}`} />
        </motion.span>
      </span>
    </>
  );

  const commonClasses = `group relative inline-flex items-center justify-between gap-4 overflow-hidden border border-transparent antialiased transition-colors duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-white ${className}`;

  return (
    <Component
      href={href}
      className={commonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-solid="true"
      data-cursor-color="white"
      {...props}
    >
      {buttonContent}
    </Component>
  );
}

