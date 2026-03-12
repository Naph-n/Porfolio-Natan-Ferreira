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
import { Preloader } from "./components/Preloader";

import { useLoading } from "./contexts/LoadingContext";

export default function App() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      <div className={`relative min-h-screen selection:bg-blue-500/30 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomScrollbar />
        <LanguageToggle />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
      </div>
    </>
  );
}
