import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, MessageSquare, Brain, Zap, Sparkles } from 'lucide-react';
import Card, { CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';

const AIRoadmap = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Bot,
      title: "InfoLand AI Assistant",
      desc: "A conversational agent capable of answering complex legal questions regarding a property's history."
    },
    {
      icon: MessageSquare,
      title: "Natural Language Search",
      desc: "Search for properties using plain English. E.g., 'Show me dispute-free properties in North Bangalore'."
    },
    {
      icon: Brain,
      title: "Risk Explanation",
      desc: "AI translates complex legal jargon from court documents into simple, actionable summaries."
    },
    {
      icon: Zap,
      title: "Smart Reports",
      desc: "Instantly generate comprehensive, lawyer-grade verification reports in seconds."
    }
  ];

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-wider uppercase text-accent">Phase 2 Roadmap</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            The future of Property Intelligence.
          </h3>
          <p className="text-lg text-slate-600">
            We are integrating LangChain and ChromaDB to bring advanced Generative AI capabilities to property verification.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-slate-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <Badge variant="ai">Coming Soon</Badge>
                </div>
                <CardContent className="pt-10 pb-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                    <feature.icon className="w-6 h-6 text-slate-600 group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRoadmap;
