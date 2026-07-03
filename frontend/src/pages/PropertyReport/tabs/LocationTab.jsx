import React from 'react';
import { Navigation, Map } from 'lucide-react';

const LocationTab = ({ plot }) => {
  const score = plot.locationScore?.location_score;
  const hasScore = score != null;
  
  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Location Intelligence</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Connectivity Profile</h3>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 text-slate-500 mb-4">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Navigation className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Location Score</span>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className={`text-5xl font-black tracking-tighter ${!hasScore ? 'text-slate-400' : score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                {hasScore ? score : 'N/A'}
              </span>
              <span className="text-lg text-slate-400 font-bold mb-1">{hasScore ? '/ 100' : ''}</span>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
               {hasScore ? 'Location scoring data is calculated based on proximity to infrastructure and amenities.' : 'Location scoring data is not yet available for this property.'}
             </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Points of Interest</h3>
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border border-slate-100 rounded-xl text-center px-4">
             <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center mb-4">
                <Map className="w-5 h-5 text-slate-400" />
             </div>
             <h4 className="text-sm font-bold text-slate-900 mb-1">Location intelligence not yet available.</h4>
             <p className="text-xs text-slate-500 font-medium">Points of Interest details are not currently available for this property.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
