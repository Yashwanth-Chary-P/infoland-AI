import React from 'react';
import EmptyState from '../../components/common/EmptyState.jsx';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[60vh] rounded-xl m-4 border border-slate-200">
      <EmptyState 
        icon={LayoutDashboard} 
        title="Dashboard: Module Pending" 
        description="This feature will be implemented in Module 04. It will provide intelligence analytics and saved properties." 
      />
    </div>
  );
};

export default Dashboard;
