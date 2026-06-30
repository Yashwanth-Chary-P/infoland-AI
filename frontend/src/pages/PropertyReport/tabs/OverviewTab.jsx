import React from 'react';
import { MapPin, Box, Ruler, CheckCircle2 } from 'lucide-react';

const OverviewTab = ({ plot }) => {
  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Property Profile</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metadata Cards */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Box className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Type</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{plot.property_type || 'Commercial Land'}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Ruler className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Area</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{plot.area || '2,400 Sq. Ft.'}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Zoning</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{plot.zoning || 'Mixed-Use Residential'}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Coordinates</span>
          </div>
          <p className="text-xs font-mono font-semibold text-slate-900">
            {plot.coordinates ? `${plot.coordinates[1].toFixed(4)}, ${plot.coordinates[0].toFixed(4)}` : 'N/A'}
          </p>
        </div>

      </div>

      <div className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Location Details</h3>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
          Located in {plot.region || 'the central district'}, this property is classified for {plot.property_type || 'Commercial'} use.
          The surrounding infrastructure has seen significant development over the last 5 years, improving its overall valuation and location score.
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
