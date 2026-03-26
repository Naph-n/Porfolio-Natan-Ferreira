import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface MagneticTextProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function MagneticText({ children, href, className = "" }: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Reduced intensity (0.15 instead of 0.3) for a cleaner, more subtle feel
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block p-4" // Added padding to increase the magnetic hit area
    >
      <motion.a
        href={href}
        style={{ x: springX, y: springY }}
        className={`inline-block transition-colors duration-300 ${className}`}
      >
        {children}
      </motion.a>
    </div>
  );
}
