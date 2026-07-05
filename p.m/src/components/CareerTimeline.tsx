import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

export const CareerTimeline: React.FC = () => {
  return (
    <section id="career" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">工作经历 <span className="text-purple-500">Career</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-purple-500/0 transform md:-translate-x-1/2"></div>

          {profileData.timeline.map((exp, idx) => (
            <div key={idx} className={`relative flex items-center justify-between mb-16 md:mb-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Center Node */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#030712] transform -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block w-5/12"></div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="w-full md:w-5/12 pl-8 md:pl-0"
              >
                <div className="glass-card rounded-2xl p-6 md:p-8 relative group border border-white/10 hover:border-blue-500/50 transition-colors duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>
                  
                  <div className="relative z-10">
                    <div className="text-blue-400 font-mono text-sm mb-2">{exp.period}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-xl text-gray-400 mb-6 font-medium">{exp.company}</div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded border border-gray-700 bg-gray-800/50 text-gray-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
