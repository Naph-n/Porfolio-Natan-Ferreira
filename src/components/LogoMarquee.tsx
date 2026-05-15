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
    <div className="relative w-full overflow-hidden pt-12 pb-12 md:pt-32 md:pb-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
        {/* Use mask-image for a cleaner fade that doesn't cut off background images */}
        <div 
          className="flex flex-col items-center gap-8 md:gap-12"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
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
                        ? 'max-h-4 md:max-h-5 lg:max-h-6' 
                        : logoUrl.includes('RUSTIK')
                          ? 'max-h-10 md:max-h-12 lg:max-h-14'
                          : 'max-h-6 md:max-h-8 lg:max-h-10'
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
