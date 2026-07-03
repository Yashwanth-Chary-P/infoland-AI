import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchOverview, 
  fetchRegionalIntelligence, 
  fetchVerificationAnalytics, 
  fetchOwnershipAnalytics, 
  fetchFinancialAnalytics, 
  fetchDocumentAnalytics, 
  fetchRiskAnalytics 
} from '../../features/analytics/analyticsSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import DataChart from '../../components/charts/DataChart';
import { BarChart3, Database, ShieldAlert, FileText, Landmark, Users, Map, ShieldCheck, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Insights = () => {
  const dispatch = useDispatch();
  const { 
    overview, regions, verification, ownership, financial, documents, risk, loading 
  } = useSelector(state => state.analytics);

  useEffect(() => {
    // Only fetch if data is missing to prevent duplicate calls when remounting
    if (!overview) dispatch(fetchOverview());
    if (!regions) dispatch(fetchRegionalIntelligence());
    if (!verification) dispatch(fetchVerificationAnalytics());
    if (!ownership) dispatch(fetchOwnershipAnalytics());
    if (!financial) dispatch(fetchFinancialAnalytics());
    if (!documents) dispatch(fetchDocumentAnalytics());
    if (!risk) dispatch(fetchRiskAnalytics());
  }, [dispatch, overview, regions, verification, ownership, financial, documents, risk]);

  const isLoading = Object.values(loading).some(Boolean);

  if (isLoading || !overview || !regions || !verification || !ownership || !financial || !documents || !risk) {
    return <LoadingSpinner message="Aggregating Platform Intelligence..." />;
  }

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );

  const Section = ({ title, icon: Icon, children }) => (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <Icon className="w-5 h-5 text-slate-400" />
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>Dataset Insights | InfoLand AI</title>
        <meta name="description" content="View platform-wide dataset analytics and trends." />
      </Helmet>
      <div className="max-w-[1800px] mx-auto w-full px-6 xl:px-8 2xl:px-10 py-8 bg-slate-50 min-h-screen">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" /> Platform Insights
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time aggregated intelligence from the InfoLand Dataset Engine.</p>
        </div>

        {/* Dataset Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Properties" value={overview.total_properties} icon={Database} color="bg-blue-50 text-blue-600" />
          <StatCard title="System Verified" value={overview.verified_properties} icon={ShieldCheck} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="Total Documents" value={overview.total_documents} icon={FileText} color="bg-indigo-50 text-indigo-600" />
          <StatCard title="Dataset Health" value={`${overview.dataset_health}%`} icon={Zap} color="bg-amber-50 text-amber-600" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Regional Intelligence */}
          <Section title="Regional Intelligence" icon={Map}>
            <DataChart 
              type="bar" 
              data={regions} 
              xKey="region" 
              yKey="count" 
              title="Properties per Region"
              height={300} 
            />
          </Section>

          {/* Verification Analytics */}
          <Section title="Verification Analytics" icon={ShieldCheck}>
            <DataChart 
              type="donut" 
              data={verification} 
              xKey="workflow" 
              yKey="count" 
              title="Verification Workflows"
              height={300} 
            />
          </Section>

          {/* Ownership Analytics */}
          <Section title="Ownership Analytics" icon={Users}>
            <DataChart 
              type="pie" 
              data={ownership} 
              xKey="type" 
              yKey="count" 
              title="Owner Demographics"
              height={300} 
            />
          </Section>

          {/* Risk Analytics */}
          <Section title="Risk Analytics" icon={ShieldAlert}>
            <DataChart 
              type="bar" 
              data={risk} 
              xKey="tier" 
              yKey="count" 
              title="Risk Tier Distribution"
              height={300}
              colors={['#ef4444', '#f59e0b', '#10b981', '#64748b']}
            />
          </Section>
          
          {/* Financial Analytics */}
          <Section title="Financial Analytics" icon={Landmark}>
            <DataChart 
              type="donut" 
              data={[
                { label: 'With Loans', value: financial[0]?.properties_with_loans || 0 },
                { label: 'Without Loans', value: financial[0]?.properties_without_loans || 0 }
              ]} 
              xKey="label" 
              yKey="value" 
              title="Active Encumbrances"
              height={300} 
            />
          </Section>
          
          {/* Document Analytics */}
          <Section title="Document Analytics" icon={FileText}>
            <DataChart 
              type="pie" 
              data={[
                { label: 'Available', value: documents[0]?.total_available || 0 },
                { label: 'Missing', value: documents[0]?.total_missing || 0 }
              ]} 
              xKey="label" 
              yKey="value" 
              title="Document Completeness"
              height={300} 
            />
          </Section>
        </div>

      </div>
    </>
  );
};

export default Insights;
