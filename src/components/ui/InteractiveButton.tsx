import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  hoverTextClassName = 'group-hover:text-gray-900',
  ...props 
}: InteractiveButtonProps) {
  const Component = as as any;
  const isLarge = circleClassName.includes('h-10');
  const sizeClass = isLarge ? 'h-10 w-10' : 'h-8 w-8';

  return (
    <Component
      href={href}
      className={`group relative inline-flex items-center justify-between gap-4 overflow-hidden transition-all duration-500 ease-in-out hover:duration-700 ${className}`}
      {...props}
    >
      {/* Expanding background circle */}
      <span 
        className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:duration-700 group-hover:scale-[40] ${circleClassName}`} 
      />
      
      {/* Text content */}
      <span className={`relative z-10 transition-colors duration-500 ease-in-out group-hover:duration-700 ${textClassName} ${hoverTextClassName}`}>
        {children}
      </span>
      
      {/* Icon */}
      <span className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-colors duration-500 ease-in-out group-hover:duration-700 ${sizeClass} ${hoverIconClassName}`}>
        <ArrowUpRight size={isLarge ? 20 : 16} className={`transition-transform duration-300 ease-in-out group-hover:rotate-45 ${iconClassName} ${hoverIconClassName}`} />
      </span>
    </Component>
  );
}
