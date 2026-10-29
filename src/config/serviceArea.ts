/**
 * Service Area Configuration
 * Launch area: Koramangala, Bengaluru
 */

export interface ServiceAreaBounds {
  name: string
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

// MOCK approximate bounds for Koramangala, Bengaluru launch area
export const KORAMANGALA_SERVICE_AREA: ServiceAreaBounds = {
  name: "Koramangala, Bengaluru",
  minLat: 12.915,
  maxLat: 12.955,
  minLng: 77.605,
  maxLng: 77.645,
}

export function isCoordinateInServiceArea(
  lat: number,
  lng: number,
  area: ServiceAreaBounds = KORAMANGALA_SERVICE_AREA,
): boolean {
  return (
    lat >= area.minLat &&
    lat <= area.maxLat &&
    lng >= area.minLng &&
    lng <= area.maxLng
  )
}

