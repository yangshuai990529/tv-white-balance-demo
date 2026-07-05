import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';
import { 
  Cpu, 
  Sparkles, 
  Tv, 
  Activity, 
  ShieldCheck, 
  Globe, 
  BadgeCheck, 
  LayoutGrid, 
  Component, 
  TrendingUp,
  LucideIcon
} from 'lucide-react';

const icons: LucideIcon[] = [
  Cpu,
  Sparkles,
  Tv,
  Activity,
  ShieldCheck,
  Globe,
  BadgeCheck,
  LayoutGrid,
  Component,
  TrendingUp
];

export const CoreCapabilities: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-[#02050a]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">核心能力 <span className="text-cyan-500">Capabilities</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {profileData.capabilities.map((cap, idx) => {
            const Icon = icons[idx % icons.length];
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActiveNode(activeNode === idx ? null : idx)}
              className="relative cursor-pointer group"
            >
              <div className={`glass-card rounded-xl p-6 h-full flex flex-col items-center justify-center text-center border transition-all duration-300 ${activeNode === idx ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'border-white/10 hover:border-cyan-500/50 hover:bg-white/5'}`}>
                <Icon className={`mb-4 transition-colors duration-300 ${activeNode === idx ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-300'}`} size={32} />
                <h4 className="text-gray-200 font-medium">{cap}</h4>
              </div>
              
              <AnimatePresence>
                {activeNode === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 glass-card rounded-lg border border-cyan-500/30 z-20 shadow-xl"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 border-t border-l border-cyan-500/30 rotate-45"></div>
                    <p className="text-sm text-gray-300 relative z-10">
                      具备 {cap} 的完整体系规划与落地经验，推动产品从0到1演进。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
