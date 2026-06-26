import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetailedPlotById } from "../features/detailedPlots/detailedPlotsSlice";
import DynamicFieldList from "./DynamicFieldList";
import {
  ArrowLeft,
  MapPin,
  Building,
  Activity,
  FileText,
  User,
  Clock,
  Briefcase,
  AlertTriangle,
  Landmark,
  ShieldCheck
} from "lucide-react";

const PlotDetailsPage = () => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selected: plot, loading } = useSelector((state) => state.detailedPlots);

  useEffect(() => {
    if (plotId) {
      dispatch(fetchDetailedPlotById(plotId));
    }
  }, [dispatch, plotId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-blue-600">Loading Property Details...</p>
      </div>
    );
  }

  if (!plot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    profile,
    metadata,
    healthSummary,
    registry,
    owner,
    ownershipEvents,
    timeline,
    documents,
    loans,
    taxes,
    courtDisputes,
    pois
  } = plot;

  // Combine timeline events
  const rawTimelineEvents = timeline?.events || [];
  const rawOwnershipEvents = ownershipEvents || [];
  
  const combinedTimeline = [
    ...rawTimelineEvents.map(e => ({ ...e, _source: 'timeline' })),
    ...rawOwnershipEvents.map(e => ({ ...e, event_type: e.transfer_type || 'Ownership Transfer', event_date: e.transfer_date, _source: 'ownership' }))
  ].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  // Group POIs
  const groupedPois = (pois || []).reduce((acc, poi) => {
    const type = poi.poi_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(poi);
    return acc;
  }, {});

  const excludedSystemKeys = ["property_id", "owner_id", "poi_id", "dispute_id", "loan_id", "tax_id", "document_id", "event_id", "_source", "geometry", "bbox"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Property #{plot.property_id}</h1>
          <div />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Summary, Health, Metadata */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><Building className="w-5 h-5 mr-2" /> Profile</h2>
            <DynamicFieldList 
              data={{ ...profile, area_sq_m: plot.area_sq_m, region: plot.source_region, building: plot.building, perimeter_m: plot.perimeter_m }} 
              excludedKeys={excludedSystemKeys} 
              preferredOrder={["property_class", "verification_workflow", "sale_status", "area_sq_m"]}
            />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><Activity className="w-5 h-5 mr-2" /> Health Summary</h2>
            <DynamicFieldList data={healthSummary} excludedKeys={excludedSystemKeys} />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" /> Metadata</h2>
            <DynamicFieldList data={metadata} excludedKeys={excludedSystemKeys} />
          </div>
          
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><MapPin className="w-5 h-5 mr-2" /> Points of Interest</h2>
            {Object.keys(groupedPois).length > 0 ? (
              <div className="space-y-4">
                {Object.keys(groupedPois).map(type => (
                  <div key={type}>
                    <h3 className="font-semibold text-gray-700 capitalize border-b pb-1 mb-2">{type}</h3>
                    <div className="space-y-3">
                      {groupedPois[type].map((poi, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <DynamicFieldList data={poi} excludedKeys={[...excludedSystemKeys, "poi_type"]} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">No POIs found.</p>}
          </div>
        </div>

        {/* Middle Column: Owner, Timeline, Registry */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><User className="w-5 h-5 mr-2" /> Current Owner</h2>
            <DynamicFieldList data={owner} excludedKeys={excludedSystemKeys} preferredOrder={["full_name", "owner_type", "phone", "email"]} />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4"><Clock className="w-5 h-5 mr-2" /> Ownership Timeline</h2>
            <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
              {combinedTimeline.length > 0 ? combinedTimeline.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
                  <p className="text-sm font-semibold capitalize text-gray-800">{evt.event_type.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-blue-600 font-medium mb-1">{evt.event_date}</p>
                  <DynamicFieldList data={evt} excludedKeys={[...excludedSystemKeys, "event_type", "event_date", "transfer_type", "transfer_date"]} />
                </div>
              )) : <p className="text-sm text-gray-500">No timeline events available.</p>}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-2"><ShieldCheck className="w-5 h-5 mr-2" /> Registry Info</h2>
            <DynamicFieldList data={registry} excludedKeys={["property_id"]} />
          </div>
        </div>

        {/* Right Column: Financials, Legal, Documents */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4"><Landmark className="w-5 h-5 mr-2" /> Financials & Taxes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">Loans</h3>
                {loans?.length > 0 ? (
                  <div className="space-y-3">
                    {loans.map((l, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <DynamicFieldList data={l} excludedKeys={excludedSystemKeys} />
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-500">No active loans</p>}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">Taxes</h3>
                {taxes?.length > 0 ? (
                  <div className="space-y-3">
                    {taxes.map((t, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <DynamicFieldList data={t} excludedKeys={excludedSystemKeys} />
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-500">No tax records</p>}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4"><AlertTriangle className="w-5 h-5 mr-2" /> Court Disputes</h2>
            <div className="space-y-3">
              {courtDisputes?.length > 0 ? courtDisputes.map((d, i) => (
                <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-100">
                   <p className="text-sm font-semibold text-red-800 mb-1">{d.dispute_id}</p>
                   <DynamicFieldList data={d} excludedKeys={excludedSystemKeys} />
                </div>
              )) : <p className="text-sm text-green-600">No active disputes</p>}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4"><Briefcase className="w-5 h-5 mr-2" /> Documents</h2>
            <div className="space-y-3">
              {documents?.length > 0 ? documents.map((doc, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-800 mb-1 capitalize">{doc.document_type?.replace(/_/g, ' ')}</p>
                  <DynamicFieldList data={doc} excludedKeys={[...excludedSystemKeys, "document_type"]} />
                </div>
              )) : <p className="text-sm text-gray-500">No documents found.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlotDetailsPage;
