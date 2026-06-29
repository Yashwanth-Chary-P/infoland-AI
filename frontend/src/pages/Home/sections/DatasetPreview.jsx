import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Database } from 'lucide-react';
import Button from '../../../components/common/Button';

const DatasetPreview = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-300">The Dataset Engine</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              A single graph of <br className="hidden lg:block"/> verifiable truth.
            </h3>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              We do not rely on a single registrar. The InfoLand Dataset Engine continuously ingests and normalizes data from over 45 municipal, judicial, and financial endpoints.
            </p>

            <Link to="/insights">
              <Button size="lg" className="group bg-white text-slate-900 hover:bg-slate-100 border-transparent mt-4">
                Explore Dataset Analytics
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Analytics Data Table Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-200">Ingestion Pipeline Logs</span>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-3 font-semibold">Source</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-300">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">CENTRAL_REGISTRY</td>
                    <td className="px-6 py-4"><span className="text-emerald-400 font-medium">SYNCHED</span></td>
                    <td className="px-6 py-4 text-right font-mono">24ms</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">ECOURTS_GRID</td>
                    <td className="px-6 py-4"><span className="text-emerald-400 font-medium">SYNCHED</span></td>
                    <td className="px-6 py-4 text-right font-mono">42ms</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">CERSAI_FINANCIAL</td>
                    <td className="px-6 py-4"><span className="text-emerald-400 font-medium">SYNCHED</span></td>
                    <td className="px-6 py-4 text-right font-mono">18ms</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-amber-300">MUNICIPAL_TAX_DB</td>
                    <td className="px-6 py-4"><span className="text-amber-400 font-medium">SYNCING</span></td>
                    <td className="px-6 py-4 text-right font-mono text-amber-300">1240ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DatasetPreview;
