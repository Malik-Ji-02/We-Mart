import React, { useRef } from "react"
import { Icon } from "../../icons/Icon"
import "./ui.css"

export interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
  onSubmit?: () => void
  onFocus?: () => void
  onClick?: () => void
  readOnly?: boolean
}

export function SearchBar({
  value = "",
  onChange,
  onClear,
  placeholder = "Search items, shops, or categories...",
  autoFocus = false,
  className = "",
  onSubmit,
  onFocus,
  onClick,
  readOnly = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange?.("")
    if (onClear) onClear()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className={`ui-searchbar ${className}`}>
      <span className="ui-searchbar-icon" aria-hidden="true">
        <Icon name="search" size={20} />
      </span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onClick={onClick}
        readOnly={readOnly}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search"
      />
      {value.length > 0 && (
        <button
          type="button"
          className="ui-icon-btn"
          onClick={handleClear}
          aria-label="Clear search query"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
