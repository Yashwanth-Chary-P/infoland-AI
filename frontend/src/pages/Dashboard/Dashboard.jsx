import React from 'react';
import EmptyState from '../../components/common/EmptyState.jsx';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-[1800px] mx-auto w-full px-6 xl:px-8 2xl:px-10 py-12 flex-1 flex flex-col items-center justify-center">
      <div className="w-full bg-slate-50 min-h-[60vh] rounded-xl border border-slate-200 flex flex-col items-center justify-center p-6">
      <EmptyState 
        icon={LayoutDashboard} 
        title="Dashboard: Module Pending" 
        description="This feature will be implemented in Module 04. It will provide intelligence analytics and saved properties." 
      />
      </div>
    </div>
  );
};

export default Dashboard;
