import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// Local premium custom SVG files provided or created for the user
const LOGOS = [
  '/logos/rustik.svg',
  '/logos/nolook.svg',
  '/logos/vida.svg',
  '/logos/biolusa.svg',
  '/logos/florescer.svg',
  '/logos/uisa.svg',
  '/logos/logo65.svg',
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
                      logoUrl.toUpperCase().includes('NOLOOK')
                        ? 'max-h-[16px] md:max-h-[18px] lg:max-h-[22px]'
                        : logoUrl.toUpperCase().includes('VIDA')
                          ? 'max-h-[25px] md:max-h-[30px] lg:max-h-[35px]'
                          : logoUrl.toUpperCase().includes('65')
                            ? 'max-h-[22px] md:max-h-[26px] lg:max-h-[30px]'
                            : logoUrl.toUpperCase().includes('UISA')
                              ? 'max-h-[18px] md:max-h-[21px] lg:max-h-[24px]'
                            : logoUrl.toUpperCase().includes('RUSTIK')
                              ? 'max-h-10 md:max-h-12 lg:max-h-14'
                              : 'max-h-6 md:max-h-8 lg:max-h-10'
                    }`}
                    onError={(e) => {
                      // Silently apply safe fallback without noisy console.error to avoid validation error alarms
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const span = document.createElement('span');
                        span.className = 'fallback-text text-[10px] text-white/50 font-bold uppercase tracking-wider';
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
