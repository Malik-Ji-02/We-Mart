import React from "react"

export interface ProgressBarProps {
  value: number
  max: number
  label?: string
  subtitle?: string
  className?: string
}

export function ProgressBar({
  value,
  max,
  label,
  subtitle,
  className = "",
}: ProgressBarProps): React.JSX.Element {
  const safeMax = max > 0 ? max : 100
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div
      className={`ui-progress ${className}`.trim()}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label || "Progress"}
    >
      {(label || subtitle) && (
        <div className="ui-progress-label">
          {label && <span className="ui-progress-label-text">{label}</span>}
          {subtitle && <span className="ui-progress-label-sub">{subtitle}</span>}
        </div>
      )}
      <div className="ui-progress-track">
        <div
          className="ui-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
