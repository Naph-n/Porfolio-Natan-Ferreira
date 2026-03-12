import { motion, AnimatePresence } from "motion/react";
import { AnimatedText } from "./ui/AnimatedText";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { useLanguage } from "../contexts/LanguageContext";
import { useState, useEffect } from "react";

export function About() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const stats = [
    {
      value: 7,
      suffix: "",
      label: t('about.stat1.label'),
      description: t('about.stat1.desc'),
    },
    {
      value: 50,
      suffix: "+",
      label: t('about.stat2.label'),
      description: t('about.stat2.desc'),
    },
    {
      value: 20,
      suffix: "+",
      label: t('about.stat3.label'),
      description: t('about.stat3.desc'),
    },
    {
      value: 100,
      suffix: "%",
      label: t('about.stat4.label'),
      description: t('about.stat4.desc'),
    },
  ];

  const galleryImages = [
    "https://framerusercontent.com/images/NFKxJY6VRfVd8PVd2Yo86uXCOg.jpg?width=819&height=1024",
    "https://framerusercontent.com/images/ZC6w79wui5a3dYyX7Leb5r8nM3s.png?width=1609&height=1870",
    "https://framerusercontent.com/images/irtdVtNfGKmL3EmYxEVkZ9czLFg.jpg?scale-down-to=2048&width=2776&height=4748",
    "https://framerusercontent.com/images/j7ihKyFGGL5xP1AF201pplYVrk.jpg?scale-down-to=2048&width=2560&height=1707",
    "https://framerusercontent.com/images/tMUf4e2i9Ap7C5gVYpXGN09rKQ.png?scale-down-to=2048&width=2752&height=1728",
    "https://framerusercontent.com/images/usxAAzjJs2sXduu3HaYGE9gRa4.png?width=1455&height=1024",
    "https://framerusercontent.com/images/v7EZjAXKaikiVYcxU3YVRrtjs.jpg?width=819&height=1024",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  return (
    <section id="about" className="bg-white py-24 text-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
              {t('about.badge')}
            </span>
            <h3 className="font-display text-4xl font-normal tracking-tight sm:text-5xl leading-tight">
              <AnimatedText text={t('about.title1')} delay={0.1} /><br />
              <AnimatedText text={t('about.title2')} delay={0.3} /><br />
              <span className="text-blue-600"><AnimatedText text={t('about.title3')} delay={0.5} /></span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-xl font-light text-gray-600">
              {t('about.desc')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Carousel - Mobile Slider, Desktop Marquee */}
      <div className="relative w-full overflow-hidden my-32 lg:my-40">
        {/* Mobile Slider */}
        <div className="md:hidden flex flex-col items-center px-6">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={galleryImages[currentImageIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full object-cover"
                alt="Gallery"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
          {/* Progress Indicators */}
          <div className="mt-6 flex gap-2">
            {galleryImages.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "w-6 bg-blue-600" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Marquee */}
        <div className="hidden md:flex gap-4">
          <div className="flex shrink-0 animate-marquee gap-4">
            {galleryImages.map((src, idx) => (
              <div
                key={`a-${idx}`}
                className="h-80 md:h-[28rem] lg:h-[36rem] aspect-[4/5] shrink-0 overflow-hidden bg-gray-100"
              >
                <img src={src} alt="Gallery" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee gap-4" aria-hidden="true">
            {galleryImages.map((src, idx) => (
              <div
                key={`b-${idx}`}
                className="h-80 md:h-[28rem] lg:h-[36rem] aspect-[4/5] shrink-0 overflow-hidden bg-gray-100"
              >
                <img src={src} alt="Gallery" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Stats */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-display text-5xl font-light tracking-tighter text-black mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h4 className="text-lg font-medium text-black mb-2">{stat.label}</h4>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
