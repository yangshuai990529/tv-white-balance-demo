import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useTransform, useScroll } from 'framer-motion';
import { AppleAICore } from './AppleAICore';
import { CoreParticles } from './CoreParticles';
import { MagneticButton } from './MagneticButton';
import { useMousePosition } from '../hooks/useMousePosition';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Hero: React.FC = () => {
  const { smoothMouseX, smoothMouseY } = useMousePosition();
  const [isHoveringCore, setIsHoveringCore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for text
  const textX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);
  
  // Lighting parallax
  const lightX = useTransform(smoothMouseX, [-1, 1], [-2, 2]);
  const lightY = useTransform(smoothMouseY, [-1, 1], [2, -2]);

  // Framer Motion scroll for fading/scaling the core during transition
  const { scrollY } = useScroll();
  const coreY = useTransform(scrollY, [0, 1000], [0, -300]);
  const coreScale = useTransform(scrollY, [0, 1000], [1, 1.5]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Detect when mouse is close to center to trigger magnetic field
  const handleMouseMove = (e: React.MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
    if (dist < 300) {
      if (!isHoveringCore) setIsHoveringCore(true);
    } else {
      if (isHoveringCore) setIsHoveringCore(false);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[150vh] w-full flex flex-col items-center bg-[#000000] overflow-hidden"
    >
      {/* 3D Canvas (Sticky fixed in the background for cinematic scroll) */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          style={{ y: coreY, scale: coreScale }} 
          className="w-full h-full"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
            {/* Extremely soft studio environment reflection */}
            <Environment preset="studio" />
            
            <ambientLight intensity={0.1} />
            
            {/* Cold white key light */}
            <motion.directionalLight 
              position-x={lightX as any} 
              position-y={lightY as any} 
              position-z={5} 
              intensity={2.0} 
              color="#ffffff" 
            />
            
            {/* Blue rim light for premium glass edges */}
            <directionalLight position={[-5, 5, -2]} intensity={1.5} color="#2997FF" />
            <directionalLight position={[5, -5, -2]} intensity={0.5} color="#0055ff" />

            <AppleAICore mouseX={smoothMouseX} mouseY={smoothMouseY} isHovering={isHoveringCore} />
            <CoreParticles mouseX={smoothMouseX} mouseY={smoothMouseY} isHovering={isHoveringCore} />

            {/* Very soft bloom */}
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.2} radius={0.4} />
            </EffectComposer>
          </Canvas>
        </motion.div>
      </div>

      {/* Foreground UI Content */}
      <motion.div 
        style={{ x: textX, y: textY, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 pt-[55vh] pointer-events-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-[#F5F5F7]"
        >
          杨帅
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-xl md:text-2xl font-medium mb-12 text-[#86868B] tracking-wide"
        >
          AI Terminal Product Manager
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-base md:text-lg text-[#F5F5F7] leading-relaxed max-w-lg mx-auto mb-16 tracking-wide font-light"
        >
          Building AI-native experiences for Smart TV,<br />
          Picture Quality,<br />
          and Intelligent Terminal Systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton variant="glass">
            Resume
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};
