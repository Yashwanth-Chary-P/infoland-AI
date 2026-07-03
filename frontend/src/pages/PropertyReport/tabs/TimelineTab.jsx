import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, History } from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState.jsx';

const TimelineTab = ({ plot }) => {
  let events = [];
  if (Array.isArray(plot.timeline)) {
    events = plot.timeline;
  } else if (plot.timeline?.events) {
    events = plot.timeline.events;
  }
  
  // Sort descending by date
  events = [...events].sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));

  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Investigation Audit Log</h2>
      
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
        {events.length === 0 ? (
          <EmptyState 
            icon={History}
            title="No timeline events recorded."
            description="There are no historical investigation logs available for this property."
            className="my-8"
          />
        ) : (
          events.map((event, i) => {
            const isAlert = event.event_type?.includes('dispute') || event.event_type?.includes('default');
            const isGood = event.event_type?.includes('paid') || event.event_type?.includes('verified') || event.event_type?.includes('cleared');
            
            const colorClass = isAlert 
              ? 'bg-rose-50 text-rose-500 ring-rose-50 border-rose-200' 
              : isGood 
                ? 'bg-emerald-50 text-emerald-500 ring-emerald-50 border-emerald-200' 
                : 'bg-blue-50 text-blue-500 ring-blue-50 border-blue-200';
            
            const Icon = isAlert ? AlertTriangle : isGood ? CheckCircle2 : FileText;
            
            return (
              <div key={i} className="relative pl-10 group">
                <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center ring-4 transition-all ${colorClass}`}>
                   <Icon className="w-3.5 h-3.5" />
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-bold text-sm text-slate-900 capitalize tracking-wide">{event.event_type?.replace(/_/g, ' ')}</h3>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      {event.event_date || 'Unknown Date'}
                    </span>
                  </div>
                  {event.remarks && <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">{event.remarks}</p>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TimelineTab;
