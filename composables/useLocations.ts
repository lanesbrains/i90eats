import { I90Location } from '~/types'

export const useLocations = () => {
  const allLocations: I90Location[] = [
    "Seattle, WA",
    "Spokane, WA",
    "Missoula, MT",
    "Billings, MT",
    "Rapid City, SD",
    "Sioux Falls, SD",
    "Des Moines, IA",
    "Chicago, IL",
    "Toledo, OH",
    "Cleveland, OH",
    "Buffalo, NY",
    "Albany, NY",
    "Boston, MA"
  ]

  const getLocationDisplayName = (location: I90Location): string => {
    return location.split(', ')[0]
  }

  const getLocationState = (location: I90Location): string => {
    return location.split(', ')[1]
  }

  const getLocationAbbreviation = (location: I90Location): string => {
    const state = getLocationState(location)
    return state
  }

  const getLocationCoordinates = (location: I90Location): { lat: number; lng: number } => {
    const coordinates: Record<I90Location, { lat: number; lng: number }> = {
      "Seattle, WA": { lat: 47.6062, lng: -122.3321 },
      "Spokane, WA": { lat: 47.6588, lng: -117.4260 },
      "Missoula, MT": { lat: 46.8721, lng: -113.9940 },
      "Billings, MT": { lat: 45.7833, lng: -108.5007 },
      "Rapid City, SD": { lat: 44.0805, lng: -103.2310 },
      "Sioux Falls, SD": { lat: 43.5446, lng: -96.7311 },
      "Des Moines, IA": { lat: 41.5868, lng: -93.6250 },
      "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
      "Toledo, OH": { lat: 41.6528, lng: -83.5379 },
      "Cleveland, OH": { lat: 41.4993, lng: -81.6944 },
      "Buffalo, NY": { lat: 42.8864, lng: -78.8784 },
      "Albany, NY": { lat: 42.6526, lng: -73.7562 },
      "Boston, MA": { lat: 42.3601, lng: -71.0589 }
    }
    return coordinates[location]
  }

  const getLocationDistance = (location1: I90Location, location2: I90Location): number => {
    const coords1 = getLocationCoordinates(location1)
    const coords2 = getLocationCoordinates(location2)
    
    const R = 3959 // Earth's radius in miles
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180
    const dLng = (coords2.lng - coords1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getNearbyLocations = (location: I90Location, radius: number = 100): I90Location[] => {
    return allLocations.filter(loc => {
      if (loc === location) return false
      const distance = getLocationDistance(location, loc)
      return distance <= radius
    })
  }

  const getLocationIndex = (location: I90Location): number => {
    return allLocations.indexOf(location)
  }

  const getLocationOrder = (location: I90Location): number => {
    return getLocationIndex(location) + 1
  }

  return {
    allLocations,
    getLocationDisplayName,
    getLocationState,
    getLocationAbbreviation,
    getLocationCoordinates,
    getLocationDistance,
    getNearbyLocations,
    getLocationIndex,
    getLocationOrder
  }
}
