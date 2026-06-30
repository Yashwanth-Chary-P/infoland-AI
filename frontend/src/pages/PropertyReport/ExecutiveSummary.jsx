import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, FileWarning } from 'lucide-react';

const ExecutiveSummary = ({ plot }) => {
  const riskScore = plot.risk_score || 82;
  const isHighRisk = riskScore > 80;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      
      {/* Verification Score Card */}
      <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-1 bg-emerald-500"></div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Overall Score</h3>
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-6xl font-black tracking-tighter ${riskScore < 50 ? 'text-emerald-500' : riskScore < 80 ? 'text-amber-500' : 'text-red-500'}`}>
            {riskScore}
          </span>
          <span className="text-xl text-slate-400 font-bold mb-2">/ 100</span>
        </div>
        <p className="text-sm font-semibold text-slate-700">Verification Recommended</p>
      </div>

      {/* Recommendations & Risks */}
      <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommendation
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
            The property holds a strong verification score. Ownership chain is unbroken for the last 30 years. Financial records show one active loan which requires a No Objection Certificate (NOC) prior to transfer.
          </p>
          <div className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-2 rounded border border-blue-100 inline-block">
            Clear for provisional acquisition.
          </div>
        </div>
        
        <div className="w-px bg-slate-100 hidden md:block"></div>

        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Key Risks
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span className="text-xs font-medium text-slate-700">Active mortgage with HDFC Bank. Requires clearance.</span>
            </li>
            <li className="flex items-start gap-2">
              <FileWarning className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span className="text-xs font-medium text-slate-700">Recent mutation record (2023) pending final approval.</span>
            </li>
            {isHighRisk && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-slate-700 text-red-600">High Risk: Ongoing boundary dispute in civil court.</span>
              </li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ExecutiveSummary;
