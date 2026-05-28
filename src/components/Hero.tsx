import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { AnimatedText } from "./ui/AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={containerRef} className="relative flex min-h-[85vh] lg:min-h-[92vh] xl:min-h-[95vh] items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 pt-28 pb-12 md:pt-32 md:pb-12 text-white">
      {/* Background Image with Overlay - Only visible on mobile/tablet */}
      <motion.div 
        className="absolute inset-0 z-0 lg:hidden"
        style={{
          backgroundImage: 'url("https://framerusercontent.com/images/aCi97T93KLAF5XkrpugqlKPKpc.png?scale-down-to=2048&width=4096&height=4096")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: scale,
          opacity: opacity
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/80 lg:hidden" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-center relative z-10 mt-10 md:mt-0">
        <div className="relative z-10 max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            {t('hero.badge')}
          </motion.div>

          <h1 className="font-display text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-balance md:max-w-[15ch] lg:max-w-none lg:mx-0">
            <AnimatedText text={t('hero.title')} delay={1.0} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-6 max-w-lg text-lg font-normal text-white/70 lg:mx-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-10 flex justify-start"
          >
            <InteractiveButton
              as="a"
              href="#contact"
              className="rounded-full bg-blue-600 pl-8 pr-3 py-3 text-base font-medium"
              circleClassName="right-3 h-10 w-10 bg-white"
            >
              {t('hero.cta')}
            </InteractiveButton>
          </motion.div>
        </div>

        {/* Shape Image - Only visible on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{ scale: scale }}
          className="relative mx-auto w-full lg:w-[95%] xl:w-[100%] max-w-[550px] xl:max-w-[600px] hidden lg:block will-change-transform lg:translate-x-4"
        >
          <div 
            className="h-[55vh] lg:h-[70vh] xl:h-[80vh] max-h-[850px] min-h-[400px] w-full overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            <img
              src="https://framerusercontent.com/images/aCi97T93KLAF5XkrpugqlKPKpc.png?scale-down-to=2048&width=4096&height=4096"
              alt="Natan Ferreira - Creative Designer & Communication Professional"
              className="h-full w-full object-cover scale-[1.03] lg:-translate-y-2"
              referrerPolicy="no-referrer"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
