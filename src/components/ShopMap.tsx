import { Shop } from "../types"
import { Icon } from "../icons/Icon"

interface ShopMapProps {
  shop: Shop
}

export function ShopMap({ shop }: ShopMapProps) {
  const { lat, lng, address, name } = shop
  const bounds = `${lng - 0.006},${lat - 0.004},${lng + 0.006},${lat + 0.004}`
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik&marker=${lat},${lng}`

  return (
    <section className="shop-location-card" aria-label={`Location of ${name}`}>
      <div className="shop-location-heading">
        <span className="location-pin" aria-hidden="true">
          <Icon name="pin" size={20} />
        </span>
        <div>
          <h3>Find us in your neighbourhood</h3>
          <p>{address}</p>
        </div>
      </div>
      <iframe
        key={name}
        title={`${name} — sample location map`}
        src={mapUrl}
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
      <div className="shop-location-caption">
        <strong>{name}</strong>
        <span>Illustrative shop location · Demo data</span>
      </div>
      <a
        className="outline wide"
        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get directions <span aria-hidden="true">↗</span>
      </a>
      <p className="map-disclaimer">
        The pin is a sample location, not a verified business address. Map
        requires an internet connection.
      </p>
    </section>
  )
}

export default ShopMap
