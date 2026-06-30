import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Info, Mail } from 'lucide-react';
import Button from '../../../components/common/Button';

const CtaSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="bg-[#0A0A0A] rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Decor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 md:w-2/3"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Ready to verify with certainty?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              Join the platform that is bringing absolute transparency to property acquisition. Create your free account today to explore verified properties.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link to="/register">
                <Button size="lg" className="group bg-white text-slate-900 hover:bg-slate-100 border-transparent rounded-xl px-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Create Free Account
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="text-slate-300 hover:bg-white/10 hover:text-white rounded-xl px-6">
                  Contact Enterprise Sales
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-10 border-t border-white/10">
              <Link to="/about" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors group">
                <Info className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                Read our methodology
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                Business inquiries
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
