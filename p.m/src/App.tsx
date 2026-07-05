import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen text-[#F5F5F7] font-sans selection:bg-[#2997FF]/30">
      <Hero />
      {/* 
      Future sections will be re-added here later...
      <div className="h-screen w-full flex items-center justify-center border-t border-[#111]">
        <h2 className="text-3xl text-[#86868B]">Next Chapter...</h2>
      </div>
      */}
    </div>
  );
}

export default App;
