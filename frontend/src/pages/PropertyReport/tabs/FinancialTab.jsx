import React from 'react';
import { Landmark, TrendingDown, IndianRupee } from 'lucide-react';
import Badge from '../../../components/common/Badge';

const FinancialTab = ({ plot }) => {
  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Financial Exposure</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Landmark className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Mortgages</span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tighter">1</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pending Taxes</span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-1">
            <IndianRupee className="w-5 h-5" /> 45,000
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <IndianRupee className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Est. Valuation</span>
          </div>
          <p className="text-2xl font-black text-emerald-600 tracking-tighter flex items-center gap-1">
            <IndianRupee className="w-5 h-5" /> 1.2 Cr
          </p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-900 mb-4">Loan History</h3>
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
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-3.5 text-sm font-semibold text-slate-900">HDFC Bank</td>
              <td className="px-6 py-3.5 text-sm font-mono text-slate-600">₹50,00,000</td>
              <td className="px-6 py-3.5 text-sm font-mono text-slate-500">2020-04-10</td>
              <td className="px-6 py-3.5"><Badge variant="warning" className="text-[10px] leading-none">ACTIVE</Badge></td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-3.5 text-sm font-semibold text-slate-900">SBI</td>
              <td className="px-6 py-3.5 text-sm font-mono text-slate-600">₹15,00,000</td>
              <td className="px-6 py-3.5 text-sm font-mono text-slate-500">2010-08-22</td>
              <td className="px-6 py-3.5"><Badge variant="success" className="text-[10px] leading-none">CLEARED</Badge></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTab;
