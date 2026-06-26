import React, { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
  Marker,
  Popup
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../CSS/PlotMap.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchDetailedPlotById } from "../../features/detailedPlots/detailedPlotsSlice";
import { getPOIs } from "../../services/data/POIService";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Setup default marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

/* -------------------------------------------
   POINT-IN-POLYGON DETECTION (GeoJSON [lng, lat])
-------------------------------------------- */
function isPointInsidePolygon(clickLat, clickLng, geoJsonRing) {
  let inside = false;

  for (let i = 0, j = geoJsonRing.length - 1; i < geoJsonRing.length; j = i++) {
    const xi = geoJsonRing[i][0]; // lng
    const yi = geoJsonRing[i][1]; // lat
    const xj = geoJsonRing[j][0]; // lng
    const yj = geoJsonRing[j][1]; // lat

    const intersect =
      yi > clickLat !== yj > clickLat &&
      clickLng < ((xj - xi) * (clickLat - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
}

function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => onClick(e.latlng),
  });
  return null;
}

const PlotMap = () => {
  const [polygon, setPolygon] = useState([]);
  const [landDetails, setLandDetails] = useState(null);
  const [center, setCenter] = useState([17.385, 78.486]);
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getPOIs().then(data => setPois(data || []));
  }, []);

  const detailedPlots = useSelector((state) => state.detailedPlots.list);

  /* ------------------------------
      MAP CLICK HANDLER (Correct)
  ------------------------------ */
  const handleMapClick = useCallback(
    async ({ lat, lng }) => {
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
          region: "-",
          saleStatus: "-",
          verificationWorkflow: "Unavailable",
        });
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch accurate backend data ALWAYS
      const response = await dispatch(fetchDetailedPlotById(matchedPlot.property_id));
      const data = response.payload || matchedPlot;

      // 3️⃣ Fix polygon auto-close & convert to [lat, lng]
      const poly = data.geometry.coordinates[0];
      const leafletCoords = poly.map(pt => [pt[1], pt[0]]);
      
      setPolygon(leafletCoords);

      // 4️⃣ Update sidebar
      setLandDetails({
        name: data.property_id,
        propertyClass: data.profile?.property_class || "Unknown",
        area: `${data.area_sq_m} sq m`,
        region: data.source_region || "Unknown",
        saleStatus: data.metadata?.sale_status || "Unknown",
        verificationWorkflow: data.profile?.verification_workflow || "Unknown",
      });

      setCenter([lat, lng]);
      setLoading(false);
    },
    [detailedPlots, dispatch]
  );

  return (
    <div className="flex w-full map-wrapper mx-5">
      {/* ---------------- MAP (LEFT) ---------------- */}
      <div className="w-2/3 rounded-lg overflow-hidden shadow-md">
        <MapContainer center={center} zoom={18} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Draw ALL plots in light blue */}
          {detailedPlots.map((plot) => {
            if (!plot.geometry || !plot.geometry.coordinates) return null;
            const coords = plot.geometry.coordinates[0];
            const leafletCoords = coords.map(pt => [pt[1], pt[0]]);

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
          })}

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

      {/* ---------------- SIDEBAR (RIGHT) ---------------- */}
      <div className="w-1/3 bg-white border-l shadow-xl p-6 overflow-y-auto rounded-lg ml-4">
        {!landDetails ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-2">Land Information</h2>
            <p className="text-center">
              Click on any plot on the map to view detailed property information.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {landDetails.name}
              </h3>
              <button
                onClick={() => setLandDetails(null)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p className="text-blue-500">Loading property details...</p>
            ) : (
              <div className="space-y-3 text-gray-700">
                <p><b>Property Class:</b> {landDetails.propertyClass}</p>
                <p><b>Area:</b> {landDetails.area}</p>
                <p><b>Region:</b> {landDetails.region}</p>
                <p><b>Sale Status:</b> {landDetails.saleStatus}</p>
                <p className="text-red-600 font-medium">
                  <b>Verification:</b> {landDetails.verificationWorkflow}
                </p>
              </div>
            )}
            
            {landDetails.name !== "No Plot Found" && (
              <button
                onClick={() => navigate(`/plot/${landDetails.name}`)}
                className="w-full mt-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition"
              >
                View Full Details
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlotMap;
