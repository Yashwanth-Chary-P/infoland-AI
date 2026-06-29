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
    <section className="py-24 bg-slate-50 border-t border-slate-200" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 md:w-2/3"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to verify with certainty?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl">
              Join the platform that is bringing absolute transparency to property acquisition. Create your free account today to explore verified properties.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link to="/register">
                <Button size="lg" className="group">
                  Create Free Account
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">
                  Contact Enterprise Sales
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
              <Link to="/about" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <Info className="w-4 h-4" />
                Read our methodology
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
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
