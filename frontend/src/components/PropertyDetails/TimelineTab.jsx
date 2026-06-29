import React from 'react';
import { Clock, Calendar, CheckCircle, Navigation } from 'lucide-react';
import DynamicFieldList from '../DynamicFieldList';

const TimelineTab = ({ plot }) => {
  const {
    timeline = {},
    ownershipEvents = []
  } = plot;

  const rawTimelineEvents = timeline.events || [];
  
  // Combine generic timeline events with ownership events
  const combinedTimeline = [
    ...rawTimelineEvents.map(e => ({ ...e, _source: 'timeline', _date: new Date(e.event_date) })),
    ...ownershipEvents.map(e => ({ 
      ...e, 
      event_type: e.transfer_type || 'Ownership Transfer', 
      event_date: e.transfer_date, 
      _source: 'ownership',
      _date: new Date(e.transfer_date)
    }))
  ].sort((a, b) => b._date - a._date); // Sort descending (newest first)

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center border-b pb-4">
        <Clock className="w-6 h-6 mr-3 text-indigo-600" />
        Property Event Timeline
      </h2>

      <div className="relative pl-8 border-l-2 border-indigo-200 space-y-10 py-4">
        {combinedTimeline.length > 0 ? (
          combinedTimeline.map((evt, idx) => {
            const isOwnership = evt._source === 'ownership';
            
            return (
              <div key={idx} className="relative">
                {/* Timeline Node Icon */}
                <div className="absolute -left-12 top-0 bg-white p-1 rounded-full border-2 border-indigo-200">
                  {isOwnership ? (
                     <CheckCircle className="w-5 h-5 text-purple-500" />
                  ) : (
                     <Navigation className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold capitalize text-gray-800">
                      {evt.event_type?.replace(/_/g, ' ')}
                    </h3>
                    <span className="flex items-center text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      {evt.event_date}
                    </span>
                  </div>
                  
                  <DynamicFieldList 
                    data={evt} 
                    excludedKeys={["event_type", "event_date", "transfer_type", "transfer_date", "event_id", "property_id", "_source", "_date"]} 
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 font-medium">No timeline events recorded.</p>
        )}
      </div>
    </div>
  );
};

export default TimelineTab;
