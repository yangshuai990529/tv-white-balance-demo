import React from 'react';
import { motion } from 'framer-motion';
import { demoGalleryData } from '../data/projects';
import { Play, Code, ExternalLink } from 'lucide-react';

export const DemoGallery: React.FC = () => {
  return (
    <section id="demos" className="py-24 relative overflow-hidden bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">交互展示区 <span className="text-pink-500">Demo Gallery</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoGalleryData.map((demo, idx) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-pink-500/30"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/50 backdrop-blur-sm">
                  <button className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-400 transition-colors transform group-hover:scale-110 duration-300">
                    <Play className="ml-1" size={24} />
                  </button>
                </div>
                {/* Fallback pattern since image might not exist */}
                <div className="w-full h-full bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%,transparent_75%,#1f2937_75%,#1f2937),linear-gradient(45deg,#1f2937_25%,transparent_25%,transparent_75%,#1f2937_75%,#1f2937)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-20"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{demo.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {demo.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded bg-white/5 text-gray-300 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                  <a href={demo.previewUrl} className="flex-1 flex items-center justify-center py-2 rounded bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 transition-colors text-sm font-medium">
                    <ExternalLink size={16} className="mr-2" /> 在线预览
                  </a>
                  <a href={demo.githubUrl} className="p-2 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Code size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
