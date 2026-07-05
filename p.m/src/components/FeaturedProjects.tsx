import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ArrowRight } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">项目作品 <span className="text-emerald-500">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group perspective"
            >
              <div className="glass-card rounded-3xl p-1 h-full transform-gpu transition-transform duration-500 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/30">
                <div className="bg-[#0a0f18]/80 rounded-[22px] p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Decorative background element */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        展示重点
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.highlights.map((highlight, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      <button className="flex items-center text-sm font-medium text-white group/btn">
                        查看详情 
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
