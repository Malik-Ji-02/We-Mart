import { Shop } from "../types"
import { Icon } from "../icons/Icon"
import { formatPrice } from "../lib/format"

interface ShopCardProps {
  shop: Shop
  onOpen: () => void
  compact?: boolean
}

export function ShopCard({ shop, onOpen, compact = false }: ShopCardProps) {
  return (
    <button
      className={`shop-card ${compact ? "compact" : ""}`}
      onClick={onOpen}
      aria-label={`Open shop ${shop.name}`}
    >
      <div className="shop-photo">
        <img src={shop.image} alt={shop.name} loading="lazy" />
        <span>{shop.eta}</span>
      </div>
      <div className="shop-copy">
        <div className="shop-name">
          <strong>{shop.name}</strong>
          <span>
            <Icon name="shield" size={13} /> Verified
          </span>
        </div>
        <p>{shop.type}</p>
        <div className="shop-meta">
          <span className="rating">
            <Icon name="star" size={12} /> {shop.rating}
          </span>
          <span>{shop.distance}</span>
          <span>
            {shop.fee ? `${formatPrice(shop.fee)} delivery` : "Free delivery"}
          </span>
        </div>
        <small>{shop.offer}</small>
      </div>
    </button>
  )
}

export default ShopCard
