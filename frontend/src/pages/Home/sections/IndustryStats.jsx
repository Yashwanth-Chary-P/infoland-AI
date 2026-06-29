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
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The cost of uncertainty.</h2>
            <p className="text-slate-400 text-lg">
              Unverified properties represent a massive systemic risk to individuals and institutions alike. The data speaks for itself.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-3xl">{stat.suffix}</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{stat.label}</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{stat.description}</p>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
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
