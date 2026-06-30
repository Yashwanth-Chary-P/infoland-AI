import React, { useState, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
  useMap,
  Marker,
  Popup
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../CSS/PlotMap.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchDetailedPlots, fetchDetailedPlotById, loadMoreDetailedPlots } from "../../features/detailedPlots/detailedPlotsSlice";
import { getPOIs } from "../../services/data/POIService";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { extractPolygonCoordinates, REGIONS, isPointInsidePolygon } from "../../utils/mapUtils";
// Setup default marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => onClick(e.latlng),
  });
  return null;
}

/* -------------------------------------------
   MapController for FlyTo
-------------------------------------------- */
function MapController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}


const PlotMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [landDetails, setLandDetails] = useState(null);
  const [center, setCenter] = useState([17.385, 78.486]);
  const [mapZoom, setMapZoom] = useState(11);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingPage, setIsFetchingPage] = useState(false);
  const [pois, setPois] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getPOIs().then(data => setPois(data || []));
  }, []);

  const { list: detailedPlots, loading: globalLoading, error: globalError, pagination } = useSelector((state) => state.detailedPlots);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region.name);
    setCenter(region.center);
    setMapZoom(region.zoom);
    setLandDetails(null);
    setPolygon([]);
    setCurrentPage(1);
    setIsFetchingPage(false);
    dispatch(fetchDetailedPlots({ region: region.name.toLowerCase(), page: 1 }));
  };

  /* ------------------------------
      MAP CLICK HANDLER (Correct)
  ------------------------------ */
  const handleMapClick = useCallback(
    async ({ lat, lng }) => {
      if (!selectedRegion) return; // Prevent clicking if no region loaded
      
      setLandDetails(null);
      setLoading(true);

      // 1️⃣ Detect exactly which polygon contains the click
      const matchedPlot = detailedPlots.find((plot) => {
        if (!plot.geometry || !plot.geometry.coordinates) return false;
        return isPointInsidePolygon(lat, lng, plot.geometry.coordinates[0]);
      });

      if (!matchedPlot) {
        setPolygon([]);
        setLandDetails({
          name: "No Plot Found",
          propertyClass: "-",
          area: "-",
          owner: "-",
          verificationWorkflow: "-",
          riskScore: "-"
        });
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch accurate backend data ALWAYS
      const response = await dispatch(fetchDetailedPlotById(matchedPlot.property_id));
      const data = response.payload || matchedPlot;

      // 3️⃣ Fix polygon auto-close & convert to [lat, lng]
      const leafletCoords = extractPolygonCoordinates(data) || extractPolygonCoordinates(matchedPlot);
      
      if (leafletCoords) {
        setPolygon(leafletCoords);
      } else {
        setPolygon([]);
      }

      // 4️⃣ Update sidebar strictly with backend fields
      setLandDetails({
        name: data.property_id || matchedPlot.property_id,
        propertyClass: data.profile?.property_class || "Unknown",
        area: `${data.profile?.area_sq_m || 0} sq m`,
        owner: data.currentOwner?.full_name || "Unknown",
        verificationWorkflow: data.profile?.verification_workflow === 'complete_property_verification' ? 'Complete Property Verification' : (data.profile?.verification_workflow || "Not Verified"),
        riskScore: data.healthSummary?.overall_score ?? null,
        futureRiskTier: data.healthSummary?.future_risk_tier ?? null,
        locationScore: data.healthSummary?.location_score ?? null
      });

      setLoading(false);
    },
    [detailedPlots, selectedRegion, dispatch]
  );

  // Memoize polygons to prevent re-rendering during sidebar updates
  const renderedPolygons = useMemo(() => {
    return detailedPlots.map((plot) => {
      const leafletCoords = extractPolygonCoordinates(plot);
      if (!leafletCoords) return null;

      return (
        <Polygon
          key={plot.property_id}
          positions={leafletCoords}
          pathOptions={{
            color: "#3b82f6",
            fillColor: "#93c5fd",
            fillOpacity: 0.3,
          }}
        />
      );
    });
  }, [detailedPlots]);

  return (
    <div className="flex w-full map-wrapper mx-5">
      {/* ---------------- MAP (LEFT) ---------------- */}
      <div className="w-2/3 rounded-lg overflow-hidden shadow-md relative h-full flex flex-col">
        {/* Region Toolbar */}
        <div className="bg-white px-4 py-3 border-b flex justify-between items-center z-[500] relative shadow-sm">
          <span className="font-semibold text-gray-700">Select Region:</span>
          <div className="flex space-x-2">
            {REGIONS.map((region) => (
              <button
                key={region.name}
                onClick={() => handleRegionSelect(region)}
                className={`px-4 py-1.5 rounded-md font-medium text-sm transition-colors ${
                  selectedRegion === region.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 relative">
          {globalLoading && (
            <div className="absolute inset-0 z-[1000] bg-white bg-opacity-70 flex flex-col justify-center items-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
               <span className="text-blue-700 font-medium">Fetching Properties...</span>
            </div>
          )}
          {globalError && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
               {globalError}
            </div>
          )}
          <MapContainer center={center} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
            <MapController center={center} zoom={mapZoom} />
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Draw ALL plots in light blue */}
            {renderedPolygons}

            <MapClickHandler onClick={handleMapClick} />

            {/* Highlight selected polygon */}
            {polygon.length > 0 && (
              <Polygon
                positions={polygon}
                pathOptions={{
                  color: "#1e3a8a",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.5,
                }}
              />
            )}

            {/* Render POIs */}
            {pois.map((poi) => (
              <Marker key={poi.poi_id} position={[poi.lat, poi.lon]}>
                <Popup>
                  <b>{poi.name}</b><br/>
                  {poi.poi_type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* ---------------- SIDEBAR (RIGHT) ---------------- */}
      <div className="w-1/3 bg-white border-l shadow-xl p-6 overflow-y-auto rounded-lg ml-4 h-full">
        {!landDetails ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-6">Region Information</h2>
            
            {selectedRegion ? (
              <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="mb-2"><b>Selected Region:</b> {selectedRegion}</p>
                <p className="mb-2"><b>Loaded:</b> {detailedPlots.length} / {pagination?.total || detailedPlots.length} Properties</p>
                
                {pagination && currentPage < pagination.totalPages && (
                  <button
                    onClick={async () => {
                      if (isFetchingPage || globalLoading) return;
                      setIsFetchingPage(true);
                      const nextPage = currentPage + 1;
                      
                      if (nextPage > pagination.totalPages) {
                        setIsFetchingPage(false);
                        return;
                      }

                      setCurrentPage(nextPage);
                      await dispatch(loadMoreDetailedPlots({ region: selectedRegion.toLowerCase(), page: nextPage }));
                      setIsFetchingPage(false);
                    }}
                    disabled={globalLoading || isFetchingPage}
                    className="w-full mt-2 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-md hover:bg-blue-200 transition disabled:opacity-50"
                  >
                    {globalLoading || isFetchingPage ? 'Loading...' : 'Load More'}
                  </button>
                )}

                <p className="text-sm text-blue-600 mt-4 text-center bg-blue-50 py-2 rounded">
                  Click a property on the map to view details.
                </p>
              </div>
            ) : (
              <p className="text-center bg-yellow-50 text-yellow-700 p-4 rounded-lg border border-yellow-200 w-full">
                Please select a region from the map toolbar to load properties.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {landDetails.name}
              </h3>
              <button
                onClick={() => {
                  setLandDetails(null);
                  setPolygon([]);
                }}
                className="text-gray-500 hover:text-red-500 transition font-bold"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-blue-500 text-sm">Loading details...</p>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p><b>Property Class:</b> {landDetails.propertyClass}</p>
                <p><b>Area:</b> {landDetails.area}</p>
                <p><b>Owner:</b> {landDetails.owner}</p>
                <p className={landDetails.verificationWorkflow === "Complete Property Verification" ? "text-green-600" : "text-amber-600"}>
                  <b>Verification:</b> {landDetails.verificationWorkflow}
                </p>
                
                {landDetails.futureRiskTier ? (
                  <p className="text-gray-700"><b>Future Risk Tier:</b> {landDetails.futureRiskTier}</p>
                ) : landDetails.locationScore ? (
                  <p className="text-gray-700"><b>Location Score:</b> {landDetails.locationScore}</p>
                ) : landDetails.riskScore !== null ? (
                  <p className="text-gray-700"><b>Risk Score:</b> {landDetails.riskScore}/100</p>
                ) : (
                  <p className="text-gray-500 italic">Risk Assessment: Not Generated Yet</p>
                )}
              </div>
            )}
            
            {landDetails.name !== "No Plot Found" && !loading && (
              <button
                onClick={() => navigate(`/plot/${landDetails.name}`)}
                className="w-full mt-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
              >
                Open Full Details
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlotMap;
