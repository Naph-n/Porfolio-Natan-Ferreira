import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";

export function Testimonials() {
  const testimonials = [
    {
      text: "As entregas foram muito além do esperado! O design e a usabilidade ficaram animais e deram um up total na experiência do usuário. Mandou muito bem!",
      author: "Igor Araujo",
      role: "Coordenador de Sistemas | Uisa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: "Natan é um profissional dedicado, versátil e extremamente talentoso. Trabalhamos juntos e, ao longo desse período, ele sempre se destacou pela técnica apurada e pela consistência nas entregas.",
      author: "Renan Rosina",
      role: "Coordenador de Marketing e Branding | Forever Liss",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: "Profissional atencioso, detalhista e muito cuidadoso. O processo de construção com o Natan fluiu muito bem, com alinhamento técnico e de expectativas. E ainda assim a entrega surpreendeu positivamente. Recomendo!",
      author: "Gabriela Vieira",
      role: "Dra Gabriela Vieira - Entomologista",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: "Trabalhar com o Natan é sempre uma tranquilidade. Ele entende a essência do Terceiro Setor e consegue elevar o nível de qualquer material. Já trabalhamos em muitos projetos e ele sempre nos surpreende. Um excelente profissional!",
      author: "Claudia Voltolini",
      role: "Presidente | Florescer Ação Social",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: "Tive a oportunidade de trabalhar com um profissional de comunicação altamente estratégico. Os projetos entregaram clareza de mensagem e impacto na comunicação corporativa.",
      author: "Marcelo Speltz",
      role: "Executive Manager | Greentech",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: "Excelente profissional, além de ter uma visão moderna, minimalista e criativa, consegue captar bem a essência do que o cliente espera. Uma parceria que pretendo manter para vários projetos.",
      author: "Emerson Ferreira",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-24 px-6 text-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            Depoimentos
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text="O que dizem sobre meu trabalho" />
          </h3>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Relatos e percepções de clientes e parceiros que já trabalharam comigo e vivenciaram meu processo de perto.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-gray-50 p-8"
            >
              <p className="mb-8 text-base text-gray-700">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="h-12 w-12 shrink-0 aspect-square rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-medium text-black">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
