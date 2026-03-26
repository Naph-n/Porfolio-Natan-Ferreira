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
  isMagnetic?: boolean;
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
  isMagnetic = false,
  ...props 
}: InteractiveButtonProps) {
  const Component = as as any;
  const MotionComponent = motion[as] as any;
  const isLarge = circleClassName.includes('h-10');
  const sizeClass = isLarge ? 'h-10 w-10' : 'h-8 w-8';

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMagnetic) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <>
      <span 
        className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:duration-700 group-hover:scale-[40] ${circleClassName}`} 
      />
      <span className={`relative z-10 transition-colors duration-500 ease-in-out group-hover:duration-700 ${textClassName} ${hoverTextClassName}`}>
        {children}
      </span>
      <span className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-colors duration-500 ease-in-out group-hover:duration-700 ${sizeClass} ${hoverIconClassName}`}>
        <ArrowUpRight size={isLarge ? 20 : 16} className={`transition-transform duration-300 ease-in-out group-hover:rotate-45 ${iconClassName} ${hoverIconClassName}`} />
      </span>
    </>
  );

  if (isMagnetic) {
    const isWFull = className.includes('w-full');
    return (
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${isWFull ? "w-full" : "inline-block"} relative`}
      >
        <MotionComponent
          href={href}
          style={{ x: springX, y: springY }}
          className={`group relative ${isWFull ? 'flex' : 'inline-flex'} items-center justify-between gap-4 overflow-hidden transition-all duration-500 ease-in-out hover:duration-700 ${className}`}
          {...props}
        >
          {buttonContent}
        </MotionComponent>
      </div>
    );
  }

  return (
    <Component
      href={href}
      className={`group relative inline-flex items-center justify-between gap-4 overflow-hidden transition-all duration-500 ease-in-out hover:duration-700 ${className}`}
      {...props}
    >
      {buttonContent}
    </Component>
  );
}
