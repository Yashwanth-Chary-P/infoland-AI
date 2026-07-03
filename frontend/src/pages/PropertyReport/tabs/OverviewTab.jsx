import React from 'react';
import { MapPin, Box, Ruler, CheckCircle2 } from 'lucide-react';

const OverviewTab = ({ plot }) => {
  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Property Profile</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metadata Cards */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <Box className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Type</span>
          </div>
          <p className="text-sm font-bold text-slate-900 capitalize tracking-wide">{plot.profile?.property_class ? plot.profile.property_class.replace(/_/g, ' ') : 'N/A'}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <Ruler className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Area</span>
          </div>
          <p className="text-sm font-bold text-slate-900 tracking-wide">{plot.area_sq_ft ? `${plot.area_sq_ft} Sq. Ft.` : 'N/A'}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Zoning</span>
          </div>
          <p className="text-sm font-bold text-slate-900 capitalize tracking-wide">{plot.metadata?.zone_type || 'N/A'}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Coordinates</span>
          </div>
          <p className="text-sm font-mono font-bold text-slate-900 tracking-wide">
            {plot.centroid_lat && plot.centroid_lon ? `${plot.centroid_lat.toFixed(4)}, ${plot.centroid_lon.toFixed(4)}` : 'N/A'}
          </p>
        </div>

      </div>

      <div className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Location Details</h3>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-medium capitalize">
          Located in {plot.source_region || 'Unknown Region'}, this property is classified for {plot.metadata?.land_use || 'Unknown'} use.
          The property is considered {plot.metadata?.development_stage || 'Unknown'}.
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
