import React from "react"
import { Icon } from "../../icons/Icon"
import "./ui.css"

export type BadgeVariant = "verified" | "discount" | "open" | "closed" | "closing-soon"

export interface BadgeProps {
  variant: BadgeVariant
  children?: React.ReactNode
  opensAt?: string
  className?: string
}

export function Badge({
  variant,
  children,
  opensAt,
  className = "",
}: BadgeProps) {
  const classes = ["ui-badge", `ui-badge-${variant}`, className]
    .filter(Boolean)
    .join(" ")

  if (variant === "verified") {
    return (
      <span className={classes}>
        <Icon name="shield" size={14} aria-hidden="true" />
        <span>{children || "Verified Local"}</span>
      </span>
    )
  }

  if (variant === "open") {
    return (
      <span className={classes}>
        <span>{children || "Open"}</span>
      </span>
    )
  }

  if (variant === "closed") {
    return (
      <span className={classes}>
        <span>{children || (opensAt ? `Closed, opens ${opensAt}` : "Closed")}</span>
      </span>
    )
  }

  if (variant === "closing-soon") {
    return (
      <span className={classes}>
        <span>{children || "Closing soon"}</span>
      </span>
    )
  }

  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge
