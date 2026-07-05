import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'glass';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  variant = 'glass',
  className = '',
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic pull springs
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  // Slight lift on hover
  const z = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull strength (very subtle, Apple style)
    const strength = 12;
    
    const moveX = ((e.clientX - centerX) / (width / 2)) * strength;
    const moveY = ((e.clientY - centerY) / (height / 2)) * strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    z.set(5); // slight lift
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    z.set(0);
  };

  const baseClasses = "relative px-8 py-3.5 rounded-full font-medium tracking-wide transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]";
  
  const variantClasses = variant === 'primary' 
    ? "bg-[#2997FF] text-white hover:bg-[#3E9FFF]" 
    : "bg-[rgba(255,255,255,0.05)] text-[#F5F5F7] border border-[rgba(255,255,255,0.1)] backdrop-blur-md hover:bg-[rgba(255,255,255,0.08)]";

  return (
    <motion.button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, z }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
