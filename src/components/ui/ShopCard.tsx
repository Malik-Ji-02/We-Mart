import { Shop } from "../../types"
import { Badge } from "./Badge"
import { Rating } from "./Rating"
import { formatPrice, isShopOpen } from "../../lib/format"
import { optimizeImageUrl } from "./ProductImage"
import "./ui.css"

export interface ShopCardProps {
  shop: Shop
  onOpen: () => void
  compact?: boolean
  className?: string
}

export function ShopCard({
  shop,
  onOpen,
  compact = false,
  className = "",
}: ShopCardProps) {
  const open = isShopOpen(shop)
  const deliveryText = shop.fee === 0
    ? "Free delivery"
    : shop.min
    ? `Free delivery over ${formatPrice(shop.min)}`
    : `${formatPrice(shop.fee)} delivery`

  return (
    <button
      type="button"
      className={`shop-card ${compact ? "compact" : ""} ${!open ? "is-closed" : ""} ${className}`.trim()}
      onClick={onOpen}
      aria-label={`Open shop ${shop.name}, ${shop.type}, rating ${shop.rating}, ETA ${shop.eta}${!open ? `, closed, opens at ${shop.opensAt}` : ""}`}
    >
      <div className="shop-photo">
        <img
          src={optimizeImageUrl(shop.image, compact ? 300 : 500)}
          alt={shop.name}
          loading="lazy"
        />
        <span>{shop.eta}</span>
      </div>

      <div className="shop-copy">
        <div className="shop-name">
          <strong>{shop.name}</strong>
          <Badge variant="verified">Verified</Badge>
        </div>

        <p>{shop.type}</p>

        <div className="shop-meta">
          <Rating rating={shop.rating} />
          <span>{shop.distance}</span>
          <span>{deliveryText}</span>
        </div>

        <div style={{ display: "flex", gap: "var(--sp-2)", alignItems: "center", flexWrap: "wrap", marginTop: "var(--sp-1)" }}>
          {!open && (
            <Badge variant="closed" opensAt={shop.opensAt} />
          )}
          {shop.offer && <small>{shop.offer}</small>}
        </div>
      </div>
    </button>
  )
}

export default ShopCard
