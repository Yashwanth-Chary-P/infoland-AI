import React from 'react';
import EmptyState from '../../components/common/EmptyState.jsx';
import { Compass } from 'lucide-react';

const Explore = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[60vh] rounded-xl m-4 border border-slate-200">
      <EmptyState 
        icon={Compass} 
        title="Explore: Module Pending" 
        description="This feature will be implemented in Module 03. Stay tuned for advanced property search and map integration." 
      />
    </div>
  );
};

export default Explore;
