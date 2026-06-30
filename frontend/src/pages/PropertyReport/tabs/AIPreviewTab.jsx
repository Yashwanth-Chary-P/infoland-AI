import React from 'react';
import { Sparkles, Bot, Search, FileText } from 'lucide-react';
import Button from '../../../components/common/Button';

const AIPreviewTab = () => {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Property Analysis</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        Deep integration with LangChain and ChromaDB is coming in Module 05. 
        Soon, you will be able to query property intelligence using natural language.
      </p>

      <div className="flex items-center justify-center gap-2 mb-10">
        <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
          Coming Soon
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full text-left">
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <Bot className="w-5 h-5 text-blue-500 mb-3" />
          <h3 className="text-sm font-bold text-slate-900 mb-1">Risk Explanation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            AI-generated summaries explaining exact risk factors and suggesting mitigation strategies.
          </p>
        </div>
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-500 mb-3" />
          <h3 className="text-sm font-bold text-slate-900 mb-1">Natural Language Query</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            "What is the ongoing boundary dispute about?" Ask questions directly to the property's data graph.
          </p>
        </div>
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <FileText className="w-5 h-5 text-blue-500 mb-3" />
          <h3 className="text-sm font-bold text-slate-900 mb-1">Document Q&A</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Extract exact clauses, dates, and names from unstructured legal PDFs instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIPreviewTab;
