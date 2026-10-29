import React from "react"
import "./ui.css"

export interface SectionHeaderProps {
  title: string
  actionText?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function SectionHeader({
  title,
  actionText,
  actionLabel,
  onAction,
  className = "",
}: SectionHeaderProps) {
  const label = actionLabel || actionText

  return (
    <div className={`ui-section-header ${className}`}>
      <h2>{title}</h2>
      {label && onAction && (
        <button
          type="button"
          className="ui-section-header-action"
          onClick={onAction}
          aria-label={`${label} for ${title}`}
        >
          {label}
        </button>
      )}
    </div>
  )
}

export default SectionHeader
