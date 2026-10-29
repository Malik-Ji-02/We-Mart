import { Icon } from "../icons/Icon"

interface SectionTitleProps {
  title: string
  action?: string
  onAction?: () => void
}

export function SectionTitle({ title, action, onAction }: SectionTitleProps) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          aria-label={`${action} for ${title}`}
          style={{ minHeight: 44, display: "inline-flex", alignItems: "center", gap: "var(--sp-1)" }}
        >
          <span>{action}</span>
          <Icon name="chevron" size={14} />
        </button>
      )}
    </div>
  )
}

export default SectionTitle
