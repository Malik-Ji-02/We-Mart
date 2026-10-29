import React from "react"
import { Icon } from "../icons/Icon"
import { IconName } from "../types"

export interface PaymentOptionProps {
  id: string
  label: string
  description?: string
  iconName?: IconName
  selected: boolean
  onSelect: () => void
  disabled?: boolean
  badge?: string
  className?: string
}

export function PaymentOption({
  id,
  label,
  description,
  iconName,
  selected,
  onSelect,
  disabled = false,
  badge,
  className = "",
}: PaymentOptionProps): React.JSX.Element {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <div
      id={id}
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={handleKeyDown}
      className={`ui-payment-option ${selected ? "ui-payment-option-selected" : ""} ${
        disabled ? "ui-payment-option-disabled" : ""
      } ${className}`.trim()}
    >
      <div className="ui-payment-option-radio" aria-hidden="true">
        {selected && <div className="ui-payment-option-radio-dot" />}
      </div>
      {iconName && (
        <div className="ui-payment-option-icon" aria-hidden="true">
          <Icon name={iconName} size={22} />
        </div>
      )}
      <div className="ui-payment-option-details">
        <div className="ui-payment-option-title-row">
          <span className="ui-payment-option-label">{label}</span>
          {badge && <span className="ui-payment-option-badge">{badge}</span>}
        </div>
        {description && (
          <span className="ui-payment-option-description">{description}</span>
        )}
      </div>
      {selected && (
        <span className="ui-payment-option-check" aria-hidden="true">
          <Icon name="check" size={16} />
        </span>
      )}
    </div>
  )
}

export default PaymentOption
