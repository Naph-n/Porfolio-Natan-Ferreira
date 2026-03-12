import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";

export function Portfolio() {
  const links = [
    {
      title: "Behance",
      description: "No meu Behance você encontra a versão completa do meu trabalho: estudos, processos, bastidores e cada decisão criativa que constrói as narrativas visuais que desenvolvo. É onde apresento meus projetos com mais detalhe, da concepção ao resultado final mostrando como transformo ideias em experiências que conectam. Se você curte ver o processo por trás das ideias e entender como cada prejeto se constrói, é só acessar e conferir.",
      href: "https://www.behance.net/natanaeferreir7",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Instagram - @naph.n",
      description: "No Instagram você acompanha um lado mais vivo e espontâneo do meu trabalho: bastidores, experimentos visuais, reflexões e um pouco do que inspira minha jornada como profissional criativo. É onde compartilho processos, pequenas histórias e a estética que guia tudo o que faço. Siga para conhecer mais sobre mim e sobre o meu universo criativo. Se quiser me acompanhar de um jeito mais real e direto, o Instagram é onde tudo aparece primeiro. Sem filtro, do jeito que acontece.",
      href: "https://www.instagram.com/naph.n/",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="our-work" className="bg-[#111] py-24 px-6 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white mb-6">
            Portfólio
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text="Como transformo criatividade" delay={0.1} /><br />
            <AnimatedText text="em " delay={0.3} /><span className="text-blue-500"><AnimatedText text="estratégia visual" delay={0.4} /></span>
          </h3>
        </motion.div>

        <div className="flex flex-col gap-12">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#1a1a1a] p-8 transition-colors hover:bg-[#222] md:grid-cols-2 md:p-12"
            >
              <div className="flex flex-col justify-center">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
                <h4 className="mb-4 font-display text-3xl font-normal text-white">{link.title}</h4>
                <p className="mb-8 text-base text-white/60">{link.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500">
                  Acessar
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-auto">
                <img
                  src={link.image}
                  alt={link.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
