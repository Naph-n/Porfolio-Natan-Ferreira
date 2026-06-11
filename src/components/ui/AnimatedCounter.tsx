import { motion } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  countStart?: number; // Kept for compatibility but not needed for vertical odometer
}

function DigitColumn({ digit, index, duration }: { digit: string, index: number, duration: number }) {
  const num = parseInt(digit, 10);
  if (isNaN(num)) {
    return (
      <span className="inline-block align-bottom" style={{ height: "1em" }}>
        <span className="block leading-none" style={{ height: "1em" }}>
          {digit}
        </span>
      </span>
    );
  }
  
  // First digit: fewer loops (visually slower)
  // Subsequent digits: progressively more loops (visually faster)
  const loops = index === 0 ? 1 : (index + 1); 
  const sequence: number[] = [];
  
  for (let i = 0; i < loops; i++) {
    for (let j = 0; j < 10; j++) {
      sequence.push(j);
    }
  }
  // Add values until the target digit is reached
  for (let j = 0; j <= num; j++) {
    sequence.push(j);
  }
  
  const targetIndex = sequence.length - 1;

  // Custom timings per digit requirement:
  // First digit: animates slower.
  // Next digits: animate faster, but finish sequentially AFTER the previous one.
  const actualDuration = Math.max(1.0, duration - index * 0.4);
  const actualDelay = index * 0.5;

  return (
    <span 
      className={`inline-block relative align-bottom ${index > 0 ? '-ml-[0.03em]' : ''}`} 
      style={{ height: "1em", clipPath: "inset(0 -100% 0 -100%)" }}
    >
      {/* Invisible static digit sets the exact proportional width to avoid gaps for thinner digits like '1' */}
      <span className="invisible block leading-none" style={{ height: "1em" }}>
        {digit}
      </span>
      
      <motion.span
        initial={{ y: "0%" }}
        whileInView={{ 
            y: `-${(targetIndex / sequence.length) * 100}%`
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
            duration: actualDuration, ease: [0.16, 1, 0.3, 1], delay: actualDelay
        }}
        style={{ 
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        className="absolute top-0 inset-x-0 flex flex-col leading-none"
      >
        {sequence.map((n, i) => (
          <span 
             key={i} 
             className="flex-none block leading-none text-center" 
             style={{ height: "1em" }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function AnimatedCounter({ value, suffix = "", duration = 2.5 }: AnimatedCounterProps) {
  const valStr = Intl.NumberFormat("pt-BR").format(value);
  const digits = valStr.split('');
  
  return (
    <span className="inline-flex items-center leading-none tracking-tight" aria-label={`${value}${suffix}`}>
      {digits.map((digit, i) => (
        <DigitColumn 
           key={`${i}-${digit}`} 
           digit={digit} 
           index={i}
           duration={duration} 
        />
      ))}
      {suffix && (
        <span className="inline-block leading-none ml-[0.05em]" style={{ height: "1em" }}>
          {suffix}
        </span>
      )}
    </span>
  );
}
