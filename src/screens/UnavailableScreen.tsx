import { Icon } from "../icons/Icon"
import { useLocation } from "../state/LocationContext"

export function UnavailableScreen() {
  const { locationName, setServiceStatus, openLocationGate } = useLocation()

  function handleChangeLocation() {
    setServiceStatus("prompt")
    openLocationGate()
  }

  return (
    <main className="unavailable-screen">
      <div className="unavailable-brand">
        <span>
          <Icon name="store" size={22} />
        </span>
        <strong>
          apna<span>market</span>
        </strong>
      </div>

      <section>
        <span className="unavailable-icon" aria-hidden="true">
          <Icon name="pin" size={34} />
        </span>
        <small>DELIVERY AREA CHECK</small>
        <h1>We’re not in your area yet</h1>
        <p>
          ApnaMarket currently delivers only in selected areas of Haryana. We’re
          working to reach more neighbourhoods soon.
        </p>
        <div className="checked-location">
          <Icon name="pin" size={18} />
          <span>
            <small>LOCATION CHECKED</small>
            <strong>{locationName}</strong>
          </span>
        </div>
        <button
          className="primary-button"
          onClick={handleChangeLocation}
          aria-label="Choose another delivery location"
        >
          Choose another location
        </button>
      </section>

      <p className="availability-footnote">
        Local shops, coming closer to more communities.
      </p>
    </main>
  )
}

export default UnavailableScreen
