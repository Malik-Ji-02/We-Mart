import React from "react"
import "./ui.css"

export interface SectionHeaderProps {
  title: string
  actionText?: string
  onAction?: () => void
  className?: string
}

export function SectionHeader({
  title,
  actionText,
  onAction,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`ui-section-header ${className}`}>
      <h2>{title}</h2>
      {actionText && onAction && (
        <button
          type="button"
          className="ui-section-header-action"
          onClick={onAction}
          aria-label={`${actionText} for ${title}`}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default SectionHeader
