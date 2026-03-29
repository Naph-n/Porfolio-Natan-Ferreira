/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { CustomScrollbar } from "./components/CustomScrollbar";
import { LanguageToggle } from "./components/LanguageToggle";
import { BackToTop } from "./components/BackToTop";
import { Preloader } from "./components/Preloader";
import { Curve } from "./components/ui/Curve";

import { useLoading } from "./contexts/LoadingContext";

export default function App() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen selection:bg-blue-500/30">
          <CustomScrollbar />
          <BackToTop />
          <LanguageToggle />
          <Navbar />
          <main>
            <Hero />
            
            {/* Hero to About - Mantendo a primeira transição arredondada */}
            <div className="relative z-20 -mt-[60px] md:-mt-[80px] lg:-mt-[100px]">
              <Curve color="white" />
            </div>
            <About />

            <Services />

            <Portfolio />

            <Testimonials />

            <FAQ />
            
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
