import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import StatisticsService from '../../../services/data/StatisticsService';
import CountUp from 'react-countup';
import { Map, FileText, Users, Scale, Globe, Network, Landmark, Building2 } from 'lucide-react';

const PlatformStats = () => {
  const [stats, setStats] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    StatisticsService.getPlatformStats().then(data => setStats(data));
  }, []);

  const statItems = [
    { label: 'Properties Analyzed', key: 'properties', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Legal Documents', key: 'documents', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Ownership Events', key: 'ownershipEvents', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Court Disputes', key: 'courtDisputes', icon: Scale, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Loans Tracked', key: 'loansTracked', icon: Landmark, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Points of Interest', key: 'pois', icon: Building2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Data Sources', key: 'dataSources', icon: Network, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Regions Covered', key: 'regionsCovered', icon: Globe, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Dataset Engine</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Intelligence at scale.
          </h3>
          <p className="text-lg text-slate-600">
            Our proprietary Dataset Engine aggregates millions of verified records to provide you with a comprehensive, unified view of any property's history.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {statItems.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {stats ? (
                  <CountUp 
                    end={stats[item.key]} 
                    duration={2} 
                    separator="," 
                    formattingFn={(num) => num >= 1000000 ? (num / 1000000).toFixed(1) + 'M+' : num.toLocaleString()}
                  />
                ) : (
                  '...'
                )}
              </div>
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
