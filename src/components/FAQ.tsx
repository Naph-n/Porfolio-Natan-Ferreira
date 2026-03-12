import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { AnimatedText } from "./ui/AnimatedText";

export function FAQ() {
  const faqs = [
    {
      question: "Quais serviços você oferece exatamente?",
      answer: "Minha atuação abrange desde o Design Gráfico e a manipulação avançada de imagens até o desenvolvimento de interfaces no UI/UX Design. No campo audiovisual, realizo a captação de vídeo, edição de vídeo, fotografia e iluminação, além de produções complexas em Motion Design 2D e noções de 3D, sempre integrando o design de áudio para criar experiências imersivas. Também possuo sólida experiência na gestão de projetos, eventos e comunicação corporativa, o que me permite entregar soluções de ponta a ponta.",
    },
    {
      question: "Você trabalha em projetos isolados ou em demandas completas?",
      answer: "Estou disponível para ambos os formatos, dependendo da necessidade do cliente.",
    },
    {
      question: "Quais ferramentas e tecnologias compõem o seu fluxo de trabalho?",
      answer: "Para garantir um alto padrão de qualidade, utilizo ferramentas de referência na indústria, como a suite Adobe para manipulação de imagem, edição de vídeo e animação. Integro softwares de modelagem 3D e design de áudio para dar profundidade aos meus projetos de motion e vídeo. Para o design de produtos digitais, utilizo o Figma em fluxos de prototipação. Além do software, aplico conhecimentos técnicos avançados em equipamentos de luz e câmera para capturar imagens que exigem o mínimo de pós-produção e o máximo de impacto visual.",
    },
    {
      question: "Como funciona o processo de orçamento e prazos?",
      answer: "O processo começa com um entendimento profundo do briefing para identificar as particularidades e o alcance de cada projeto. Com base nisso, elaboro uma proposta personalizada que detalha os prazos de entrega e as etapas de revisão. Acredito na transparência e no cumprimento rigoroso de cronogramas, mantendo uma comunicação constante para que o resultado final reflita exatamente a necessidade estética do projeto.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-[#f8f9fa] py-24 px-6 text-black">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            FAQs
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text="Respondendo às suas perguntas" />
          </h3>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Tem mais perguntas? Envie-nos sua dúvida abaixo.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 sm:p-8"
              >
                <span className="font-display text-lg font-normal text-black sm:text-xl">
                  {faq.question}
                </span>
                <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-blue-600 transition-transform">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-base text-gray-600 sm:px-8 sm:pb-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
