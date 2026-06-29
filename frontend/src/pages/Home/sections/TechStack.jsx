import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Database, Code2, BrainCircuit, SearchCode } from 'lucide-react';

const TechStack = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stack = [
    { name: 'React', icon: Code2, role: 'Frontend', color: 'text-cyan-500' },
    { name: 'Express', icon: Server, role: 'API Gateway', color: 'text-slate-700' },
    { name: 'MongoDB', icon: Database, role: 'Primary Store', color: 'text-green-600' },
    { name: 'Dataset Engine', icon: SearchCode, role: 'Analytics', color: 'text-blue-600' },
    { name: 'FastAPI', icon: Server, role: 'AI Layer', color: 'text-emerald-500' },
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Enterprise Architecture</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Built for scale and security.
          </h3>
          <p className="text-lg text-slate-600">
            Our platform leverages modern web technologies and a dedicated AI layer to process complex legal and spatial data in milliseconds.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 md:gap-8 items-center"
        >
          {stack.map((tech, idx) => (
            <React.Fragment key={tech.name}>
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-3">
                  <tech.icon className={`w-8 h-8 ${tech.color}`} />
                </div>
                <span className="font-bold text-slate-900 text-sm">{tech.name}</span>
                <span className="text-xs text-slate-500">{tech.role}</span>
              </motion.div>

              {/* Arrow separator, except after the last item */}
              {idx < stack.length - 1 && (
                <motion.div variants={itemVariants} className="hidden md:block">
                  <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
