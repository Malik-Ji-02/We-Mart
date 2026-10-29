import { Icon } from "../../icons/Icon"
import "./ui.css"

export interface QuantityControlProps {
  quantity: number
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
  max?: number
  outOfStock?: boolean
  disabled?: boolean
  disabledLabel?: string
  className?: string
  productName?: string
}

export function QuantityControl({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  max = 10,
  outOfStock = false,
  disabled = false,
  disabledLabel,
  className = "",
  productName = "item",
}: QuantityControlProps) {
  if (outOfStock || disabled) {
    const label = disabledLabel || (outOfStock ? "Out of stock" : "ADD")
    return (
      <div className={`ui-quantity-control ${className}`}>
        <button
          className="ui-add-btn"
          disabled
          aria-label={`${productName} is currently unavailable (${label})`}
        >
          {label}
        </button>
      </div>
    )
  }

  if (quantity === 0) {
    return (
      <div className={`ui-quantity-control ${className}`}>
        <button
          className="ui-add-btn"
          onClick={onAdd}
          aria-label={`Add ${productName} to cart`}
        >
          ADD
        </button>
      </div>
    )
  }

  const isMaxReached = quantity >= max

  return (
    <div className={`ui-quantity-control ${className}`}>
      <div className="ui-stepper" role="group" aria-label={`Quantity for ${productName}`}>
        <button
          className="ui-stepper-btn"
          onClick={onDecrement}
          aria-label={`Decrease quantity of ${productName} to ${quantity - 1}`}
        >
          <Icon name="minus" size={16} />
        </button>
        <span
          className="ui-stepper-value"
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </span>
        <button
          className="ui-stepper-btn"
          onClick={onIncrement}
          disabled={isMaxReached}
          aria-label={
            isMaxReached
              ? `Maximum quantity of ${max} reached for ${productName}`
              : `Increase quantity of ${productName} to ${quantity + 1}`
          }
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  )
}

export default QuantityControl
