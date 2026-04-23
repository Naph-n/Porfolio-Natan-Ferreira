import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'motion/react';

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
  const Component = as as any;
  const isLarge = circleClassName.includes('h-10');
  const sizeClass = isLarge ? 'h-10 w-10' : 'h-8 w-8';

  const buttonContent = (
    <>
      {/* Expanding background effect */}
      <div className={`absolute ${isLarge ? 'right-8' : 'right-6'} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0`}>
        <span 
          className="h-4 w-4 rounded-full bg-white transition-transform duration-600 will-change-transform [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] scale-0 group-hover:scale-[100] [backface-visibility:hidden]" 
        />
      </div>
      
      <span className={`relative z-10 transition-colors duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:delay-100 ${textClassName} ${hoverTextClassName}`}>
        {children}
      </span>
      <span className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-all duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:delay-100 ${sizeClass} ${circleClassName.includes('bg-white') ? 'bg-white' : ''} ${hoverIconClassName} antialiased`}>
        <ArrowUpRight size={isLarge ? 20 : 16} className={`relative z-20 transition-transform duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45 ${iconClassName} ${hoverIconClassName}`} />
      </span>
    </>
  );

  const commonClasses = `group relative inline-flex items-center justify-between gap-4 overflow-hidden transition-colors duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] hover:bg-white hover:delay-150 hover:duration-500 [transform:translateZ(0)] border border-transparent antialiased ${className}`;

  return (
    <Component
      href={href}
      className={commonClasses}
      data-cursor-solid="true"
      data-cursor-color="white"
      {...props}
    >
      {buttonContent}
    </Component>
  );
}

