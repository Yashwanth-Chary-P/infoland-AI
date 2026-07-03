import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchDashboardSummary } from '../../features/analytics/analyticsSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  LayoutDashboard, 
  Bookmark, 
  Activity, 
  ShieldCheck, 
  Bell, 
  Zap,
  Lock
} from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardSummary: summary, loading } = useSelector(state => state.analytics);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading.dashboardSummary || !summary) {
    return <LoadingSpinner message="Loading Dashboard..." />;
  }

  const MetricCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
  );

  const LockedSection = ({ title, icon: Icon, description }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <Icon className="w-10 h-10 text-slate-300" />
        <Lock className="w-4 h-4 text-slate-400 absolute -bottom-1 -right-1" />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm">{description}</p>
      <span className="mt-4 px-3 py-1 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
        Authentication Required
      </span>
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto w-full px-6 xl:px-8 2xl:px-10 py-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" /> My Workspace
        </h1>
        <p className="text-slate-500 text-sm mt-1">Platform overview and user-specific intelligence.</p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Platform Indexed" 
          value={summary.total_indexed?.toLocaleString()} 
          subtitle="Properties in Dataset Engine"
          icon={Activity}
          colorClass="bg-blue-50 text-blue-600"
        />
        <MetricCard 
          title="System Verified" 
          value={summary.system_verified?.toLocaleString()} 
          subtitle="Cleared for evaluation"
          icon={ShieldCheck}
          colorClass="bg-emerald-50 text-emerald-600"
        />
        <MetricCard 
          title="Dataset Health" 
          value={`${summary.dataset_health}%`} 
          subtitle="Completeness score"
          icon={Zap}
          colorClass="bg-amber-50 text-amber-600"
        />
        <MetricCard 
          title="My Watched Properties" 
          value={summary.watched_properties} 
          subtitle="Personal portfolio"
          icon={Bookmark}
          colorClass="bg-slate-50 text-slate-400"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-slate-400" />
              <h2 className="font-semibold text-slate-800">Saved Properties</h2>
            </div>
            <LockedSection 
              title="No Saved Properties" 
              icon={Bookmark}
              description="You must be logged in to save properties to your personal portfolio."
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              <h2 className="font-semibold text-slate-800">Recent Activity</h2>
            </div>
            <LockedSection 
              title="Activity Log Unavailable" 
              icon={Activity}
              description="Sign in to track your platform activity and recent searches."
            />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-400" />
              <h2 className="font-semibold text-slate-800">Alerts & Notifications</h2>
            </div>
            <LockedSection 
              title="Alerts Paused" 
              icon={Bell}
              description="Create an account to receive alerts on watched properties."
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-slate-400" />
              <h2 className="font-semibold text-slate-800">Quick Actions</h2>
            </div>
            <div className="p-5 space-y-3">
              <button disabled className="w-full text-left px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-400 cursor-not-allowed">
                Request Property Verification
              </button>
              <button disabled className="w-full text-left px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-400 cursor-not-allowed">
                Generate Portfolio Report
              </button>
              <button disabled className="w-full text-left px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-400 cursor-not-allowed">
                Manage Alert Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
