import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">联系我 <span className="text-blue-500">Contact</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-12"></div>
          
          <p className="text-xl text-gray-400 mb-12">
            期待与您交流 AI 产品创新、智能终端体验设计与合作机会。
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
            <motion.a 
              href="mailto:ys1147911877@163.com"
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card flex items-center gap-4 px-8 py-4 rounded-2xl border-white/10 hover:border-blue-500/50 transition-colors"
            >
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                <Mail size={24} />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-white font-medium">ys1147911877@163.com</div>
              </div>
            </motion.a>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card flex items-center gap-4 px-8 py-4 rounded-2xl border-white/10 hover:border-blue-500/50 transition-colors"
            >
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                <Phone size={24} />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400">Phone</div>
                <div className="text-white font-medium">155 2638 2152</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <footer className="border-t border-white/10 pt-8 mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} 杨帅. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-50">Built with React, Vite, Tailwind CSS & Three.js</p>
      </footer>
    </section>
  );
};
