import React, { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../CSS/PlotMap.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchDetailedPlotById } from "../../features/detailedPlots/detailedPlotsSlice";

/* -------------------------------------------
   POINT-IN-POLYGON DETECTION (No mismatching)
-------------------------------------------- */
function isPointInsidePolygon(lat, lng, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const yi = polygon[i][1];
    const xi = polygon[i][0];
    const yj = polygon[j][1];
    const xj = polygon[j][0];

    const intersect =
      yi > lng !== yj > lng &&
      lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailedPlots = useSelector((state) => state.detailedPlots.list);

  /* ------------------------------
      MAP CLICK HANDLER (Correct)
  ------------------------------ */
  const handleMapClick = useCallback(
    async ({ lat, lng }) => {
      setLandDetails(null);
      setLoading(true);

      // 1️⃣ Detect exactly which polygon contains the click
      const matchedPlot = detailedPlots.find((plot) =>
        isPointInsidePolygon(lat, lng, plot.Coordinates)
      );

      if (!matchedPlot) {
        setPolygon([]);
        setLandDetails({
          name: "No Plot Found",
          owner: "-",
          surveyNo: "-",
          area: "-",
          village: "-",
          district: "-",
          type: "-",
          registrationYear: "-",
          verifiedStatus: "Unavailable",
        });
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch accurate backend data ALWAYS (no mismatching)
      const response = await dispatch(fetchDetailedPlotById(matchedPlot.id));
      const data = response.payload;

      // 3️⃣ Fix polygon auto-close
      const poly = data.Coordinates;
      const first = poly[0];
      const last = poly[poly.length - 1];
      const closed =
        first[0] === last[0] && first[1] === last[1]
          ? poly
          : [...poly, first];

      setPolygon(closed);

      // 4️⃣ Update sidebar
      setLandDetails({
        name: `Plot ${data.id}`,
        owner: data.Owner,
        surveyNo: data["Survey No"],
        area: data.Area,
        village: data.Village,
        district: data.District,
        type: data.Type,
        registrationYear: data["Registration Year"],
        verifiedStatus: data.Status,
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
            const coords = plot.Coordinates;
            const first = coords[0];
            const last = coords[coords.length - 1];

            const closed =
              first[0] === last[0] && first[1] === last[1]
                ? coords
                : [...coords, first];

            return (
              <Polygon
                key={plot.id}
                positions={closed}
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
                <p><b>Owner:</b> {landDetails.owner}</p>
                <p><b>Survey No:</b> {landDetails.surveyNo}</p>
                <p><b>Area:</b> {landDetails.area}</p>
                <p><b>Village:</b> {landDetails.village}</p>
                <p><b>District:</b> {landDetails.district}</p>
                <p><b>Type:</b> {landDetails.type}</p>
                <p><b>Registration:</b> {landDetails.registrationYear}</p>
                <p className="text-red-600 font-medium">
                  <b>Status:</b> {landDetails.verifiedStatus}
                </p>
              </div>
            )}

            <button
              onClick={() => navigate("/plans")}
              className="w-full mt-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Background Verification
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlotMap;
