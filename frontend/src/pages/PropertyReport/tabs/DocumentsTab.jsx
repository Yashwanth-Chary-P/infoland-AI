import React from 'react';
import { FileText, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import EmptyState from '../../../components/common/EmptyState.jsx';
import { notify as toast } from '../../../utils/toast';

const DocumentsTab = ({ plot }) => {
  const documents = plot.documents || [];
  
  const totalRequired = plot.healthSummary?.document_count || 0;
  const missing = plot.healthSummary?.missing_document_count || 0;
  const verified = totalRequired - missing;

  return (
    <div className="p-0 bg-white">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Document Intelligence</h2>
          <p className="text-sm font-bold text-slate-900">Legal and municipal registry records</p>
        </div>
        <div className="mt-4 md:mt-0 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="flex flex-col text-right">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Verification Completion</span>
            <span className="text-sm font-black text-slate-800">{verified} / {totalRequired}</span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Document Name</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Category</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Issue Date</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Status</th>
              <th className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {documents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12">
                  <EmptyState 
                    icon={FileText}
                    title="No document data available."
                    description="There are no documents found for this property."
                  />
                </td>
              </tr>
            ) : (
              documents.map((doc, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-900 text-sm capitalize">{doc.document_type?.replace(/_/g, ' ') || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-600 font-medium capitalize">{doc.document_category || 'General'}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500 font-mono">{doc.issue_date || '-'}</td>
                  <td className="px-6 py-4">
                    {doc.status === 'verified' && <Badge variant="success" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">VERIFIED</Badge>}
                    {doc.status === 'pending' && <Badge variant="warning" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">PENDING</Badge>}
                    {doc.status === 'missing' && <Badge variant="error" className="text-[10px] leading-none px-2 py-0.5 shadow-sm">MISSING</Badge>}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button 
                      aria-label={`Download ${doc.document_type?.replace(/_/g, ' ')}`}
                      title="Download"
                      onClick={() => toast.info('Document download coming soon')}
                      className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={doc.status !== 'verified'}
                    >
                      <Download className="w-4 h-4 inline-block" />
                    </button>
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

export default DocumentsTab;
