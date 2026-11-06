// ============================================================================
// GEOSPATIAL HAVERSINE MATHEMATICS & MAPPING UTILITIES
// Calculates true surface distance across Ahmedabad coordinates
// ============================================================================

/**
 * Calculates the exact great-circle distance in meters between two coordinates
 * using the Haversine spherical formula.
 * @param {number} lat1 Latitude of point 1
 * @param {number} lon1 Longitude of point 1
 * @param {number} lat2 Latitude of point 2
 * @param {number} lon2 Longitude of point 2
 * @returns {number} Distance in meters (rounded to nearest integer)
 */
export function calculateHaversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Estimated running/walking speed in meters/sec for urgent dispatch.
 * 3.8 m/s (~13.7 km/h) is typical brisk sprint for an alerted responder in urban street.
 */
export const ESTIMATED_RUN_SPEED_MPS = 3.8;

/**
 * Calculates walking/running ETA in seconds for a given distance in meters.
 * Sets a minimum of 30 seconds for reaction/gear time.
 */
export function calculateEtaSeconds(distanceMeters, speedMps = ESTIMATED_RUN_SPEED_MPS, minSeconds = 35) {
  return Math.max(minSeconds, Math.round(distanceMeters / speedMps));
}

/**
 * Converts Ahmedabad GPS coordinates (lat, lng) to SVG 0-100 tactical map coordinates
 * Ahmedabad Tactical Grid Bounds:
 * Lat: 22.9800° N to 23.0600° N
 * Lng: 72.4800° E to 72.6300° E
 */
export function projectGpsToTacticalMap(lat, lng) {
  const minLat = 22.9800;
  const maxLat = 23.0600;
  const minLng = 72.4800;
  const maxLng = 72.6300;

  // Clamping
  const clampedLat = Math.min(Math.max(lat, minLat), maxLat);
  const clampedLng = Math.min(Math.max(lng, minLng), maxLng);

  // Invert Y because SVG coordinates have y=0 at top
  const x = Math.round(((clampedLng - minLng) / (maxLng - minLng)) * 100);
  const y = Math.round((1 - (clampedLat - minLat) / (maxLat - minLat)) * 100);

  return { x, y };
}

/**
 * Format raw seconds into standard MM:SS string
 */
export function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

