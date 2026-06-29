import React from 'react';
import { Building, User, Activity, MapPin, Landmark, AlertTriangle, Briefcase, FileText } from 'lucide-react';
import DynamicFieldList from '../DynamicFieldList';

const InfoCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className={`bg-white shadow-sm rounded-xl p-4 border-l-4 ${colorClass}`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {Icon && <Icon className={`w-5 h-5 ${colorClass.replace('border-', 'text-')}`} />}
    </div>
    <p className="text-lg font-bold text-gray-800 capitalize">{value || 'N/A'}</p>
  </div>
);

const OverviewTab = ({ plot }) => {
  const {
    profile = {},
    metadata = {},
    healthSummary = {},
    owner = {},
    documents = [],
    loans = [],
    taxes = [],
    courtDisputes = [],
  } = plot;

  const missingDocsCount = documents.filter(d => d.status?.toLowerCase() === 'missing').length;
  const activeLoansCount = loans.length;
  const pendingTaxesCount = taxes.filter(t => parseFloat(t.amount_due) > 0).length;
  const activeDisputesCount = courtDisputes.length;

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard title="Property ID" value={plot.property_id} icon={Building} colorClass="border-blue-500" />
        <InfoCard title="Property Class" value={profile.property_class?.replace(/_/g, ' ')} icon={MapPin} colorClass="border-indigo-500" />
        <InfoCard title="Current Owner" value={owner.full_name} icon={User} colorClass="border-purple-500" />
        <InfoCard title="Sale Status" value={profile.sale_status?.replace(/_/g, ' ')} icon={Briefcase} colorClass="border-green-500" />
        <InfoCard title="Area (sq m)" value={plot.area_sq_m} icon={MapPin} colorClass="border-teal-500" />
        <InfoCard title="Location Score" value={profile?.location_score} icon={Activity} colorClass="border-yellow-500" />
        <InfoCard title="Future Risk Tier" value={profile?.future_risk_tier?.replace(/_/g, ' ')} icon={AlertTriangle} colorClass="border-red-400" />
        <InfoCard title="Verification" value={profile?.verification_workflow?.replace(/_/g, ' ')} icon={FileText} colorClass="border-cyan-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile & Metadata details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Property Profile</h2>
             <DynamicFieldList 
               data={{ ...profile, source_region: plot?.source_region, building: plot?.building, property_age: metadata?.property_age_years ? metadata.property_age_years + ' Years' : 'N/A' }} 
               excludedKeys={["property_id", "owner_id", "property_class", "sale_status", "verification_workflow"]} 
             />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Health Summary</h2>
             <DynamicFieldList 
               data={healthSummary} 
               excludedKeys={["location_score", "future_risk_tier", "property_id"]} 
             />
          </div>
        </div>

        {/* Status Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Attention Required</h2>
          
          <div className="bg-white shadow-sm border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
               <div className={`p-2 rounded-full mr-3 ${activeLoansCount > 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                 <Landmark className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-600">Active Loans</p>
                 <p className="font-bold text-gray-800">{activeLoansCount}</p>
               </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
               <div className={`p-2 rounded-full mr-3 ${pendingTaxesCount > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                 <FileText className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-600">Pending Taxes</p>
                 <p className="font-bold text-gray-800">{pendingTaxesCount}</p>
               </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
               <div className={`p-2 rounded-full mr-3 ${activeDisputesCount > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                 <AlertTriangle className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-600">Court Cases</p>
                 <p className="font-bold text-gray-800">{activeDisputesCount}</p>
               </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
               <div className={`p-2 rounded-full mr-3 ${missingDocsCount > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                 <Briefcase className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-600">Missing Documents</p>
                 <p className="font-bold text-gray-800">{missingDocsCount}</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
