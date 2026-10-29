import React, { createContext, useContext, useEffect, useState } from "react"
import { ServiceStatus } from "../types"
import { isCoordinateInServiceArea } from "../config/serviceArea"

interface LocationContextType {
  locationName: string
  serviceStatus: ServiceStatus
  locationError: string
  isLocationGateOpen: boolean
  chooseSavedLocation: (name: string, available: boolean) => void
  useCurrentLocation: () => void
  openLocationGate: () => void
  closeLocationGate: () => void
  setServiceStatus: (status: ServiceStatus) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

const STORAGE_KEY_LOCATION = "apnamarket_location_name"
const STORAGE_KEY_STATUS = "apnamarket_service_status"

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [locationName, setLocationName] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LOCATION) || "Select delivery location"
    } catch {
      return "Select delivery location"
    }
  })

  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATUS) as ServiceStatus | null
      if (saved === "available" || saved === "unavailable") return saved
      return "prompt"
    } catch {
      return "prompt"
    }
  })

  const [locationError, setLocationError] = useState("")
  const [isLocationGateOpen, setIsLocationGateOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOCATION, locationName)
      localStorage.setItem(STORAGE_KEY_STATUS, serviceStatus)
    } catch {
      // Ignore storage errors
    }
  }, [locationName, serviceStatus])

  function chooseSavedLocation(name: string, available: boolean) {
    setLocationName(name)
    setLocationError("")
    const nextStatus: ServiceStatus = available ? "available" : "unavailable"
    setServiceStatus(nextStatus)
    setIsLocationGateOpen(false)
  }

  function useCurrentLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationError(
        "Location is not supported on this device. Choose a saved address instead.",
      )
      return
    }
    setLocationError("")
    setServiceStatus("checking")
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const isInHaryana = isCoordinateInServiceArea(
          coords.latitude,
          coords.longitude,
        )
        setLocationName(
          isInHaryana
            ? "Current location · Haryana"
            : "Current location · Outside Haryana",
        )
        setServiceStatus(isInHaryana ? "available" : "unavailable")
        setIsLocationGateOpen(false)
      },
      () => {
        setServiceStatus("prompt")
        setLocationError(
          "We couldn’t access your location. Check permission settings or choose a saved address.",
        )
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  function openLocationGate() {
    setIsLocationGateOpen(true)
  }

  function closeLocationGate() {
    setIsLocationGateOpen(false)
  }

  return (
    <LocationContext.Provider
      value={{
        locationName,
        serviceStatus,
        locationError,
        isLocationGateOpen,
        chooseSavedLocation,
        useCurrentLocation,
        openLocationGate,
        closeLocationGate,
        setServiceStatus,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
