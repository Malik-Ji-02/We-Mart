import React from "react"

export interface StickyActionBarProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function StickyActionBar({
  children,
  className = "",
  style,
}: StickyActionBarProps): React.JSX.Element {
  return (
    <aside
      className={`ui-sticky-action-bar ${className}`.trim()}
      style={style}
      aria-label="Screen action bar"
    >
      <div className="ui-sticky-action-bar-inner">{children}</div>
    </aside>
  )
}

export default StickyActionBar
