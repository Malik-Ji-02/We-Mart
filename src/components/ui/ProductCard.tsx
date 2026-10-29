import { Product } from "../../types"
import { getShopById } from "../../data/shops"
import { Icon } from "../../icons/Icon"
import { QuantityControl } from "./QuantityControl"
import { ProductImage } from "./ProductImage"
import { Price } from "./Price"
import { calculateDiscount } from "../../lib/format"
import "./ui.css"

export interface ProductCardProps {
  product: Product
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onOpen: () => void
  outOfStock?: boolean
}

export function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onOpen,
  outOfStock = false,
}: ProductCardProps) {
  const shop = getShopById(product.shop)
  const discount = calculateDiscount(product.price, product.mrp)
  const isOutOfStock = outOfStock || (product as unknown as { inStock?: boolean }).inStock === false
  const isInCart = quantity > 0

  const cardClasses = [
    "product-card",
    isOutOfStock ? "is-out-of-stock" : "",
    isInCart ? "is-in-cart" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={cardClasses}
      style={isOutOfStock ? { opacity: 0.65 } : undefined}
    >
      <button
        type="button"
        className="product-photo"
        onClick={onOpen}
        aria-label={`View details for ${product.name}`}
      >
        <ProductImage src={product.image} alt={product.name} widthPx={300} />
        {discount >= 10 && !isOutOfStock && <span>{discount}% OFF</span>}
      </button>

      <button
        type="button"
        className="product-copy"
        onClick={onOpen}
        aria-label={`View details for ${product.name}`}
      >
        <small>{product.unit}</small>
        <strong>{product.name}</strong>
        <span className="sold-by">
          <Icon name="store" size={14} aria-hidden="true" />
          <span>{shop?.name || "Local Shop"}</span>
        </span>
      </button>

      <div className="product-action">
        <Price price={product.price} mrp={product.mrp} size="md" />
        <QuantityControl
          quantity={quantity}
          onAdd={onAdd}
          onIncrement={onAdd}
          onDecrement={onRemove}
          outOfStock={isOutOfStock}
          productName={product.name}
        />
      </div>
    </article>
  )
}

export default ProductCard
