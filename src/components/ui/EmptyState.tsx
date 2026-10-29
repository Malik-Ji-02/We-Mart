import React from "react"
import { Button } from "./Button"
import "./ui.css"

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  body: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <h2>{title}</h2>
      <p>{body}</p>
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          style={{ marginTop: "var(--sp-5)" }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
