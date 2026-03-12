import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { AnimatedText } from "./ui/AnimatedText";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6 pt-32 pb-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available for work
          </motion.div>

          <h1 className="font-display text-5xl font-normal tracking-tight sm:text-6xl md:text-7xl">
            <AnimatedText text="Ajudando marcas a se moverem!" delay={1.0} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-6 max-w-lg text-lg text-white/70"
          >
            Transformo conceitos em experiências visuais que unem produto, marca e público!
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
              className="rounded-full bg-blue-600 pl-8 pr-3 py-3 text-base font-medium"
              circleClassName="right-3 h-10 w-10 bg-white"
            >
              Vamos conversar
            </InteractiveButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="relative mx-auto w-full max-w-md lg:max-w-[420px]"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              alt="Natan"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
