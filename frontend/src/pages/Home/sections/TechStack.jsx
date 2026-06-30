import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Database, Code2, BrainCircuit, SearchCode, ChevronRight } from 'lucide-react';

const TechStack = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stack = [
    { name: 'React', icon: Code2, role: 'Frontend', color: 'text-cyan-500' },
    { name: 'Express', icon: Server, role: 'API Gateway', color: 'text-slate-700' },
    { name: 'MongoDB', icon: Database, role: 'Primary Store', color: 'text-emerald-500' },
    { name: 'Dataset Engine', icon: SearchCode, role: 'Analytics', color: 'text-blue-500' },
    { name: 'FastAPI', icon: Server, role: 'AI Layer', color: 'text-indigo-500' },
    { name: 'LangChain', icon: BrainCircuit, role: 'LLM Orchestration', color: 'text-amber-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-24 bg-slate-50/50 border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-slate-300"></span>
            Enterprise Architecture
            <span className="w-8 h-px bg-slate-300"></span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Built for scale and security.
          </h3>
          <p className="text-base text-slate-500 leading-relaxed">
            Our platform leverages modern web technologies and a dedicated AI layer to process complex legal and spatial data in milliseconds.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 md:gap-6 items-center max-w-5xl mx-auto"
        >
          {stack.map((tech, idx) => (
            <React.Fragment key={tech.name}>
              <motion.div variants={itemVariants} className="flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 group-hover:shadow-md">
                  <tech.icon className={`w-6 h-6 ${tech.color}`} />
                </div>
                <span className="font-semibold text-slate-900 text-sm tracking-tight">{tech.name}</span>
                <span className="text-[11px] font-medium text-slate-500 mt-0.5">{tech.role}</span>
              </motion.div>

              {/* Arrow separator, except after the last item */}
              {idx < stack.length - 1 && (
                <motion.div variants={itemVariants} className="hidden md:flex items-center justify-center mb-6">
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
