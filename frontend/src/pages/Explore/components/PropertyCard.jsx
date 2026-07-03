import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldAlert, AlertTriangle, FileText, Landmark } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const PropertyCard = ({ plot, isSelected, onSelect, onHover, onLeave }) => {
  const propertyId = plot.property_id || plot.id || plot._id;
  
  const status = plot.profile?.verification_workflow || 'PENDING';
  const riskScore = plot.healthSummary?.overall_score || 'N/A';
  const ownershipConfidence = plot.metadata?.data_quality_score ? `${plot.metadata.data_quality_score}%` : 'N/A';
  const missingDocs = plot.healthSummary?.missing_document_count ?? 'N/A';
  const activeLoans = plot.healthSummary?.active_loan_count ?? 'N/A';
  const courtDisputes = plot.healthSummary?.court_dispute_count ?? 'N/A';
  const region = plot.source_region || 'Unknown';
  const type = plot.profile?.property_class ? plot.profile.property_class.replace(/_/g, ' ') : 'Unknown';

  return (
    <div 
      id={`property-card-${propertyId}`}
      className={`bg-white rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden group ${
        isSelected 
          ? 'border-blue-500 shadow-md ring-1 ring-blue-500' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
    >
      <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-slate-800 tracking-wider">PID: {propertyId}</span>
            <Badge variant="success" className="text-[10px] uppercase tracking-wider px-2 py-0.5 leading-none">{status.replace(/_/g, ' ')}</Badge>
          </div>
          <p className="text-sm font-medium text-slate-500 capitalize">{type} • {region}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Risk Score</span>
          <span className={`text-2xl font-black tracking-tighter leading-none ${riskScore === 'N/A' ? 'text-slate-400' : riskScore < 50 ? 'text-emerald-600' : riskScore < 80 ? 'text-amber-500' : 'text-red-500'}`}>
            {riskScore}
          </span>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-y-5 gap-x-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Ownership</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            {ownershipConfidence}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Documents</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText className={`w-4 h-4 ${missingDocs === 'N/A' ? 'text-slate-400' : missingDocs > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
            {missingDocs === 'N/A' ? 'N/A' : missingDocs > 0 ? `${missingDocs} Missing` : 'Complete'}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Disputes</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Landmark className={`w-4 h-4 ${courtDisputes === 'N/A' ? 'text-slate-400' : courtDisputes > 0 ? 'text-red-500' : 'text-emerald-500'}`} />
            {courtDisputes === 'N/A' ? 'N/A' : courtDisputes > 0 ? `${courtDisputes} Active` : 'Clear'}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Loans</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <AlertTriangle className={`w-4 h-4 ${activeLoans === 'N/A' ? 'text-slate-400' : activeLoans > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
            {activeLoans === 'N/A' ? 'N/A' : activeLoans > 0 ? `${activeLoans} Active` : 'Clear'}
          </div>
        </div>
      </div>
      
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-end mt-auto">
        <Link to={`/property/${propertyId}`} className="w-full">
          <Button variant="secondary" className="w-full text-xs h-9 px-4 font-bold shadow-sm bg-white border-slate-200 hover:bg-white hover:text-blue-600 group-hover:border-blue-300 transition-colors">
            View Intelligence Report
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(PropertyCard);
