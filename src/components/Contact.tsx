import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Dribbble, Loader2, CheckCircle2 } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { AnimatedText } from "./ui/AnimatedText";
import { Footer } from "./Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/enviar-contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setErrorMsg(result.message || result.error || "Erro ao enviar mensagem. Tente novamente.");
        console.error("Erro no envio:", result);
      }
    } catch (error) {
      setErrorMsg("Erro de conexão. Verifique sua internet.");
      console.error("Erro ao enviar contato:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#f8f9fa] px-1 pb-1 md:px-2 md:pb-2">
      <div className="w-full rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0a] px-6 pt-16 pb-6 sm:px-12 sm:pt-20 sm:pb-12 lg:px-16 lg:pb-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Header & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <span className="mb-6 w-fit rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white">
              {t('contact.badge')}
            </span>
            <h3 className="mb-6 font-display text-5xl font-normal tracking-tight sm:text-6xl">
              <AnimatedText text={t('contact.title')} />
            </h3>
            <p className="mb-12 max-w-md text-lg text-white/70">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                  <MapPin size={24} strokeWidth={1.25} />
                </div>
                <div>
                  <h4 className="mb-2 font-display text-xl font-normal text-white">{t('contact.office')}</h4>
                  <p className="text-white/60">Mato Grosso - Brasil</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                  <Mail size={24} strokeWidth={1.25} />
                </div>
                <div>
                  <h4 className="mb-2 font-display text-xl font-normal text-white">{t('contact.email')}</h4>
                  <a href="mailto:natan.furtado@outlook.com" className="text-white/60 hover:text-blue-500 transition-colors">
                    natan.furtado@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
                  <Phone size={24} strokeWidth={1.25} />
                </div>
                <div>
                  <h4 className="mb-2 font-display text-xl font-normal text-white">{t('contact.phone')}</h4>
                  <a href="tel:65999279386" className="text-white/60 hover:text-blue-500 transition-colors">
                    65 999279386
                  </a>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/naph.n/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  <Instagram size={20} strokeWidth={1.25} />
                </a>
                <a 
                  href="https://linkedin.com/in/natan-ferreira" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  <Linkedin size={20} strokeWidth={1.25} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-blue-600 hover:text-white">
                  <Dribbble size={20} strokeWidth={1.25} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex h-full flex-col rounded-[2rem] bg-[#111] p-8 md:p-12"
          >
            <form className="flex h-full flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={isSubmitting || isSuccess}
                      className="rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 disabled:opacity-50"
                      placeholder={t('contact.form.name.placeholder')}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={isSubmitting || isSuccess}
                      className="rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 disabled:opacity-50"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white/80">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    disabled={isSubmitting || isSuccess}
                    className="rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 disabled:opacity-50"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={isSubmitting || isSuccess}
                    className="resize-none rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 disabled:opacity-50"
                    placeholder={t('contact.form.message.placeholder')}
                  />
                </div>
              </div>

              <div className="mt-auto pt-8">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20"
                  >
                    {errorMsg}
                  </motion.div>
                )}
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-black"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                    >
                      <CheckCircle2 size={24} className="text-green-500" strokeWidth={2.5} />
                    </motion.div>
                    <span className="font-medium">{t('contact.form.success')}</span>
                  </motion.div>
                ) : (
                  <InteractiveButton
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl bg-blue-600 pl-8 pr-3 py-3 font-normal ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    circleClassName="right-3 h-10 w-10 bg-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin" />
                        {t('contact.form.submitting')}
                      </span>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </InteractiveButton>
                )}
              </div>
            </form>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  </section>
  );
}
