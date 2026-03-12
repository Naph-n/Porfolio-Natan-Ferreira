import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat("pt-BR").format(Math.floor(latest)) + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, value, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
