import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Share2, Download, Sparkles } from 'lucide-react';
import { fetchDetailedPlotById } from '../../features/detailedPlots/detailedPlotsSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ExecutiveSummary from './ExecutiveSummary';

// Tabs
import OverviewTab from './tabs/OverviewTab';
import VerificationTab from './tabs/VerificationTab';
import OwnershipTab from './tabs/OwnershipTab';
import DocumentsTab from './tabs/DocumentsTab';
import FinancialTab from './tabs/FinancialTab';
import CourtCasesTab from './tabs/CourtCasesTab';
import TimelineTab from './tabs/TimelineTab';
import LocationTab from './tabs/LocationTab';
import AIPreviewTab from './tabs/AIPreviewTab';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'verification', label: 'Verification' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'documents', label: 'Documents' },
  { id: 'financial', label: 'Financial' },
  { id: 'court', label: 'Court Cases' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'location', label: 'Location' },
  { id: 'ai', label: 'AI Preview', icon: Sparkles }
];

const PropertyReport = () => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selected: plot, loading, error } = useSelector((state) => state.detailedPlots);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (plotId) {
      dispatch(fetchDetailedPlotById(plotId));
    }
  }, [dispatch, plotId]);

  const renderTabContent = useMemo(() => {
    if (!plot) return null;
    switch (activeTab) {
      case 'overview': return <OverviewTab plot={plot} />;
      case 'verification': return <VerificationTab plot={plot} />;
      case 'ownership': return <OwnershipTab plot={plot} />;
      case 'documents': return <DocumentsTab plot={plot} />;
      case 'financial': return <FinancialTab plot={plot} />;
      case 'court': return <CourtCasesTab plot={plot} />;
      case 'timeline': return <TimelineTab plot={plot} />;
      case 'location': return <LocationTab plot={plot} />;
      case 'ai': return <AIPreviewTab plot={plot} />;
      default: return <OverviewTab plot={plot} />;
    }
  }, [activeTab, plot]);

  if (loading) {
    return <LoadingSpinner message="Building Property Intelligence Report..." />;
  }

  if (error || !plot) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-8 text-center max-w-md">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Report Unavailable</h2>
          <p className="text-sm text-slate-500 mb-6">{error || 'Property not found in database.'}</p>
          <Button onClick={() => navigate("/explore")} variant="primary">Return to Workspace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/explore')} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PID: {plot.property_id || plot._id}</h1>
                  <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {plot.profile?.verification_workflow?.replace(/_/g, ' ') || 'VERIFIED'}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-slate-600 bg-slate-100 border-transparent hover:bg-slate-200" onClick={() => alert('Export coming soon')}>
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 bg-slate-100 border-transparent hover:bg-slate-200" onClick={() => alert('Share coming soon')}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 border-transparent shadow-sm" onClick={() => setActiveTab('ai')}>
                <Sparkles className="w-4 h-4 mr-2" /> AI Analysis
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto space-x-1 border-b border-slate-100 scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2
                  ${activeTab === tab.id 
                    ? 'text-blue-600 border-blue-600 bg-blue-50/50 rounded-t-lg' 
                    : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50 rounded-t-lg'
                  }`}
              >
                {tab.icon && <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-10 xl:px-12 py-6 space-y-6">
        <ExecutiveSummary plot={plot} />
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[500px]">
          <Suspense fallback={<LoadingSpinner message="Loading Tab..." />}>
            {renderTabContent}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PropertyReport;
