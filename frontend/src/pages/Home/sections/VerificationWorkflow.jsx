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
    <section className="py-32 bg-white border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Pipeline</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              A legal team's weeks,<br/>reduced to seconds.
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Traditional property verification is manual, error-prone, and painfully slow. The InfoLand pipeline automates hundreds of critical checks sequentially, building mathematical confidence in a property's safety.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              From extracting initial records to cross-referencing national litigation grids, every step is transparently logged.
            </p>
          </motion.div>

          {/* Execution Pipeline Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 md:p-10 font-mono text-sm relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">PIPELINE EXECUTION</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs">PID: 44-A9</span>
              </div>
              <div className="text-slate-500">Status: Running</div>
            </div>

            <div className="relative">
              {/* Vertical alignment line */}
              <div className="absolute left-[9px] top-4 bottom-8 w-0.5 bg-slate-800">
                <motion.div 
                  className="w-full bg-emerald-500"
                  initial={{ height: 0 }}
                  animate={inView ? { height: '80%' } : { height: 0 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
              </div>

              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.4 + (idx * 0.3) }}
                    className="relative flex items-start pl-10 group"
                  >
                    {/* Status Marker */}
                    <div className="absolute left-0 bg-slate-900 py-1">
                      {step.status === 'complete' && <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-slate-900" />}
                      {step.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 bg-slate-900" />}
                      {step.status === 'loading' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin bg-slate-900" />}
                    </div>

                    <div className="flex-1 -mt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold ${step.status === 'complete' ? 'text-slate-200' : step.status === 'warning' ? 'text-amber-400' : 'text-blue-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-slate-600 text-xs">{step.timestamp}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                      
                      {step.status === 'warning' && (
                         <div className="mt-3 p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400/90 text-xs">
                           WARN: Found 1 potential name match in eCourts. Requires manual review.
                         </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VerificationWorkflow;
