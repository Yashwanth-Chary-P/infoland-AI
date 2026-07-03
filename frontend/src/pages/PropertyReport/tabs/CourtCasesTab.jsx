import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import EmptyState from '../../../components/common/EmptyState.jsx';

const CourtCasesTab = ({ plot }) => {
  const courtCases = plot.courtDisputes || [];
  const hasDisputes = courtCases.length > 0;

  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Legal & Court Disputes</h2>
      
      {hasDisputes ? (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Case ID</th>
                <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Court</th>
                <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Type</th>
                <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Filing Date</th>
                <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courtCases.map((dispute, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-mono text-slate-900 font-bold">{dispute.dispute_id || 'UNKNOWN'}</td>
                  <td className="px-6 py-3.5 text-sm font-medium text-slate-600 capitalize">{dispute.court_name || 'City Civil Court'}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-600 capitalize">{dispute.case_type?.replace(/_/g, ' ') || 'General Dispute'}</td>
                  <td className="px-6 py-3.5 text-sm font-mono text-slate-500">{dispute.filing_date || '-'}</td>
                  <td className="px-6 py-4">
                    {dispute.status?.toLowerCase() === 'ongoing' && <Badge variant="error" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">ONGOING</Badge>}
                    {dispute.status?.toLowerCase() === 'resolved' && <Badge variant="success" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">RESOLVED</Badge>}
                    {!['ongoing', 'resolved'].includes(dispute.status?.toLowerCase()) && <Badge variant="warning" className="text-[10px] leading-none uppercase px-2 py-0.5">{dispute.status || 'UNKNOWN'}</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState 
          icon={CheckCircle2}
          title="No Active Disputes"
          description="No court cases or legal holds found across verified registries."
          className="my-8"
        />
      )}
    </div>
  );
};

export default CourtCasesTab;
