import React from "react"
import "./ui.css"

export interface SkeletonProps {
  variant?: "product-card" | "shop-card" | "rect" | "circle" | "text"
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({
  variant = "rect",
  width,
  height,
  className = "",
  style,
}: SkeletonProps) {
  if (variant === "product-card") {
    return (
      <div
        className={`product-card ${className}`}
        aria-busy="true"
        aria-label="Loading product..."
        style={{ ...style }}
      >
        <div className="ui-skeleton" style={{ height: 142, width: "100%" }} />
        <div style={{ padding: "var(--sp-2) var(--sp-2) 0", display: "grid", gap: "var(--sp-1)" }}>
          <div className="ui-skeleton" style={{ height: 12, width: "40%" }} />
          <div className="ui-skeleton" style={{ height: 16, width: "90%" }} />
          <div className="ui-skeleton" style={{ height: 12, width: "60%" }} />
        </div>
        <div style={{ padding: "var(--sp-2)", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <div className="ui-skeleton" style={{ height: 18, width: "35%" }} />
          <div className="ui-skeleton" style={{ height: 36, width: 64, borderRadius: "var(--r-sm)" }} />
        </div>
      </div>
    )
  }

  if (variant === "shop-card") {
    return (
      <div
        className={`shop-card ${className}`}
        aria-busy="true"
        aria-label="Loading shop..."
        style={{ ...style }}
      >
        <div className="ui-skeleton" style={{ height: 132, width: "100%" }} />
        <div style={{ padding: "var(--sp-3)", display: "grid", gap: "var(--sp-2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="ui-skeleton" style={{ height: 18, width: "60%" }} />
            <div className="ui-skeleton" style={{ height: 18, width: 60, borderRadius: "var(--r-pill)" }} />
          </div>
          <div className="ui-skeleton" style={{ height: 14, width: "40%" }} />
          <div className="ui-skeleton" style={{ height: 14, width: "80%" }} />
        </div>
      </div>
    )
  }

  const customStyle: React.CSSProperties = {
    width: width || (variant === "circle" ? 40 : "100%"),
    height: height || (variant === "circle" ? 40 : variant === "text" ? 16 : 48),
    borderRadius: variant === "circle" ? "50%" : variant === "text" ? "var(--r-xs)" : "var(--r-sm)",
    ...style,
  }

  return (
    <div
      className={`ui-skeleton ${className}`}
      style={customStyle}
      aria-busy="true"
      aria-label="Loading..."
    />
  )
}

export default Skeleton
