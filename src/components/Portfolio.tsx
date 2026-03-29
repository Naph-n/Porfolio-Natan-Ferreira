import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";
import { InteractiveButton } from "./ui/InteractiveButton";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function Portfolio() {
  const { t } = useLanguage();

  const links = [
    {
      title: t('portfolio.p1.title'),
      description: t('portfolio.p1.desc'),
      href: "https://www.behance.net/natanaeferreir7",
      image: "https://framerusercontent.com/images/4TKOpYQhWUolL0xFd51PDZGrQ.png?width=1441&height=674",
    },
    {
      title: t('portfolio.p2.title'),
      description: t('portfolio.p2.desc'),
      href: "https://www.instagram.com/naph.n/",
      image: "https://framerusercontent.com/images/J8mNsGekYsZ8avro8XiZDXqCaeE.jpg?width=1080&height=1350",
    },
  ];

  return (
    <section id="our-work" className="bg-[#111] pt-32 pb-32 md:pb-48 lg:pb-64 px-6 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white mb-6">
            {t('portfolio.badge')}
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text={t('portfolio.title1')} delay={0.1} /><br />
            <span className="inline-block whitespace-nowrap">
              <AnimatedText text={t('portfolio.title2')} delay={0.3} />
              <span className="text-blue-500">
                <AnimatedText text={t('portfolio.title3')} delay={0.4} />
              </span>
            </span>
            <span className="text-blue-500">
              <br className="sm:hidden" />
              <span className="hidden sm:inline">&nbsp;</span>
              <AnimatedText text={t('portfolio.title4')} delay={0.5} />
            </span>
          </h3>
        </motion.div>

        <div className="flex flex-col gap-12">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('portfolio.cta')}: ${link.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group/card relative grid gap-8 overflow-hidden rounded-[2rem] bg-[#1a1a1a] p-8 transition-colors hover:bg-[#222] md:min-h-[500px] lg:min-h-[600px] md:grid-cols-2 md:p-12"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="mb-4 font-display text-3xl font-normal text-white">{link.title}</h4>
                  <p className="text-base text-white/60">{link.description}</p>
                </div>
                <InteractiveButton
                  as="div"
                  className="mt-8 w-fit rounded-full bg-blue-600 pl-8 pr-3 py-3 text-base font-medium"
                  circleClassName="right-3 h-10 w-10 bg-white"
                >
                  {t('portfolio.cta')}
                </InteractiveButton>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-auto">
                <img
                  src={link.image}
                  alt={link.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
