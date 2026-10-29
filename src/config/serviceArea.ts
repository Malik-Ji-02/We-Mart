/**
 * Service Area Configuration
 *
 * NOTE: The service area check is currently configured for Haryana, while the demo
 * shop data is located in Koramangala, Bengaluru. The launch city configuration will
 * unify these in a subsequent phase.
 */

export interface ServiceAreaBounds {
  name: string
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export const HARYANA_SERVICE_AREA: ServiceAreaBounds = {
  name: "Haryana",
  minLat: 27.65,
  maxLat: 30.92,
  minLng: 74.45,
  maxLng: 77.6,
}

export function isCoordinateInServiceArea(
  lat: number,
  lng: number,
  area: ServiceAreaBounds = HARYANA_SERVICE_AREA,
): boolean {
  return (
    lat >= area.minLat &&
    lat <= area.maxLat &&
    lng >= area.minLng &&
    lng <= area.maxLng
  )
}
