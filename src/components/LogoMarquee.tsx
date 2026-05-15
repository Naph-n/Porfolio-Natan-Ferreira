import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// Direct public URLs provided by the user
const LOGOS = [
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/RUSTIK.svg',
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/NOLOOK.svg',
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/Igreja%20Batista%20Vida.svg',
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/Logo%20Png.png',
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/FLORESCER.svg',
  'https://storage.googleapis.com/studiovozeverso/Logos%20Empresas/UISA.svg',
];

export const LogoMarquee: React.FC = () => {
  const { t } = useLanguage();
  
  // Use a smaller multiple if the list is long enough, or keep 4 for safety
  const displayLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full overflow-hidden pt-64 pb-32 md:pt-80 md:pb-48 bg-transparent">
      <div className="max-w-5xl mx-auto px-8 md:px-12 relative">
        {/* Side gradients for fading effect within the central container */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none" />
        
        <div className="flex flex-col items-center gap-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium"
          >
            Trusted by
          </motion.p>
          
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex gap-4 items-center md:gap-8"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {displayLogos.map((logoUrl, index) => (
                <div
                  key={`${index}`}
                  className="flex h-16 w-28 md:w-36 shrink-0 items-center justify-center cursor-pointer group px-2"
                >
                  <img
                    src={logoUrl}
                    alt="Partner Logo"
                    className={`h-full w-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 brightness-0 invert ${
                      logoUrl.includes('NOLOOK') || logoUrl.includes('UISA') 
                        ? 'max-h-5 md:max-h-6' 
                        : logoUrl.includes('RUSTIK')
                          ? 'max-h-12 md:max-h-14'
                          : 'max-h-8 md:max-h-10'
                    }`}
                    onError={(e) => {
                      console.error(`Failed to load logo: ${logoUrl}`);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const span = document.createElement('span');
                        span.className = 'fallback-text text-[10px] text-white/50 font-bold uppercase';
                        span.innerText = logoUrl.split('/').pop()?.split('.')[0]?.replace(/%20/g, ' ') || 'LOGO';
                        parent.appendChild(span);
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
