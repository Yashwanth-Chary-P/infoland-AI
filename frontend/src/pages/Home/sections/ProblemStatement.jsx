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
    <section className="py-24 bg-slate-50/50 border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-rose-500"></span>
              The Market Reality
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-[1.2] tracking-tight">
              Unverified property is a financial liability.
            </h3>
            <p className="text-base text-slate-500 mb-8 leading-relaxed">
              Acquiring property without comprehensive mathematical verification exposes buyers to severe legal and financial risks. Traditional manual checks are opaque, error-prone, and fundamentally insufficient for modern transactions.
            </p>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                  <FileX className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Missing Documentation</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Forged or missing chain-of-title documents result in immediate ownership disputes upon registration.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Hidden Litigation</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Pending civil cases and familial disputes are rarely disclosed by sellers or detected by brokers.</p>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-100 to-amber-100 rounded-2xl blur opacity-30"></div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl relative z-10">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Critical Risk Detected</h4>
                    <p className="text-xs font-medium text-slate-500">Acquisition Not Recommended</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-slate-100 text-[10px] font-mono text-slate-500 font-semibold">
                  ALRT-8921
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50/50 p-4 rounded-xl border border-rose-100/50 flex justify-between items-center group cursor-pointer hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">Active Civil Dispute</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Matched against eCourts Grid</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:border-rose-200 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>
                
                <div className="bg-slate-50/50 p-4 rounded-xl border border-amber-100/50 flex justify-between items-center group cursor-pointer hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">Missing Encumbrance Data</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Records missing for 2018-2020</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:border-amber-200 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-xs font-semibold text-slate-700">System Blocked - Manual Review Required</span>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
