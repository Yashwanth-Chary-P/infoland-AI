import React from 'react';
import { User, ShieldCheck, Clock } from 'lucide-react';
import DynamicFieldList from '../DynamicFieldList';

const OwnershipTab = ({ plot }) => {
  const {
    owner = {},
    registry = {},
    ownershipEvents = [],
  } = plot;

  // Ensure ownership events are sorted by date
  const sortedEvents = [...ownershipEvents].sort((a, b) => new Date(a.transfer_date) - new Date(b.transfer_date));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Current Owner Details */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-600" />
            Current Owner
          </h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800">{owner.full_name || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Owner Type</p>
            <p className="text-md font-medium text-gray-800 capitalize">{owner.owner_type?.replace(/_/g, ' ') || 'N/A'}</p>
          </div>
          <DynamicFieldList 
            data={owner} 
            excludedKeys={["owner_id", "property_id", "full_name", "owner_type"]} 
          />
        </div>

        {/* Registry Info */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" />
            Registry Information
          </h2>
          <DynamicFieldList data={registry} excludedKeys={["property_id", "registry_id"]} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Ownership History / Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Ownership History
          </h2>
          
          <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>
                  <p className="text-sm font-bold capitalize text-gray-800">
                    {evt.transfer_type?.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-indigo-600 font-semibold mb-2">
                    {evt.transfer_date}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                     <p className="text-sm text-gray-700"><span className="font-medium">From:</span> {evt.from_owner_name || evt.from_owner_id || 'Unknown'}</p>
                     <p className="text-sm text-gray-700"><span className="font-medium">To:</span> {evt.to_owner_name || evt.to_owner_id || 'Unknown'}</p>
                     {evt.document_ref && <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Ref:</span> {evt.document_ref}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No ownership history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipTab;
