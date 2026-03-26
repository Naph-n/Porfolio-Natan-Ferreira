import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { AnimatedText } from "./ui/AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

export function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.q1.q'),
      answer: t('faq.q1.a'),
    },
    {
      question: t('faq.q2.q'),
      answer: t('faq.q2.a'),
    },
    {
      question: t('faq.q3.q'),
      answer: t('faq.q3.a'),
    },
    {
      question: t('faq.q4.q'),
      answer: t('faq.q4.a'),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-[#f8f9fa] pt-32 pb-32 md:pb-48 lg:pb-64 px-6 text-black">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            {t('faq.badge')}
          </span>
          <h3 className="font-display text-3xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text={t('faq.title1')} /><br />
            <AnimatedText text={t('faq.title2')} />
          </h3>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            {t('faq.subtitle')}
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
