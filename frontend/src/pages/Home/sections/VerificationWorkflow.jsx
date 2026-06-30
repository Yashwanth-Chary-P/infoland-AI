import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

const VerificationWorkflow = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    { 
      id: 1, 
      title: 'Query Initiated', 
      desc: 'Property ID matched against state database.', 
      status: 'complete',
      timestamp: '0ms'
    },
    { 
      id: 2, 
      title: 'Records Retrieved', 
      desc: 'Extracted 14 core documents from municipal and central registries.', 
      status: 'complete',
      timestamp: '142ms'
    },
    { 
      id: 3, 
      title: 'Ownership Validation', 
      desc: 'Tracing chain of title over the last 30 years. No discontinuities found.', 
      status: 'complete',
      timestamp: '450ms'
    },
    { 
      id: 4, 
      title: 'Financial Checks', 
      desc: 'Scanning CERSAI and state databases for active hypothecations.', 
      status: 'complete',
      timestamp: '890ms'
    },
    { 
      id: 5, 
      title: 'Litigation Scan', 
      desc: 'Cross-referencing eCourts for pending civil disputes matching owner names.', 
      status: 'warning',
      timestamp: '1.2s'
    },
    { 
      id: 6, 
      title: 'Generating Report', 
      desc: 'Compiling findings into a unified intelligence report.', 
      status: 'loading',
      timestamp: '1.4s'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-blue-600"></span>
              Verification Pipeline
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-[1.2] tracking-tight">
              A legal team's weeks,<br/>reduced to seconds.
            </h3>
            <p className="text-base text-slate-500 mb-6 leading-relaxed">
              Traditional property verification is manual, error-prone, and painfully slow. The InfoLand pipeline automates hundreds of critical checks sequentially, building mathematical confidence in a property's safety.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              From extracting initial records to cross-referencing national litigation grids, every step is transparently logged.
            </p>
          </motion.div>

          {/* Execution Pipeline Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl blur opacity-20"></div>
            <div className="bg-[#0A0A0A] rounded-2xl border border-slate-800 p-6 md:p-8 font-mono text-sm relative z-10 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-slate-300 font-semibold text-xs tracking-wider">PIPELINE EXECUTION</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px]">PID: 44-A9</span>
                </div>
                <div className="text-slate-500 text-xs">Status: Running</div>
              </div>

              <div className="relative pl-1">
                {/* Vertical alignment line */}
                <div className="absolute left-[11px] top-4 bottom-8 w-px bg-slate-800">
                  <motion.div 
                    className="w-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    initial={{ height: 0 }}
                    animate={inView ? { height: '85%' } : { height: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  />
                </div>

                <div className="space-y-6">
                  {steps.map((step, idx) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ duration: 0.4, delay: 0.4 + (idx * 0.25) }}
                      className="relative flex items-start pl-10 group"
                    >
                      {/* Status Marker */}
                      <div className="absolute left-[-2px] bg-[#0A0A0A] py-1">
                        {step.status === 'complete' && <CheckCircle2 className="w-[18px] h-[18px] text-slate-400 bg-[#0A0A0A]" />}
                        {step.status === 'warning' && <AlertTriangle className="w-[18px] h-[18px] text-amber-500 bg-[#0A0A0A]" />}
                        {step.status === 'loading' && <Loader2 className="w-[18px] h-[18px] text-blue-500 animate-spin bg-[#0A0A0A]" />}
                      </div>

                      <div className="flex-1 -mt-0.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-semibold tracking-wide ${step.status === 'complete' ? 'text-slate-300' : step.status === 'warning' ? 'text-amber-400' : 'text-blue-400'}`}>
                            {step.title}
                          </span>
                          <span className="text-slate-600 text-[10px] font-medium">{step.timestamp}</span>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                        
                        {step.status === 'warning' && (
                           <div className="mt-2.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] leading-relaxed">
                             WARN: Found 1 potential name match in eCourts. Requires manual review.
                           </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VerificationWorkflow;
