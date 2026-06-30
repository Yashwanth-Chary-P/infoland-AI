import React from 'react';
import { Calendar, User, FileText, Landmark } from 'lucide-react';

const TimelineTab = ({ plot }) => {
  const events = [
    { date: '2023-11-20', type: 'Verification', title: 'Property Tax Verified', desc: 'Tax receipts verified for FY 2023-24', icon: Landmark, color: 'bg-emerald-500' },
    { date: '2023-09-14', type: 'Legal', title: 'Court Dispute Filed', desc: 'Boundary dispute OS/1204/2023 initiated', icon: Landmark, color: 'bg-red-500' },
    { date: '2020-04-10', type: 'Financial', title: 'Mortgage Registered', desc: 'HDFC Bank registered mortgage for ₹50L', icon: Landmark, color: 'bg-amber-500' },
    { date: '2018-05-12', type: 'Registry', title: 'Ownership Transfer', desc: 'Property transferred to Rajesh Kumar', icon: User, color: 'bg-blue-500' },
    { date: '2005-08-14', type: 'Registry', title: 'Ownership Transfer', desc: 'Property transferred to Sunita Sharma', icon: User, color: 'bg-blue-500' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-8">Investigation Audit Log</h2>
      
      <div className="relative border-l border-slate-200 ml-3 space-y-0 pb-4">
        {events.map((event, i) => (
          <div key={i} className="relative pl-8 py-4 hover:bg-slate-50/50 transition-colors group border-b border-slate-100 last:border-b-0">
            {/* Small colored node */}
            <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full ring-4 ring-white ${event.color}`}></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-slate-900">{event.title}</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{event.type}</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                {event.date}
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium mt-1">{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineTab;
