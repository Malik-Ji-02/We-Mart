import { Icon } from "../icons/Icon"

interface QuantityControlProps {
  value: number
  onAdd: () => void
  onRemove: () => void
}

export function QuantityControl({ value, onAdd, onRemove }: QuantityControlProps) {
  if (!value) {
    return (
      <button className="add-button" onClick={onAdd} aria-label="Add item to cart">
        ADD
      </button>
    )
  }

  return (
    <div className="stepper">
      <button aria-label="Remove one" onClick={onRemove}>
        <Icon name="minus" size={16} />
      </button>
      <strong>{value}</strong>
      <button aria-label="Add one" onClick={onAdd}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}

export default QuantityControl
