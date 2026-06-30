import React from 'react';
import { User, Calendar } from 'lucide-react';

const OwnershipTab = ({ plot }) => {
  const history = [
    { owner: 'Rajesh Kumar', date: '2018 - Present', type: 'Current Owner' },
    { owner: 'Sunita Sharma', date: '2005 - 2018', type: 'Previous Owner' },
    { owner: 'Ramesh Singh', date: '1992 - 2005', type: 'Previous Owner' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Ownership Chain</h2>
      
      <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
        {history.map((record, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white ${i === 0 ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-900">{record.owner}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  {record.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-3">
                <Calendar className="w-3.5 h-3.5" />
                {record.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnershipTab;
