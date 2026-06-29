import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetailedPlotById } from "../features/detailedPlots/detailedPlotsSlice";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

import {
  OverviewTab,
  OwnershipTab,
  DocumentsTab,
  FinancialTab,
  TimelineTab
} from "./PropertyDetails";

const AnalyticsTab = React.lazy(() => import("./PropertyDetails/AnalyticsTab"));

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'documents', label: 'Documents' },
  { id: 'financial', label: 'Financial' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'analytics', label: 'Analytics' }
];

const PlotDetailsPage = () => {
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

  // Memoize tabs to avoid unnecessary re-renders when switching tabs
  const renderTabContent = useMemo(() => {
    if (!plot) return null;
    switch (activeTab) {
      case 'overview': return <OverviewTab plot={plot} />;
      case 'ownership': return <OwnershipTab plot={plot} />;
      case 'documents': return <DocumentsTab plot={plot} />;
      case 'financial': return <FinancialTab plot={plot} />;
      case 'timeline': return <TimelineTab plot={plot} />;
      case 'analytics': 
        return (
          <Suspense fallback={<LoadingSpinner message="Loading Analytics..." />}>
            <AnalyticsTab plot={plot} />
          </Suspense>
        );
      default: return <OverviewTab plot={plot} />;
    }
  }, [activeTab, plot]);

  if (loading) {
    return <LoadingSpinner message="Loading Property Details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md border-t-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Property</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!plot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md border-t-4 border-gray-400">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Map
            </button>
            <div className="text-right">
               <h1 className="text-2xl font-bold text-gray-800">Property #{plot.property_id}</h1>
               <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mt-1">
                 {plot.profile?.verification_workflow?.replace(/_/g, ' ') || 'Verification Pending'}
               </span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto space-x-1 border-b border-gray-200" style={{ scrollbarWidth: 'none' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-6 py-3 font-medium text-sm rounded-t-lg transition-colors
                  ${activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Render active tab content */}
         <div>
            {renderTabContent}
         </div>
      </div>
    </div>
  );
};

export default PlotDetailsPage;
