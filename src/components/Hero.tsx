import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { AnimatedText } from "./ui/AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6 pt-32 pb-32 md:pb-48 lg:pb-64 text-white">
      {/* Background Image with Overlay - Only visible on mobile/tablet */}
      <div 
        className="absolute inset-0 z-0 lg:hidden"
        style={{
          backgroundImage: 'url("https://framerusercontent.com/images/aCi97T93KLAF5XkrpugqlKPKpc.png?scale-down-to=2048&width=4096&height=4096")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/80 lg:hidden" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center relative z-10">
        <div className="relative z-10 max-w-3xl">
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

          <h1 className="font-display text-4xl font-normal tracking-tight sm:text-6xl md:text-7xl text-balance md:max-w-[15ch] lg:max-w-none">
            <AnimatedText text={t('hero.title')} delay={1.0} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-6 max-w-lg text-lg text-white/70"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-10"
          >
            <InteractiveButton
              as="a"
              href="#contact"
              isMagnetic={true}
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
          className="relative mx-auto w-full max-w-md lg:max-w-[640px] hidden lg:block will-change-transform"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
            <img
              src="https://framerusercontent.com/images/aCi97T93KLAF5XkrpugqlKPKpc.png?scale-down-to=2048&width=4096&height=4096"
              alt="Natan Ferreira - Creative Designer & Communication Professional"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
