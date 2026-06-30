import React from 'react';
import { MapPin, Navigation, Bus, Train, Building2, Building } from 'lucide-react';

const LocationTab = ({ plot }) => {
  const pois = [
    { name: 'City Center', dist: '2.4 km', icon: Building2 },
    { name: 'Metro Station', dist: '800 m', icon: Train },
    { name: 'Bus Terminal', dist: '1.2 km', icon: Bus },
    { name: 'General Hospital', dist: '3.5 km', icon: Building }
  ];

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Location Intelligence</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Connectivity Profile</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-black text-emerald-500 tracking-tighter">88</span>
              <span className="text-slate-400 font-bold">/100</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Location Score</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Excellent connectivity. The property is situated within a high-development zone with major infrastructure upgrades scheduled for 2025.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Points of Interest</h3>
          <div className="space-y-3">
            {pois.map((poi, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
                    <poi.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{poi.name}</span>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500">{poi.dist}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
