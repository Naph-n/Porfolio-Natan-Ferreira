import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      text: t('testimonials.t1.text'),
      author: "Igor Araujo",
      role: t('testimonials.t1.role'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: t('testimonials.t2.text'),
      author: "Renan Rosina",
      role: t('testimonials.t2.role'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: t('testimonials.t3.text'),
      author: "Gabriela Vieira",
      role: t('testimonials.t3.role'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: t('testimonials.t4.text'),
      author: "Claudia Voltolini",
      role: t('testimonials.t4.role'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: t('testimonials.t5.text'),
      author: "Marcelo Speltz",
      role: t('testimonials.t5.role'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      text: t('testimonials.t6.text'),
      author: "Emerson Ferreira",
      role: t('testimonials.t6.role'),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    },
  ];

  // Make the arrays even length (6 items) so the alternating background colors loop perfectly
  const row1 = [testimonials[0], testimonials[1], testimonials[2], testimonials[0], testimonials[1], testimonials[2]];
  const row2 = [testimonials[3], testimonials[4], testimonials[5], testimonials[3], testimonials[4], testimonials[5]];

  const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number, key?: string | number }) => {
    // Alternating background colors (very subtle difference)
    const bgColor = index % 2 === 0 ? "bg-gray-50" : "bg-white";

    return (
      <div className={`flex w-[320px] md:w-[400px] lg:w-[450px] shrink-0 flex-col justify-between rounded-3xl border border-gray-100 p-8 ${bgColor}`}>
        <div>
          <div className="mb-6 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <p className="mb-8 text-base text-gray-700">
            "{testimonial.text}"
          </p>
        </div>
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
      </div>
    );
  };

  return (
    <section id="testimonials" className="bg-white py-24 text-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-white mb-6">
            {t('testimonials.badge')}
          </span>
          <h3 className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
            <AnimatedText text={t('testimonials.title')} />
          </h3>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden mt-16 flex flex-col gap-6">
        {/* Row 1 - Moves Left */}
        <div className="flex w-full gap-6">
          <div className="flex shrink-0 animate-marquee gap-6">
            {row1.map((testimonial, index) => (
              <TestimonialCard key={`r1a-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee gap-6" aria-hidden="true">
            {row1.map((testimonial, index) => (
              <TestimonialCard key={`r1b-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-full gap-6">
          <div className="flex shrink-0 animate-marquee-reverse gap-6">
            {row2.map((testimonial, index) => (
              <TestimonialCard key={`r2a-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse gap-6" aria-hidden="true">
            {row2.map((testimonial, index) => (
              <TestimonialCard key={`r2b-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
