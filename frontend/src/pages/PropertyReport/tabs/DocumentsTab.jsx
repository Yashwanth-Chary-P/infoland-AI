import React from 'react';
import { FileText, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import Badge from '../../../components/common/Badge';

const DocumentsTab = ({ plot }) => {
  const documents = plot.documents || [];
  
  const totalRequired = plot.healthSummary?.document_count || 0;
  const missing = plot.healthSummary?.missing_document_count || 0;
  const verified = totalRequired - missing;

  return (
    <div className="p-0">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Document Intelligence</h2>
        <span className="text-xs font-semibold text-slate-500">{verified} of {totalRequired} Required Documents Verified</span>
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
          <tbody className="divide-y divide-slate-100">
            {documents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No documents found.</td>
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
                  <td className="px-6 py-3.5">
                    {doc.status === 'verified' && <Badge variant="success" className="text-[10px] leading-none">VERIFIED</Badge>}
                    {doc.status === 'pending' && <Badge variant="warning" className="text-[10px] leading-none">PENDING</Badge>}
                    {doc.status === 'missing' && <Badge variant="error" className="text-[10px] leading-none">MISSING</Badge>}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={doc.status !== 'verified'}>
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
