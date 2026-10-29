import React, { useEffect, useRef } from "react"
import { Icon } from "../../icons/Icon"
import "./ui.css"

export interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  showHandle?: boolean
  className?: string
  id?: string
}

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  className = "",
  id = "ui-sheet-title",
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement as HTMLElement
    const sheet = sheetRef.current
    if (sheet) {
      const focusable = sheet.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === "Tab" && sheet) {
        const focusable = Array.from(
          sheet.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null)

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="assistant-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={sheetRef}
        className={`assistant-sheet ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? id : undefined}
      >
        {showHandle && <div className="sheet-handle" aria-hidden="true" />}
        {title && (
          <div className="assistant-heading">
            <h2 id={id}>{title}</h2>
            <button
              type="button"
              className="ui-icon-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Sheet
