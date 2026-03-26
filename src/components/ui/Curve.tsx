import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface CurveProps {
  color?: string;
}

export function Curve({ color = "white" }: CurveProps) {
  const container = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      // Reduce curve height on smaller screens for better proportions
      const h = w < 768 ? 60 : w < 1024 ? 80 : 100;
      setDimensions({ width: w, height: h });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // This transforms the scroll progress into a height for the curve
  const heightTransform = useTransform(scrollYProgress, [0, 0.5], [dimensions.height, 0]);
  
  const curveHeight = useSpring(heightTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      ref={container} 
      className="relative w-full pointer-events-none translate-y-[1px]"
      style={{ height: `${dimensions.height}px` }}
    >
      <div 
        className="absolute top-0 w-full overflow-hidden"
        style={{ height: `${dimensions.height}px` }}
      >
        <svg 
          className="w-full" 
          style={{ height: `${dimensions.height}px`, fill: color }}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          <motion.path
            d={useTransform(curveHeight, (h) => 
              `M0 0 Q${dimensions.width / 2} ${h * 2} ${dimensions.width} 0 L${dimensions.width} ${dimensions.height} L0 ${dimensions.height} Z`
            )}
          />
        </svg>
      </div>
    </div>
  );
}
