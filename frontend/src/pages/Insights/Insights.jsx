import React from 'react';
import EmptyState from '../../components/common/EmptyState.jsx';
import { BarChart3 } from 'lucide-react';

const Insights = () => {
  return (
    <div className="max-w-[1800px] mx-auto w-full px-6 xl:px-8 2xl:px-10 py-12 flex-1 flex flex-col items-center justify-center">
      <div className="w-full bg-slate-50 min-h-[60vh] rounded-xl border border-slate-200 flex flex-col items-center justify-center p-6">
      <EmptyState 
        icon={BarChart3} 
        title="Dataset Insights: Module Pending" 
        description="This feature will be implemented in Module 04. It will provide full Dataset Engine analytics and metrics." 
      />
      </div>
    </div>
  );
};

export default Insights;
