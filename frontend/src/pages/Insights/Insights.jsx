import React from 'react';
import EmptyState from '../../components/common/EmptyState.jsx';
import { BarChart3 } from 'lucide-react';

const Insights = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[60vh] rounded-xl m-4 border border-slate-200">
      <EmptyState 
        icon={BarChart3} 
        title="Dataset Insights: Module Pending" 
        description="This feature will be implemented in Module 04. It will provide full Dataset Engine analytics and metrics." 
      />
    </div>
  );
};

export default Insights;
