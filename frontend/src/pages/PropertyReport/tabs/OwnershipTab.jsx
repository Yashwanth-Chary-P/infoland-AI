import React from 'react';
import { User, History } from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState.jsx';

const OwnershipTab = ({ plot }) => {
  const currentOwner = plot.owner;

  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Ownership Chain</h2>
      
      {currentOwner ? (
        <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
          <div className="relative pl-6">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-blue-500"></div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-900 capitalize">{currentOwner.full_name || 'Unknown Owner'}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-blue-50 text-blue-700">
                  {currentOwner.owner_type || 'Current Owner'}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium text-slate-500 mt-3">
                 {currentOwner.phone && <span>Phone: {currentOwner.phone}</span>}
                 {currentOwner.email && <span>Email: {currentOwner.email}</span>}
              </div>
            </div>
          </div>
          
          <div className="relative pl-6 mt-8">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-slate-300"></div>
            <div className="flex flex-col items-center justify-center py-10 bg-slate-50 border border-slate-100 rounded-lg text-center px-4">
               <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center mb-3">
                  <History className="w-4 h-4 text-slate-400" />
               </div>
               <h4 className="text-sm font-bold text-slate-900 mb-1">Historical ownership records are not available.</h4>
               <p className="text-xs text-slate-500 font-medium">Past ownership transitions have not yet been digitized for this property.</p>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState 
          icon={User}
          title="Ownership records not available."
          description="No owner data is associated with this property record."
        />
      )}
    </div>
  );
};

export default OwnershipTab;
