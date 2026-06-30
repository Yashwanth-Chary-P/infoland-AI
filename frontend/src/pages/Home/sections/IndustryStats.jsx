import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import StatisticsService from '../../../services/data/StatisticsService';
import CountUp from 'react-countup';

const IndustryStats = () => {
  const [stats, setStats] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    StatisticsService.getIndustryStats().then(data => setStats(data));
  }, []);

  return (
    <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0A0A] to-[#0A0A0A]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">The cost of uncertainty.</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Unverified properties represent a massive systemic risk to individuals and institutions alike. The data speaks for itself.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4 tracking-tighter">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-3xl ml-1 font-bold">{stat.suffix}</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-200 mb-3 tracking-wide">{stat.label}</h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">{stat.description}</p>
              
              <div className="pt-5 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Source: {stat.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryStats;
