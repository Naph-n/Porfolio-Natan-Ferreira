import { motion } from "motion/react";
import { AnimatedText } from "./ui/AnimatedText";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

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
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=800&auto=format&fit=crop",
  ];

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

      {/* Gallery Carousel - Full Bleed */}
      <div className="relative w-full overflow-hidden my-32 lg:my-40 flex gap-4">
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
              <div className="font-display text-7xl font-light text-black mb-4">
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
