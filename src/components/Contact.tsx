import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { AnimatedText } from "./ui/AnimatedText";

export function Contact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 px-6 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white mb-6">
            Contato
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text="Entre em contato" />
          </h3>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/70">
            Para quaisquer dúvidas, entre em contato conosco através dos dados fornecidos ao lado.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-[#111] p-8 md:p-12"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="mb-2 font-display text-xl font-normal text-white">Escritório</h4>
                <p className="text-white/60">Mato Grosso - Brasil</p>
                <p className="text-white/60">167-169 Great Portland Street, W1W 5PF</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="mb-2 font-display text-xl font-normal text-white">E-mail</h4>
                <a href="mailto:natan.furtado@outlook.com" className="text-white/60 hover:text-blue-500 transition-colors">
                  natan.furtado@outlook.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="mb-2 font-display text-xl font-normal text-white">Telefone</h4>
                <a href="tel:65999279386" className="text-white/60 hover:text-blue-500 transition-colors">
                  65 999279386
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-white/10 bg-[#111] p-8 md:p-12"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Nome*</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500 focus:bg-white/10"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">E-mail*</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500 focus:bg-white/10"
                    placeholder="Seu e-mail"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-white/80">Número de Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500 focus:bg-white/10"
                  placeholder="Seu telefone"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Mensagem*</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500 focus:bg-white/10"
                  placeholder="Como posso ajudar?"
                />
              </div>

              <InteractiveButton
                type="submit"
                className="mt-4 w-full rounded-xl bg-blue-600 pl-8 pr-3 py-3 font-semibold"
                circleClassName="right-3 h-10 w-10 bg-white"
              >
                Enviar Mensagem
              </InteractiveButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
