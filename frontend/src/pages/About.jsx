import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="pt-40 pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight"
          >
            Trust, mathematically proven.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-600 leading-relaxed"
          >
            We are replacing the subjective, manual process of property verification with a deterministic, data-driven intelligence engine.
          </motion.p>
        </div>
      </section>

      {/* Methodology Section (Editorial Layout) */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Methodology</h2>
              <h3 className="text-3xl font-bold text-slate-900 sticky top-32">
                How we construct truth.
              </h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-8 space-y-16"
            >
              <motion.div variants={itemVariants} className="relative pl-10 border-l border-slate-200">
                <span className="absolute -left-[17px] top-0 text-xs font-mono font-bold w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">01</span>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Aggregation</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We don't depend on what a seller provides. We connect directly to over 45 municipal registries, state eCourts, and central financial databases (like CERSAI) to ingest raw, untampered historical records.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative pl-10 border-l border-slate-200">
                <span className="absolute -left-[17px] top-0 text-xs font-mono font-bold w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">02</span>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Normalization</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Public records are notoriously fragmented. Our proprietary algorithms clean, standardize, and mathematically link these isolated records to reconstruct an unbroken chain of title stretching back decades.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="relative pl-10 border-l border-slate-200">
                <span className="absolute -left-[17px] top-0 text-xs font-mono font-bold w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">03</span>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Synthesis</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Finally, our risk engine scans the unified data graph for anomalies—overlapping ownership claims, undisclosed hypothecations, and active civil litigation—outputting a definitive, lawyer-grade safety score.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Visuals */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">Built for enterprise <br/>scale and security.</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-lg">
                InfoLand AI is designed as a decoupled, high-performance architecture capable of processing millions of property records with sub-second query latency.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <span className="font-bold text-white block mb-1">Phase 1: Foundation</span>
                    <span className="text-slate-400 text-sm">React, Redux, Express, MongoDB</span>
                  </div>
                  <Badge variant="success">Deployed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 opacity-70">
                  <div>
                    <span className="font-bold text-white block mb-1">Phase 2: Intelligence</span>
                    <span className="text-slate-400 text-sm">FastAPI, Python, LangChain, ChromaDB</span>
                  </div>
                  <Badge variant="ai">In Development</Badge>
                </div>
              </div>
            </div>

            {/* Code Block Mockup */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
               <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                 </div>
                 <div className="mx-auto text-slate-500 text-xs">verification_engine.ts</div>
               </div>
               <div className="p-6 text-slate-300 leading-loose overflow-x-auto">
                 <p><span className="text-purple-400">async</span> <span className="text-blue-400">function</span> <span className="text-emerald-300">verifyProperty</span>(pid: <span className="text-amber-300">string</span>) {'{'}</p>
                 <p className="pl-4"><span className="text-purple-400">const</span> pipeline = <span className="text-purple-400">new</span> <span className="text-emerald-300">VerificationPipeline</span>(pid);</p>
                 <p className="pl-4 mt-2"><span className="text-slate-500">// 1. Parallel execution across all registries</span></p>
                 <p className="pl-4"><span className="text-purple-400">await</span> pipeline.<span className="text-blue-300">executeGatherPhase</span>();</p>
                 <p className="pl-4 mt-2"><span className="text-slate-500">// 2. Mathematical validation</span></p>
                 <p className="pl-4"><span className="text-purple-400">const</span> riskScore = <span className="text-purple-400">await</span> pipeline.<span className="text-blue-300">computeRiskScore</span>();</p>
                 <p className="pl-4 mt-2"><span className="text-slate-500">// 3. Return strictly typed report</span></p>
                 <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-blue-400">new</span> <span className="text-emerald-300">IntelligenceReport</span>(riskScore);</p>
                 <p>{'}'}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Editorial format) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12">
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-12">
            {[
              {
                q: "How accurate is the Dataset Engine?",
                a: "Our data is sourced directly from official municipal, judicial, and financial registries. The engine does not guess; it surfaces mathematically verifiable overlaps and gaps in the historical record. However, we always advise that our intelligence reports be reviewed by your legal counsel prior to final acquisition."
              },
              {
                q: "Can I integrate InfoLand AI into my own underwriting platform via API?",
                a: "Enterprise API access is currently in closed beta. It is designed specifically for financial institutions, housing finance companies, and large-scale developers to embed our verification scores directly into their loan origination and risk underwriting workflows."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-12">
                <h4 className="text-xl font-bold text-slate-900 mb-4">{faq.q}</h4>
                <p className="text-lg text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Link to="/contact" className="inline-flex items-center text-primary font-bold hover:text-blue-700 transition-colors">
              Contact our enterprise team for more answers
              <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
