import React from "react"
import "./ui.css"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
}

export function Chip({
  children,
  active = false,
  icon,
  className = "",
  ...props
}: ChipProps) {
  const classes = ["ui-chip", active ? "is-active" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      className={classes}
      aria-pressed={active}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

export const Tab = Chip
export default Chip
