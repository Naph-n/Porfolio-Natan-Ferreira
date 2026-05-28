import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isSolid, setIsSolid] = useState(false);
  const [solidColor, setSolidColor] = useState("white");

  const springConfig = { damping: 35, stiffness: 1000, mass: 0.1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('a, button, [role="button"], .cursor-pointer') as HTMLElement;
      
      if (clickableElement) {
        setIsPointer(true);
        // Check for solid cursor mode (no mix-blend-difference)
        const solidMode = clickableElement.getAttribute('data-cursor-solid');
        const color = clickableElement.getAttribute('data-cursor-color');
        
        if (solidMode === 'true') {
          setIsSolid(true);
          setSolidColor(color || "white");
        } else {
          setIsSolid(false);
        }
      } else {
        setIsPointer(false);
        setIsSolid(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isHidden]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isHidden ? 0 : 1,
        mixBlendMode: isSolid ? "normal" : "difference",
      }}
    >
      <motion.div
        animate={{
          width: isPointer ? 24 : 10,
          height: isPointer ? 24 : 10,
          backgroundColor: isSolid ? solidColor : "#ffffff",
          border: isSolid ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5
        }}
        className="rounded-full"
      />
    </motion.div>
  );
}
