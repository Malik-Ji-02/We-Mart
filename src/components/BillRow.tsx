import React from "react"

export interface BillRowProps {
  label: string
  value: React.ReactNode
  variant?: "default" | "discount" | "total" | "subdued"
  strikethrough?: React.ReactNode
  className?: string
}

export function BillRow({
  label,
  value,
  variant = "default",
  strikethrough,
  className = "",
}: BillRowProps): React.JSX.Element {
  return (
    <div
      className={`ui-bill-row ui-bill-row-${variant} ${className}`.trim()}
    >
      <span className="ui-bill-row-label">{label}</span>
      <span className="ui-bill-row-value-group">
        {strikethrough && (
          <span className="ui-bill-row-strikethrough">{strikethrough}</span>
        )}
        <span className="ui-bill-row-value">{value}</span>
      </span>
    </div>
  )
}

export default BillRow
