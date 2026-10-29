import React from "react"
import "./ui.css"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  bordered?: boolean
}

export function IconButton({
  children,
  "aria-label": ariaLabel,
  bordered = false,
  className = "",
  ...props
}: IconButtonProps) {
  const classes = [
    "ui-icon-btn",
    bordered ? "ui-icon-btn-bordered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  )
}

export default IconButton
