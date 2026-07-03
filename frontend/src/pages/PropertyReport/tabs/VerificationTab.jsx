import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const VerificationTab = ({ plot }) => {
  // Verification relies on profile verification_workflow

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Verification Progress</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
          <span className="text-sm font-semibold text-slate-700 capitalize">Workflow: {plot.profile?.verification_workflow?.replace(/_/g, ' ') || 'N/A'}</span>
          {plot.profile?.verification_workflow === 'complete_property_verification' && <div className="flex items-center text-emerald-600 text-xs font-bold uppercase"><CheckCircle2 className="w-4 h-4 mr-1" /> Verified</div>}
          {plot.profile?.verification_workflow !== 'complete_property_verification' && <div className="flex items-center text-slate-400 text-xs font-bold uppercase"><Clock className="w-4 h-4 mr-1" /> Pending</div>}
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;
