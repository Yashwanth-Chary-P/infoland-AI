import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const VerificationTab = ({ plot }) => {
  const checks = [
    { name: 'Identity Verification', status: 'completed' },
    { name: 'Title Deed Check', status: 'completed' },
    { name: 'Encumbrance Certificate', status: 'completed' },
    { name: 'Tax Receipts', status: 'pending' },
    { name: 'Mutation Record', status: 'warning' },
    { name: 'Physical Survey', status: 'pending' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Verification Progress</h2>
      
      <div className="space-y-4">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-sm font-semibold text-slate-700">{check.name}</span>
            {check.status === 'completed' && <div className="flex items-center text-emerald-600 text-xs font-bold uppercase"><CheckCircle2 className="w-4 h-4 mr-1" /> Verified</div>}
            {check.status === 'pending' && <div className="flex items-center text-slate-400 text-xs font-bold uppercase"><Clock className="w-4 h-4 mr-1" /> Pending</div>}
            {check.status === 'warning' && <div className="flex items-center text-amber-500 text-xs font-bold uppercase"><AlertTriangle className="w-4 h-4 mr-1" /> Attention</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationTab;
