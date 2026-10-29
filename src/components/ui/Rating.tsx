import { Icon } from "../../icons/Icon"
import "./ui.css"

export interface RatingProps {
  rating: number
  count?: number | string
  size?: number
  className?: string
}

export function Rating({
  rating,
  count,
  size = 14,
  className = "",
}: RatingProps) {
  const ariaLabel = count
    ? `${rating} out of 5 stars from ${count} reviews`
    : `${rating} out of 5 stars`

  return (
    <div className={`ui-rating ${className}`} aria-label={ariaLabel}>
      <span className="ui-rating-star" aria-hidden="true">
        <Icon name="star" size={size} filled />
      </span>
      <span>{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="ui-rating-count" aria-hidden="true">
          ({count})
        </span>
      )}
    </div>
  )
}

export default Rating
