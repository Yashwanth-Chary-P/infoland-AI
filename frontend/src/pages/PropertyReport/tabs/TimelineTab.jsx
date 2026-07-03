import React from 'react';
import { Calendar, User, FileText, Landmark } from 'lucide-react';

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
      <h2 className="text-lg font-bold text-slate-900 mb-8">Investigation Audit Log</h2>
      
      <div className="relative border-l border-slate-200 ml-3 space-y-0 pb-4">
        {events.length === 0 ? (
          <div className="text-slate-500 text-sm font-medium italic">No timeline events found.</div>
        ) : (
          events.map((event, i) => {
            const isAlert = event.event_type?.includes('dispute') || event.event_type?.includes('default');
            const isGood = event.event_type?.includes('paid') || event.event_type?.includes('verified') || event.event_type?.includes('cleared');
            const color = isAlert ? 'bg-red-500' : isGood ? 'bg-emerald-500' : 'bg-blue-500';
            
            return (
              <div key={i} className="relative pl-8 py-4 hover:bg-slate-50/50 transition-colors group border-b border-slate-100 last:border-b-0">
                <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full ring-4 ring-white ${color}`}></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-slate-900 capitalize">{event.event_type?.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    {event.event_date || '-'}
                  </div>
                </div>
                {event.remarks && <p className="text-sm text-slate-500 font-medium mt-1">{event.remarks}</p>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TimelineTab;
