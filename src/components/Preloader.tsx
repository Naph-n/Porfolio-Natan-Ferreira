import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    let mounted = true;
    const duration = 2500; // 2.5 seconds total
    const startTime = Date.now();
    
    const updateProgress = () => {
      if (!mounted) return;

      const elapsed = Date.now() - startTime;
      const rawProgress = (elapsed / duration) * 100;
      
      // Add a bit of "fictitious" easing to make it feel more natural
      // It slows down as it reaches 90% and then "jumps" to 100%
      let displayProgress = rawProgress;
      if (rawProgress < 80) {
        displayProgress = rawProgress;
      } else if (rawProgress < 95) {
        // Slow down at the end
        displayProgress = 80 + (rawProgress - 80) * 0.5;
      } else {
        displayProgress = 100;
      }

      setProgress(Math.min(displayProgress, 100));

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Finalize
        setProgress(100);
        setTimeout(() => {
          if (mounted) {
            setIsExit(true);
            setTimeout(onComplete, 800);
          }
        }, 400);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white will-change-transform"
        >
          <div className="flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.017 30.976" className="h-9 w-auto fill-black">
                <g>
                  <path d="M 43.017 0.09 L 34.007 0.09 C 31.696 0.09 29.821 1.818 29.821 3.949 L 29.821 30.976 L 35.962 30.976 L 35.962 7.171 C 35.962 6.387 36.651 5.751 37.502 5.751 L 43.017 5.751 L 43.017 0.09 Z" />
                  <path d="M 25.41 7.196 L 30.473 7.196 L 30.473 12.837 L 25.41 12.837 Z M 22.472 3.382 C 22.472 1.514 20.829 0 18.804 0 L 3.669 0 C 1.643 0 0 1.514 0 3.382 L 0 30.886 L 6.14 30.886 L 6.14 6.539 C 6.14 6.054 6.567 5.661 7.093 5.661 L 15.379 5.661 C 15.905 5.661 16.332 6.054 16.332 6.539 L 16.332 30.886 L 22.472 30.886 Z" />
                </g>
              </svg>
            </motion.div>

            <div className="h-[2px] w-48 overflow-hidden bg-black/5">
              <motion.div
                className="h-full bg-black origin-left"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
