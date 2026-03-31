import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: 'button' | 'a';
  className?: string;
  activeColor?: string;
  idleColor?: string;
  textColor?: string;
  activeTextColor?: string;
  ariaLabel?: string;
  border?: boolean;
  shrinkIdleOnHover?: boolean;
}

export function MagneticButton({ 
  children, 
  onClick, 
  href,
  target,
  rel,
  as = 'button',
  className = "", 
  activeColor = "#1a1a1a", 
  idleColor = "transparent",
  textColor = "white",
  activeTextColor = "white",
  ariaLabel,
  border = false,
  shrinkIdleOnHover = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic movement values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Content parallax values
  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);
 
  // Smooth springs with Dennis-style "weight"
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const contentSpringX = useSpring(contentX, springConfig);
  const contentSpringY = useSpring(contentY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
    
    // Internal parallax
    contentX.set(distanceX * 0.2);
    contentY.set(distanceY * 0.2);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    contentX.set(0);
    contentY.set(0);
  };

  const MotionComponent = motion[as] as any;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-6"
    >
      <MotionComponent
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        style={{ x: springX, y: springY }}
        className={`group relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 ${border ? 'border border-white/20' : ''} ${className}`}
      >
        {/* Idle Background */}
        <motion.div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{ backgroundColor: idleColor, transformOrigin: 'top' }}
          animate={{ 
            scale: isHovered && shrinkIdleOnHover ? 0.92 : 1,
            scaleY: isHovered && shrinkIdleOnHover ? 0 : 1,
            opacity: isHovered && shrinkIdleOnHover ? 0 : 1
          }}
          transition={{ 
            scale: { duration: 0.2 },
            scaleY: { 
              duration: 0.25, 
              ease: [0.76, 0, 0.24, 1],
              delay: isHovered ? 0.3 : 0 
            },
            opacity: { 
              duration: 0.1, 
              delay: isHovered ? 0.4 : 0 
            }
          }}
        />
        
        {/* Dennis Snellenberg "Liquid" Fill Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: activeColor }}
            />
          )}
        </AnimatePresence>
        
        {/* Content with parallax and color transition */}
        <motion.span 
          style={{ x: contentSpringX, y: contentSpringY }}
          className="relative z-10 flex items-center justify-center transition-colors duration-500"
          animate={{ color: isHovered ? activeTextColor : textColor }}
        >
          {children}
        </motion.span>
      </MotionComponent>
    </div>
  );
}
