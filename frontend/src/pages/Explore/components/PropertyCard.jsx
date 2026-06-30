import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldAlert, AlertTriangle, FileText, Landmark } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const PropertyCard = ({ plot, isSelected, onSelect, onHover, onLeave }) => {
  const propertyId = plot.property_id || plot.id || plot._id;
  
  // Mock data derivation for UI (as instructed, fallback to mock if API lacks these specific fields, but ideally driven by API)
  const status = plot.status || (plot.profile?.verification_workflow) || 'PENDING';
  const riskScore = plot.risk_score || 82;
  const ownershipConfidence = plot.ownership_confidence || '95%';
  const missingDocs = plot.missing_documents || 1;
  const region = plot.region || 'BLR';
  const type = plot.property_type || 'Commercial';

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
      <div className="p-3 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider">PID: {propertyId}</span>
            <Badge variant="success" className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 leading-none">{status.replace(/_/g, ' ')}</Badge>
          </div>
          <p className="text-xs font-medium text-slate-500">{type} • {region}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Score</span>
          <span className={`text-xl font-extrabold tracking-tighter leading-none ${riskScore < 50 ? 'text-emerald-600' : riskScore < 80 ? 'text-amber-500' : 'text-red-500'}`}>
            {riskScore}
          </span>
        </div>
      </div>

      <div className="p-3 grid grid-cols-2 gap-y-3 gap-x-2">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ownership</span>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            {ownershipConfidence}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Documents</span>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <FileText className={`w-4 h-4 ${missingDocs > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
            {missingDocs > 0 ? `${missingDocs} Missing` : 'Complete'}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Disputes</span>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <Landmark className="w-4 h-4 text-emerald-500" />
            Clear
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Loans</span>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            1 Active
          </div>
        </div>
      </div>
      
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex justify-end">
        <Link to={`/property/${propertyId}`} className="w-full">
          <Button variant="secondary" className="w-full text-[11px] h-7 px-2 font-semibold shadow-sm bg-white border-slate-200 hover:bg-slate-50 hover:text-blue-600 group-hover:border-blue-200 transition-colors">
            View Intelligence Report
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(PropertyCard);
