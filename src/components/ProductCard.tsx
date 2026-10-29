import { Product } from "../types"
import { getShopById } from "../data/shops"
import { Icon } from "../icons/Icon"
import { QuantityControl } from "./QuantityControl"
import { calculateDiscount, formatPrice } from "../lib/format"

interface ProductCardProps {
  product: Product
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onOpen: () => void
}

export function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onOpen,
}: ProductCardProps) {
  const shop = getShopById(product.shop)
  const discount = calculateDiscount(product.price, product.mrp)

  return (
    <article className="product-card">
      <button
        className="product-photo"
        onClick={onOpen}
        aria-label={`View details for ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount >= 10 && <span>{discount}% OFF</span>}
      </button>
      <button
        className="product-copy"
        onClick={onOpen}
        aria-label={`View details for ${product.name}`}
      >
        <small>{product.unit}</small>
        <strong>{product.name}</strong>
        <span className="sold-by">
          <Icon name="store" size={12} />
          {shop?.name || "Local Shop"}
        </span>
      </button>
      <div className="product-action">
        <div>
          <strong>{formatPrice(product.price)}</strong>
          {product.mrp > product.price && <del>{formatPrice(product.mrp)}</del>}
        </div>
        <QuantityControl value={quantity} onAdd={onAdd} onRemove={onRemove} />
      </div>
    </article>
  )
}

export default ProductCard
