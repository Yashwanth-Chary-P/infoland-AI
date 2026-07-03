import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import { 
  extractCentroid, 
  extractPolygonCoordinates, 
  validateCoordinates, 
  isPointInsidePolygon, 
  getPropertyColors,
  REGIONS
} from '../../../utils/mapUtils';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color, scale = 1) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: ${16 * scale}px;
      height: ${16 * scale}px;
      border-radius: 50%;
      border: ${2 * scale}px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
    "></div>`,
    iconSize: [16 * scale, 16 * scale],
    iconAnchor: [8 * scale, 8 * scale],
  });
};

function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => onClick(e.latlng),
  });
  return null;
}

// Viewport Clustering & Polygon Component
const ViewportClustering = ({ plots, hoveredPropertyId, selectedPropertyId, onSelectProperty, selectedRegion }) => {
  const [bounds, setBounds] = useState(null);
  const map = useMap();

  useMapEvents({
    moveend: () => setBounds(map.getBounds()),
    zoomend: () => setBounds(map.getBounds())
  });

  useEffect(() => {
    setBounds(map.getBounds());
  }, [map]);

  // Update map bounds ONLY when selectedRegion changes
  useEffect(() => {
    if (selectedRegion) {
      const regionData = REGIONS.find(r => r.name.toLowerCase() === selectedRegion.toLowerCase());
      if (regionData) {
        map.flyTo(regionData.center, regionData.zoom, { animate: true, duration: 1.5 });
      }
    }
  }, [selectedRegion, map]);

  // Handle map clicks to detect polygon clicks
  const handleMapClick = useCallback(({ lat, lng }) => {
    if (!plots) return;
    const matchedPlot = plots.find((plot) => {
      const polygonCoords = extractPolygonCoordinates(plot);
      if (!polygonCoords) return false;
      // Convert to [lng, lat] for isPointInsidePolygon which expects GeoJSON ring
      const geoJsonRing = polygonCoords.map(c => [c[1], c[0]]);
      return isPointInsidePolygon(lat, lng, geoJsonRing);
    });

    if (matchedPlot) {
      onSelectProperty(matchedPlot.property_id || matchedPlot.id || matchedPlot._id);
    }
  }, [plots, onSelectProperty]);

  // Only render markers inside the current viewport to optimize DOM nodes
  const visiblePlots = useMemo(() => {
    if (!bounds || !plots) return [];
    return plots.filter(plot => {
      if (!validateCoordinates(plot)) return false;
      const centroid = extractCentroid(plot);
      if (!centroid) return false;
      return bounds.contains(centroid);
    });
  }, [plots, bounds]);

  const renderedPolygons = useMemo(() => {
    if (!plots) return null;
    return plots.map((plot) => {
      const id = plot.property_id || plot.id || plot._id;
      const leafletCoords = extractPolygonCoordinates(plot);
      if (!leafletCoords) return null;

      const isHovered = hoveredPropertyId === id;
      const isSelected = selectedPropertyId === id;
      const colors = getPropertyColors(plot, isSelected, isHovered);

      return (
        <Polygon
          key={`poly-${id}`}
          positions={leafletCoords}
          pathOptions={{
            color: colors.borderColor,
            fillColor: colors.fillColor,
            fillOpacity: colors.fillOpacity,
            weight: isSelected ? 3 : 1
          }}
          eventHandlers={{
            click: () => onSelectProperty(id),
            mouseover: () => {
              // Ensure we don't accidentally fire multiple hover events in quick succession
              setTimeout(() => {
                const sidebar = document.querySelector('.custom-scrollbar');
                if (sidebar && !isSelected) {
                   const card = document.getElementById(`property-card-${id}`);
                   if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }, 50);
            }
          }}
        />
      );
    });
  }, [plots, selectedPropertyId, hoveredPropertyId, onSelectProperty]);

  return (
    <>
      <MapClickHandler onClick={handleMapClick} />
      
      {renderedPolygons}
      
      {visiblePlots.map(plot => {
        const id = plot.property_id || plot.id || plot._id;
        const isHovered = hoveredPropertyId === id;
        const isSelected = selectedPropertyId === id;
        const colors = getPropertyColors(plot, isSelected, isHovered);
        
        const scale = isSelected || isHovered ? 1.5 : 1;
        const icon = createCustomIcon(colors.markerColor, scale);
        const centroid = extractCentroid(plot);
        
        const status = (plot.profile?.verification_workflow || 'PENDING').replace(/_/g, ' ');
        const riskScore = plot.healthSummary?.overall_score || 'N/A';
        const verificationStatus = plot.profile?.verification_workflow === 'complete_property_verification' ? 'VERIFIED' : 'PENDING';
        const region = plot.source_region || 'Unknown';

        return (
          <Marker 
            key={`marker-${id}`} 
            position={centroid}
            icon={icon}
            eventHandlers={{
              click: () => onSelectProperty(id),
              mouseover: () => {
                setTimeout(() => {
                  const sidebar = document.querySelector('.custom-scrollbar');
                  if (sidebar && !isSelected) {
                     const card = document.getElementById(`property-card-${id}`);
                     if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }, 50);
              }
            }}
          >
            <Popup className="premium-popup">
              <div className="p-1 min-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs font-bold text-slate-700">PID: {id}</span>
                  <Badge variant={verificationStatus === 'VERIFIED' ? 'success' : 'warning'} className="text-[9px] px-1.5 py-0.5">{verificationStatus}</Badge>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Status & Region</span>
                    <span className="block text-xs font-semibold text-slate-700 capitalize">{status.toLowerCase()} • {toTitleCase(region)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Risk</span>
                    <span className={`text-lg font-extrabold leading-none ${riskScore === 'N/A' ? 'text-slate-400' : riskScore < 50 ? 'text-emerald-600' : riskScore < 80 ? 'text-amber-500' : 'text-red-500'}`}>{riskScore}</span>
                  </div>
                </div>
                <Link to={`/property/${id}`}>
                  <Button variant="primary" size="sm" className="w-full text-[10px] h-7 bg-slate-900 text-white border-transparent">
                    View Intelligence Report
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

// Helper function inside ExploreMap scope since it's just for display
const toTitleCase = (str) => {
  if (!str) return '';
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const ExploreMap = ({ plots, selectedPropertyId, hoveredPropertyId, onSelectProperty, selectedRegion }) => {
  // Use a fallback center
  const defaultCenter = [17.3850, 78.4867];

  return (
    <div className="h-full w-full relative">
      <style>{`
        .leaflet-container { width: 100%; height: 100%; z-index: 1; }
        .premium-popup .leaflet-popup-content-wrapper { border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
        .premium-popup .leaflet-popup-content { margin: 12px; }
        .premium-popup .leaflet-popup-tip { box-shadow: none; border-top: 1px solid #e2e8f0; border-left: 1px solid #e2e8f0; }
        .leaflet-control-zoom a { border: none !important; color: #64748b !important; }
        .leaflet-control-zoom a:hover { color: #0f172a !important; background-color: #f8fafc !important; }
        .leaflet-bar { border: 1px solid #e2e8f0 !important; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important; border-radius: 8px !important; overflow: hidden; }
      `}</style>
      
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        zoomControl={false}
        className="h-full w-full bg-slate-100"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* Custom Zoom Control Positioned appropriately */}
        <div className="leaflet-top leaflet-right mt-4 mr-4">
          <div className="leaflet-control-zoom leaflet-bar leaflet-control">
            <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in" onClick={(e) => {e.preventDefault(); document.querySelector('.leaflet-container')._leaflet_map.zoomIn();}}>+</a>
            <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out" onClick={(e) => {e.preventDefault(); document.querySelector('.leaflet-container')._leaflet_map.zoomOut();}}>−</a>
          </div>
        </div>

        <ViewportClustering 
          plots={plots} 
          hoveredPropertyId={hoveredPropertyId} 
          selectedPropertyId={selectedPropertyId}
          onSelectProperty={onSelectProperty}
          selectedRegion={selectedRegion}
        />
      </MapContainer>
    </div>
  );
};

export default React.memo(ExploreMap);
