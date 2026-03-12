import { motion } from "motion/react";
import { useState } from "react";
import { Plus, Minus, MonitorPlay, Camera, PenTool, Layout, Layers, Video } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const services = [
    {
      icon: <Video className="h-5 w-5 text-blue-600" />,
      title: "Brand Films",
      description: "Criação de filmes institucionais e comerciais que traduzem a essência de marcas e pessoas, unindo narrativa, estética e propósito.",
    },
    {
      icon: <Camera className="h-5 w-5 text-blue-600" />,
      title: "Audiovisual",
      description: "Produção de vídeos para campanhas, redes sociais e produtos, com cuidado técnico, luz precisa e storytelling alinhado à estratégia.",
    },
    {
      icon: <PenTool className="h-5 w-5 text-blue-600" />,
      title: "Design Gráfico",
      description: "Construção de identidades visuais, peças digitais e materiais gráficos.",
    },
    {
      icon: <Layers className="h-5 w-5 text-blue-600" />,
      title: "Direção Criativa & Fotografia",
      description: "Concepção visual completa para projetos que precisam de identidade forte e narrativa.",
    },
    {
      icon: <Layout className="h-5 w-5 text-blue-600" />,
      title: "UX Design",
      description: "Pesquisa, estruturação e prototipação de experiências digitais focadas em clareza, fluxo eficiente e usabilidade.",
    },
    {
      icon: <MonitorPlay className="h-5 w-5 text-blue-600" />,
      title: "Motion Design",
      description: "Animações que comunicam com ritmo e intenção. Criação de movimentos, transições e composições visuais.",
    },
  ];

  return (
    <section id="services" className="bg-[#f8f9fa] py-24 px-6 text-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            Serviços
          </span>
          <h3 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
            <AnimatedText text="O que fazemos?" />
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Descubra qual dos meus serviços melhor atende às necessidades do seu projeto.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" 
              alt="Service" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
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
                  onClick={() => setOpenIndex(index)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      {service.icon}
                    </div>
                    <span className="font-display text-xl font-medium text-black">
                      {service.title}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pl-14 text-gray-600">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
