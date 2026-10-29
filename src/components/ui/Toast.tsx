import React from "react"
import { Icon } from "../../icons/Icon"
import "./ui.css"

export interface ToastProps {
  message: string
  icon?: React.ReactNode
  type?: "success" | "error" | "info"
  className?: string
}

export function Toast({
  message,
  icon,
  className = "",
}: ToastProps) {
  return (
    <div
      className={`toast ${className}`}
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true">
        {icon || <Icon name="check" size={18} />}
      </span>
      <span>{message}</span>
    </div>
  )
}

export default Toast
