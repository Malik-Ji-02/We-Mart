import "./ui.css"

export interface PriceProps {
  price: number
  mrp?: number
  size?: "sm" | "md" | "lg"
  showDiscount?: boolean
  className?: string
}

export function Price({
  price,
  mrp,
  size = "md",
  showDiscount = false,
  className = "",
}: PriceProps) {
  const hasRealDiscount = typeof mrp === "number" && mrp > price
  const discountAmount = hasRealDiscount ? mrp - price : 0
  const discountPercent = hasRealDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <div className={`ui-price ui-price-${size} ${className}`}>
      <strong className="ui-price-current">₹{price}</strong>
      {hasRealDiscount && (
        <>
          <span className="ui-price-mrp" aria-label={`Original price ₹${mrp}`}>
            ₹{mrp}
          </span>
          {showDiscount && (
            <span className="ui-price-discount" aria-label={`${discountPercent}% off`}>
              ({discountPercent}% off / save ₹{discountAmount})
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default Price
