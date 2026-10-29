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
        <button onClick={onAction}>
          {action}
          <Icon name="chevron" size={14} />
        </button>
      )}
    </div>
  )
}

export default SectionTitle
