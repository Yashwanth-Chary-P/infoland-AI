import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, FileX, Scale, ChevronRight } from 'lucide-react';

const ProblemStatement = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 bg-white border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">The Market Reality</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Unverified property is a financial liability.
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Acquiring property without comprehensive mathematical verification exposes buyers to severe legal and financial risks. Traditional manual checks are opaque, error-prone, and fundamentally insufficient for modern transactions.
            </p>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <FileX className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Missing Documentation</h4>
                  <p className="text-sm text-slate-600 mt-1">Forged or missing chain-of-title documents result in immediate ownership disputes upon registration.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hidden Litigation</h4>
                  <p className="text-sm text-slate-600 mt-1">Pending civil cases and familial disputes are rarely disclosed by sellers or detected by brokers.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Realistic Alert Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full relative"
          >
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-xl relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Critical Risk Detected</h4>
                  <p className="text-sm text-slate-500">Acquisition Not Recommended</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Active Civil Dispute</p>
                    <p className="text-xs text-slate-500 mt-0.5">Matched against eCourts Grid</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Missing Encumbrance Data</p>
                    <p className="text-xs text-slate-500 mt-0.5">Records missing for 2018-2020</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">REPORT ID: ALRT-8921</span>
                <span className="text-xs font-bold text-red-600 uppercase">System Blocked</span>
              </div>
            </div>
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-red-100/50 to-amber-50/50 rounded-full blur-[80px] -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
