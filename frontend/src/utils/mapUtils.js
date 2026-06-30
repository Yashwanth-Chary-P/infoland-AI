import L from 'leaflet';

export const REGIONS = [
  { name: 'Kokapet', center: [17.3948, 78.3276], zoom: 14 },
  { name: 'Mokila', center: [17.4332, 78.2036], zoom: 14 },
  { name: 'Shankarpally', center: [17.4475, 78.1257], zoom: 14 }
];

/* -------------------------------------------
   POINT-IN-POLYGON DETECTION (GeoJSON [lng, lat])
-------------------------------------------- */
export function isPointInsidePolygon(clickLat, clickLng, geoJsonRing) {
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

/**
 * Determines colors for markers and polygons based on property status/risk
 */
export const getPropertyColors = (plot, isSelected, isHovered) => {
  const status = (plot?.status || plot?.profile?.verification_workflow || 'PENDING').toUpperCase();
  const riskScore = plot?.risk_score || plot?.healthSummary?.overall_score || 0;
  
  // Default Enterprise colors
  let markerColor = '#3b82f6'; // Blue
  let fillColor = '#93c5fd';   // Light Blue
  let borderColor = '#3b82f6';
  
  if (status.includes('NOT FOR SALE')) {
    markerColor = '#10b981'; // Emerald
    fillColor = '#a7f3d0';
    borderColor = '#10b981';
  } else if (riskScore >= 80) {
    markerColor = '#f43f5e'; // Rose
    fillColor = '#fecdd3';
    borderColor = '#f43f5e';
  } else if (status.includes('PENDING')) {
    markerColor = '#f59e0b'; // Amber
    fillColor = '#fde68a';
    borderColor = '#f59e0b';
  }
  
  if (isSelected) {
    markerColor = '#4338ca'; // Primary Indigo
    fillColor = '#3b82f6'; // Stronger fill
    borderColor = '#1e3a8a'; // Dark blue outline
  } else if (isHovered) {
    fillColor = borderColor;
  }

  return {
    markerColor,
    fillColor,
    borderColor,
    fillOpacity: isSelected ? 0.6 : isHovered ? 0.5 : 0.3
  };
};


/**
 * Validates if a coordinate array is valid [lat, lng] or [lng, lat]
 */
export const isValidCoord = (coord) => {
  return Array.isArray(coord) && coord.length >= 2 && !isNaN(coord[0]) && !isNaN(coord[1]);
};

/**
 * Extracts centroid coordinates as [lat, lng] for marker placement.
 * Gracefully falls back to geometry calculation if direct centroid is missing.
 */
export const extractCentroid = (plot) => {
  if (!plot) return null;
  
  // 1. Direct centroid from schema
  if (plot.centroid_lat != null && plot.centroid_lon != null) {
    return [plot.centroid_lat, plot.centroid_lon];
  }
  
  // 2. Fallback to calculating from polygon geometry
  const polygonCoords = extractPolygonCoordinates(plot);
  if (polygonCoords && polygonCoords.length > 0) {
    // Simple bounding box center as fallback centroid
    const bounds = L.latLngBounds(polygonCoords);
    const center = bounds.getCenter();
    return [center.lat, center.lng];
  }
  
  return null;
};

/**
 * Extracts GeoJSON polygon coordinates and maps them to Leaflet [lat, lng] format.
 */
export const extractPolygonCoordinates = (plot) => {
  if (!plot || !plot.geometry || !plot.geometry.coordinates) return null;
  
  try {
    // Assuming GeoJSON format: geometry.coordinates[0] contains the outer ring
    const coords = plot.geometry.coordinates[0];
    if (Array.isArray(coords) && coords.length > 0) {
      // GeoJSON is [lng, lat], Leaflet wants [lat, lng]
      return coords.map(pt => [pt[1], pt[0]]);
    }
  } catch (error) {
    console.warn("Failed to parse geometry for plot", plot.property_id || plot._id, error);
  }
  return null;
};

/**
 * Validates if the property has any plottable coordinates (centroid or polygon).
 */
export const validateCoordinates = (plot) => {
  return extractCentroid(plot) !== null || extractPolygonCoordinates(plot) !== null;
};

/**
 * Builds a Leaflet LatLngBounds object encompassing all provided plots.
 */
export const buildLeafletBounds = (plots) => {
  if (!plots || !plots.length) return null;
  
  const validCoords = [];
  plots.forEach(plot => {
    // Collect all polygon points if available for tightest bounds
    const polyCoords = extractPolygonCoordinates(plot);
    if (polyCoords) {
      validCoords.push(...polyCoords);
    } else {
      // Fallback to centroid
      const centroid = extractCentroid(plot);
      if (centroid) {
        validCoords.push(centroid);
      }
    }
  });

  if (validCoords.length > 0) {
    return L.latLngBounds(validCoords);
  }
  
  return null;
};
