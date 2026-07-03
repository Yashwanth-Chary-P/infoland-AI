import React from 'react';
import { Landmark, TrendingDown, IndianRupee } from 'lucide-react';
import Badge from '../../../components/common/Badge';

const FinancialTab = ({ plot }) => {
  const loans = plot.loans || [];
  
  return (
    <div className="p-8">
      <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Financial Exposure</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-4">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
               <Landmark className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Mortgages</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">{plot.healthSummary?.active_loan_count ?? 'N/A'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-4">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
               <TrendingDown className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Pending Taxes</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-1">
            {plot.healthSummary?.pending_tax_count ?? 'N/A'}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500 mb-4">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
               <IndianRupee className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Est. Valuation</span>
          </div>
          <p className="text-3xl font-black text-emerald-600 tracking-tighter flex items-center gap-1">
            {plot.metadata?.estimated_valuation ? <><IndianRupee className="w-6 h-6" /> {plot.metadata.estimated_valuation}</> : 'N/A'}
          </p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-wide">Loan History</h3>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Bank/Institution</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Amount</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Date</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loans.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 text-sm font-medium italic">No loan history available.</td>
              </tr>
            ) : (
              loans.map((loan, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-slate-900 capitalize">{loan.lender_name || loan.bank_name || 'Unknown Institution'}</td>
                  <td className="px-6 py-3.5 text-sm font-mono text-slate-600">
                    {loan.outstanding_amount != null ? `₹${loan.outstanding_amount.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-6 py-3.5 text-sm font-mono text-slate-500">{loan.loan_date || '-'}</td>
                  <td className="px-6 py-4">
                    {loan.status?.toLowerCase() === 'active' && <Badge variant="warning" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">ACTIVE</Badge>}
                    {loan.status?.toLowerCase() === 'closed' && <Badge variant="success" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">CLEARED</Badge>}
                    {!['active', 'closed'].includes(loan.status?.toLowerCase()) && <Badge variant="secondary" className="text-[10px] leading-none uppercase px-2 py-0.5">{loan.status || 'UNKNOWN'}</Badge>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTab;
