import React from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const VerificationTab = ({ plot }) => {
  const workflow = plot.profile?.verification_workflow || 'N/A';
  const isVerified = workflow === 'complete_property_verification';

  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Verification Engine</h2>
      
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Current Workflow Status</h3>
            <p className="text-sm text-slate-500 font-medium">Dataset Engine pipeline execution phase</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-lg">
          <div>
             <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Workflow</span>
             <span className="text-sm font-bold text-slate-800 capitalize tracking-wide">{workflow.replace(/_/g, ' ')}</span>
          </div>
          <div className="mt-4 sm:mt-0">
             {isVerified ? (
               <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                 <CheckCircle2 className="w-4 h-4" /> Fully Verified
               </div>
             ) : (
               <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                 <Clock className="w-4 h-4" /> Pending Validation
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;
