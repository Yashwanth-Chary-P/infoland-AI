import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldAlert, Database, Map } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

const FeaturesGrid = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const barData = React.useMemo(() => ({
    labels: ['Legal', 'Financial', 'Title', 'Location'],
    datasets: [{
      label: 'Checks Performed',
      data: [142, 85, 96, 45],
      backgroundColor: '#3b82f6',
      borderRadius: 4
    }]
  }), []);

  const barOptions = React.useMemo(() => ({
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }), []);

  return (
    <section className="py-32 bg-slate-50 border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Platform Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Comprehensive property intelligence.
          </h3>
          <p className="text-lg text-slate-600">
            We move beyond generic checks. Our platform mathematically verifies every dimension of a property to surface hidden risks before acquisition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Feature 1: Data Depth (Bento Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row"
          >
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
               <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                 <Database className="w-6 h-6 text-blue-600" />
               </div>
               <h4 className="text-2xl font-bold text-slate-900 mb-4">Unprecedented Data Depth</h4>
               <p className="text-slate-600 leading-relaxed mb-6">
                 We don't rely on a single registrar. InfoLand aggregates and cross-references data from municipal bodies, state courts, and national financial registries simultaneously.
               </p>
            </div>
            <div className="bg-slate-50 border-l border-slate-100 p-8 md:w-1/2 flex items-center justify-center min-h-[300px]">
               <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Verification Depth by Category</p>
                 <div className="h-44">
                   <Bar data={barData} options={barOptions} />
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Feature 2: Risk Assessment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-10 flex-1">
               <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6">
                 <ShieldAlert className="w-6 h-6 text-rose-600" />
               </div>
               <h4 className="text-2xl font-bold text-slate-900 mb-4">Unified Risk Scoring</h4>
               <p className="text-slate-600 leading-relaxed">
                 Our proprietary models weigh hundreds of variables to generate a single, actionable risk score, highlighting critical legal and financial issues immediately.
               </p>
            </div>
          </motion.div>

          {/* Feature 3: Location Intelligence */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col relative"
          >
            <div className="p-10 flex-1 relative z-10">
               <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                 <Map className="w-6 h-6 text-white" />
               </div>
               <h4 className="text-2xl font-bold text-white mb-4">Location Intelligence</h4>
               <p className="text-slate-300 leading-relaxed">
                 Mathematical boundary verification against city master plans. Instantly identify encroachments on government land, water bodies, or protected green zones.
               </p>
            </div>
            {/* Dark map aesthetic background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
