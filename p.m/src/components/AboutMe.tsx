import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { Cpu, Terminal, Layers, Globe, Zap } from 'lucide-react';

const icons = [
  <Terminal className="text-blue-400" size={24} />,
  <Cpu className="text-purple-400" size={24} />,
  <Layers className="text-cyan-400" size={24} />,
  <Globe className="text-emerald-400" size={24} />,
  <Zap className="text-amber-400" size={24} />
];

export const AboutMe: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">关于我 <span className="text-blue-500">About Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.about.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0, 240, 255, 0.15)" }}
              className="glass-card rounded-2xl p-8 flex flex-col items-start gap-4"
            >
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {icons[idx % icons.length]}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
