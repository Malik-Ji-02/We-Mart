import { Icon } from "../icons/Icon"
import { useLocation } from "../state/LocationContext"
import { getSavedAddresses } from "../data/user"

export function LocationGate() {
  const {
    serviceStatus,
    locationError,
    isLocationGateOpen,
    useCurrentLocation,
    chooseSavedLocation,
    closeLocationGate,
  } = useLocation()

  const savedAddresses = getSavedAddresses()

  const shouldShow =
    serviceStatus === "prompt" ||
    serviceStatus === "checking" ||
    isLocationGateOpen

  if (!shouldShow) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && isLocationGateOpen && serviceStatus !== "prompt") {
      closeLocationGate()
    }
  }

  return (
    <div className="location-backdrop" onClick={handleBackdropClick}>
      <section
        className="location-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-title"
      >
        <div className="location-brand">
          <span>
            <Icon name="store" />
          </span>
          <strong>
            apna<span>market</span>
          </strong>
        </div>
        <div className="location-intro">
          <span>
            <Icon name="pin" size={26} />
          </span>
          <h1 id="location-title">Where should we deliver?</h1>
          <p>
            Choose a saved address or share your current location to check if
            ApnaMarket serves your area.
          </p>
        </div>
        <button
          className="current-location-button"
          onClick={useCurrentLocation}
          disabled={serviceStatus === "checking"}
        >
          <span>
            <Icon name={serviceStatus === "checking" ? "clock" : "pin"} />
          </span>
          <span>
            <strong>
              {serviceStatus === "checking"
                ? "Checking your location…"
                : "Use current location"}
            </strong>
            <small>
              {serviceStatus === "checking"
                ? "This may take a few seconds"
                : "Enable device location access"}
            </small>
          </span>
          {serviceStatus !== "checking" && <Icon name="chevron" />}
        </button>
        {locationError && <p className="location-error">{locationError}</p>}
        <div className="saved-address-title">
          <span>Saved addresses</span>
        </div>
        <div className="saved-addresses">
          {savedAddresses.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                chooseSavedLocation(
                  `${item.label} · ${item.address}`,
                  item.available,
                )
              }
            >
              <span>
                <Icon name={item.label === "Work" ? "store" : "home"} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.address}</small>
              </span>
              <Icon name="chevron" />
            </button>
          ))}
        </div>
        <p className="coverage-copy">
          <Icon name="shield" size={16} />
          Currently delivering across selected areas in Koramangala, Bengaluru.
        </p>
      </section>
    </div>
  )
}

export default LocationGate
