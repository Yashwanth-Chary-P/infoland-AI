import React from 'react';
import { Briefcase, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import DynamicFieldList from '../DynamicFieldList';

const getStatusConfig = (status) => {
  const s = status?.toLowerCase();
  if (s === 'available' || s === 'verified') return { color: 'bg-green-100 text-green-700', icon: CheckCircle };
  if (s === 'missing') return { color: 'bg-red-100 text-red-700', icon: AlertCircle };
  if (s === 'expired') return { color: 'bg-yellow-100 text-yellow-700', icon: Clock };
  return { color: 'bg-gray-100 text-gray-700', icon: Briefcase };
};

const DocumentCard = ({ doc }) => {
  const { color, icon: Icon } = getStatusConfig(doc.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 capitalize flex items-center">
           <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
           {doc.document_type?.replace(/_/g, ' ')}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${color}`}>
          <Icon className="w-3 h-3 mr-1" />
          {doc.status?.toUpperCase() || 'UNKNOWN'}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Issue Date:</span> {doc.issue_date || 'N/A'}</p>
        <p><span className="font-medium">Authority:</span> {doc.issuing_authority || 'N/A'}</p>
        <p><span className="font-medium">Last Updated:</span> {doc.last_updated || 'N/A'}</p>
        {doc.remarks && (
          <p className="mt-2 text-xs italic bg-gray-50 p-2 rounded border border-gray-100">{doc.remarks}</p>
        )}
      </div>
    </div>
  );
};

const DocumentsTab = ({ plot }) => {
  const { documents = [] } = plot;

  // Group by category
  const groupedDocs = documents.reduce((acc, doc) => {
    const category = doc.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.keys(groupedDocs).length > 0 ? (
        Object.keys(groupedDocs).map((category) => (
          <div key={category}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 capitalize">
              {category.replace(/_/g, ' ')} Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedDocs[category].map((doc, idx) => (
                <DocumentCard key={idx} doc={doc} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 bg-white rounded-2xl border shadow-sm">
          <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No documents found for this property.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;
