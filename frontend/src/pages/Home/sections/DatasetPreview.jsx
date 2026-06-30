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
    <section className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0A0A] to-[#0A0A0A]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-300">The Dataset Engine</span>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              A single graph of <br className="hidden lg:block"/> verifiable truth.
            </h3>
            
            <p className="text-base text-slate-400 mb-8 leading-relaxed max-w-lg">
              We do not rely on a single registrar. The InfoLand Dataset Engine continuously ingests and normalizes data from over 45 municipal, judicial, and financial endpoints.
            </p>

            <Link to="/insights">
              <Button size="lg" className="group bg-white text-slate-900 hover:bg-slate-100 border-transparent rounded-xl px-6 text-sm font-semibold">
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
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="bg-white/[0.02] px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-300 tracking-wide">Ingestion Pipeline Logs</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-emerald-500 font-mono font-medium">LIVE</span>
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-3 font-semibold">Source</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-300">
                  <tr className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">CENTRAL_REGISTRY</td>
                    <td className="px-6 py-3.5"><span className="text-emerald-400/90 text-xs font-medium">SYNCHED</span></td>
                    <td className="px-6 py-3.5 text-right font-mono text-xs text-slate-500">24ms</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">ECOURTS_GRID</td>
                    <td className="px-6 py-3.5"><span className="text-emerald-400/90 text-xs font-medium">SYNCHED</span></td>
                    <td className="px-6 py-3.5 text-right font-mono text-xs text-slate-500">42ms</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">CERSAI_FINANCIAL</td>
                    <td className="px-6 py-3.5"><span className="text-emerald-400/90 text-xs font-medium">SYNCHED</span></td>
                    <td className="px-6 py-3.5 text-right font-mono text-xs text-slate-500">18ms</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[11px] text-amber-300/80">MUNICIPAL_TAX_DB</td>
                    <td className="px-6 py-3.5"><span className="text-amber-400/90 text-xs font-medium">SYNCING</span></td>
                    <td className="px-6 py-3.5 text-right font-mono text-xs text-amber-300/80">1240ms</td>
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
