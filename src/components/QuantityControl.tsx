import { QuantityControl as UIQuantityControl } from "./ui/QuantityControl"

interface QuantityControlProps {
  value: number
  onAdd: () => void
  onRemove: () => void
  outOfStock?: boolean
  max?: number
  productName?: string
}

export function QuantityControl({
  value,
  onAdd,
  onRemove,
  outOfStock,
  max,
  productName,
}: QuantityControlProps) {
  return (
    <UIQuantityControl
      quantity={value}
      onAdd={onAdd}
      onIncrement={onAdd}
      onDecrement={onRemove}
      outOfStock={outOfStock}
      max={max}
      productName={productName}
    />
  )
}

export default QuantityControl
