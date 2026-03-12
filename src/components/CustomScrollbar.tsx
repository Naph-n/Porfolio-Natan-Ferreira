import { motion, useScroll, useTransform } from "motion/react";

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  
  // The thumb takes up 15% of the viewport height.
  // So it can move from 0% to 85% of the container's height.
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <div className="fixed right-1 md:right-2 top-2 bottom-2 w-2 z-[100] pointer-events-none mix-blend-difference">
      <motion.div
        className="absolute w-full bg-white rounded-full"
        style={{
          height: "15%",
          top: top,
        }}
      />
    </div>
  );
}
