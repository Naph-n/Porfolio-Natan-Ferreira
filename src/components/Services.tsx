import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus, MonitorPlay, Camera, PenTool, Layout, Layers, Video, Monitor } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const services = [
    {
      icon: <Video className="h-8 w-8 text-blue-600" strokeWidth={1.5} />,
      title: t('services.s1.title'),
      description: t('services.s1.desc'),
      image: "https://framerusercontent.com/images/8sxcIE8SqhO4Y5dBt49jo1XfTQ.jpg?width=819&height=1024"
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600" strokeWidth={1.5} />,
      title: t('services.s2.title'),
      description: t('services.s2.desc'),
      image: "https://framerusercontent.com/images/8945PiG8F5HC98uXVZI3iGl0c7M.jpg?width=819&height=1024"
    },
    {
      icon: <PenTool className="h-8 w-8 text-blue-600" strokeWidth={1.5} />,
      title: t('services.s3.title'),
      description: t('services.s3.desc'),
      image: "https://framerusercontent.com/images/NFKxJY6VRfVd8PVd2Yo86uXCOg.jpg?width=819&height=1024"
    },
    {
      icon: <Layers className="h-8 w-8 text-blue-600" strokeWidth={1.5} />,
      title: t('services.s4.title'),
      description: t('services.s4.desc'),
      image: "https://framerusercontent.com/images/HtO2WBzVgCG11KMOJq1xmZqmg.jpg?width=819&height=1024"
    },
    {
      icon: <Layout className="h-8 w-8 text-blue-600" strokeWidth={1.5} />,
      title: t('services.s5.title'),
      description: t('services.s5.desc'),
      image: "https://framerusercontent.com/images/v7EZjAXKaikiVYcxU3YVRrtjs.jpg?width=819&height=1024"
    },
    {
      icon: <MonitorPlay className="h-8 w-8 text-blue-400" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />,
      title: t('services.s6.title'),
      description: t('services.s6.desc'),
      image: "https://framerusercontent.com/images/xmWxmcd8Pgc7uUqSygvL6PRYJY.gif?width=818&height=1024"
    },
    {
      icon: <Monitor className="h-8 w-8 text-blue-400" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />,
      title: t('services.s7.title'),
      description: t('services.s7.desc'),
      image: "https://framerusercontent.com/images/WBfnCJZCa6fqgbKw26k7qJi04c.jpg?width=2500&height=1667"
    },
  ];

  return (
    <section id="services" className="bg-[#f8f9fa] pt-32 pb-32 md:pb-48 lg:pb-64 px-6 text-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            {t('services.badge')}
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-5xl text-center flex justify-center">
            <AnimatedText text={t('services.title')} className="justify-center" />
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/5] lg:aspect-auto h-full min-h-[400px] w-full overflow-hidden rounded-3xl bg-gray-200 relative"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={openIndex ?? 'default'}
                src={services[openIndex ?? 0].image} 
                alt={`Service Image: ${services[openIndex ?? 0].title}`} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="font-display text-xl font-medium text-black">
                      {service.title}
                    </span>
                  </div>
                  <span className="text-blue-600">
                    <div className="relative h-4 w-4">
                      <motion.div
                        className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-current"
                        animate={{ rotate: openIndex === index ? 0 : 90 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-current"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </div>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 text-gray-600">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
