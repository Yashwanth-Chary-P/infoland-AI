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
      x: { grid: { display: false }, ticks: { font: { size: 10, family: "'Inter', sans-serif" }, color: '#64748b' } }
    }
  }), []);

  return (
    <section className="py-24 bg-white border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-blue-600"></span>
            Platform Capabilities
            <span className="w-8 h-px bg-blue-600"></span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Comprehensive property intelligence.
          </h3>
          <p className="text-base text-slate-500 leading-relaxed">
            We move beyond generic checks. Our platform mathematically verifies every dimension of a property to surface hidden risks before acquisition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Feature 1: Data Depth (Bento Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-slate-50/50 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md"
          >
            <div className="p-10 lg:p-12 md:w-1/2 flex flex-col justify-center bg-white">
               <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                 <Database className="w-5 h-5 text-blue-600" />
               </div>
               <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Unprecedented Data Depth</h4>
               <p className="text-slate-500 leading-relaxed">
                 We don't rely on a single registrar. InfoLand aggregates and cross-references data from municipal bodies, state courts, and national financial registries simultaneously.
               </p>
            </div>
            <div className="bg-slate-50 border-l border-slate-100 p-8 md:w-1/2 flex items-center justify-center min-h-[300px] relative">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 to-slate-50 opacity-50"></div>
               <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 relative z-10">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Depth by Category</p>
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
            className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-md"
          >
            <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
               <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6">
                 <ShieldAlert className="w-5 h-5 text-rose-500" />
               </div>
               <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Unified Risk Scoring</h4>
               <p className="text-slate-500 leading-relaxed">
                 Our proprietary models weigh hundreds of variables to generate a single, actionable risk score, highlighting critical legal and financial issues immediately.
               </p>
            </div>
          </motion.div>

          {/* Feature 3: Location Intelligence */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#0A0A0A] rounded-[2rem] border border-slate-800 shadow-xl overflow-hidden flex flex-col relative transition-shadow hover:shadow-2xl"
          >
            <div className="p-10 lg:p-12 flex-1 relative z-10 flex flex-col justify-center">
               <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                 <Map className="w-5 h-5 text-white" />
               </div>
               <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Location Intelligence</h4>
               <p className="text-slate-400 leading-relaxed">
                 Mathematical boundary verification against city master plans. Instantly identify encroachments on government land, water bodies, or protected green zones.
               </p>
            </div>
            {/* Dark map aesthetic background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0A0A0A]/20 to-transparent"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
