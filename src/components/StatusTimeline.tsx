import React from "react"
import { Icon } from "../icons/Icon"

export interface TimelineStep {
  title: string
  subtitle?: string
  status: "completed" | "current" | "upcoming"
  time?: string
}

export interface StatusTimelineProps {
  steps: TimelineStep[]
  className?: string
}

export function StatusTimeline({
  steps,
  className = "",
}: StatusTimelineProps): React.JSX.Element {
  return (
    <div
      className={`ui-status-timeline ${className}`.trim()}
      role="list"
      aria-label="Order status timeline"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <div
            key={step.title}
            className={`ui-timeline-step ui-timeline-step-${step.status}`}
            role="listitem"
          >
            <div className="ui-timeline-indicator-wrap">
              <div
                className={`ui-timeline-indicator ui-timeline-indicator-${step.status}`}
              >
                {step.status === "completed" ? (
                  <Icon name="check" size={14} />
                ) : step.status === "current" ? (
                  <span className="ui-timeline-dot" />
                ) : null}
              </div>
              {!isLast && (
                <div
                  className={`ui-timeline-connector ${
                    step.status === "completed" ? "ui-timeline-connector-active" : ""
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ui-timeline-content">
              <div className="ui-timeline-header">
                <span className="ui-timeline-title">{step.title}</span>
                {step.time && <span className="ui-timeline-time">{step.time}</span>}
              </div>
              {step.subtitle && (
                <p className="ui-timeline-subtitle">{step.subtitle}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatusTimeline
