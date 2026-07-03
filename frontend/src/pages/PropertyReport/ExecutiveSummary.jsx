import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, FileWarning } from 'lucide-react';

const ExecutiveSummary = ({ plot }) => {
  const riskScore = plot.healthSummary?.overall_score ?? 'N/A';
  const hasScore = riskScore !== 'N/A';
  
  const hasLoans = plot.healthSummary?.active_loan_count > 0;
  const hasDisputes = plot.healthSummary?.court_dispute_count > 0;
  const hasMissingDocs = plot.healthSummary?.missing_document_count > 0;
  const isClear = !hasLoans && !hasDisputes && !hasMissingDocs;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      
      {/* Verification Score Card */}
      <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-1 bg-emerald-500"></div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Overall Score</h3>
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-6xl font-black tracking-tighter ${!hasScore ? 'text-slate-400' : riskScore < 50 ? 'text-emerald-500' : riskScore < 80 ? 'text-amber-500' : 'text-red-500'}`}>
            {riskScore}
          </span>
          <span className="text-xl text-slate-400 font-bold mb-2">{hasScore ? '/ 100' : ''}</span>
        </div>
        <p className="text-sm font-semibold text-slate-700">{hasScore ? 'Score Available' : 'Score Pending Calculation'}</p>
      </div>

      {/* Recommendations & Risks */}
      <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommendation
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
            {!hasScore 
              ? 'Complete AI risk evaluation is pending. Review the known risks below.'
              : isClear 
                ? 'The property holds a strong verification score based on available data. No active loans, disputes, or missing documents identified.'
                : 'The property has pending verification items that need to be addressed. See Key Risks for details.'}
          </p>
          <div className={`${!hasScore ? 'bg-slate-50 text-slate-700 border-slate-200' : isClear ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-amber-50 text-amber-800 border-amber-100'} text-xs font-semibold px-3 py-2 rounded border inline-block`}>
            {!hasScore ? 'Insufficient data for final recommendation.' : isClear ? 'Clear for provisional acquisition.' : 'Further investigation recommended.'}
          </div>
        </div>
        
        <div className="w-px bg-slate-100 hidden md:block"></div>

        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Key Risks
          </h3>
          <ul className="space-y-3">
            {isClear && (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-slate-700">No active risks identified.</span>
              </li>
            )}
            {hasLoans && (
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-slate-700">Active mortgage/loans found. Requires clearance.</span>
              </li>
            )}
            {hasMissingDocs && (
              <li className="flex items-start gap-2">
                <FileWarning className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-slate-700">{plot.healthSummary.missing_document_count} missing documents required for verification.</span>
              </li>
            )}
            {hasDisputes && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-slate-700 text-red-600">High Risk: {plot.healthSummary.court_dispute_count} active court dispute(s) detected.</span>
              </li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ExecutiveSummary;
