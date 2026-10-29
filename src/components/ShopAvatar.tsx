import React from "react"

export interface ShopAvatarProps {
  name: string
  size?: "sm" | "md" | "lg"
  tint?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

function getMonogram(name: string): string {
  const clean = name.trim()
  if (!clean) return "S"
  const words = clean.split(/\s+/)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

function getTintIndex(name: string): 1 | 2 | 3 | 4 | 5 | 6 {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const idx = (Math.abs(hash) % 6) + 1
  return idx as 1 | 2 | 3 | 4 | 5 | 6
}

export function ShopAvatar({
  name,
  size = "md",
  tint,
  className = "",
}: ShopAvatarProps): React.JSX.Element {
  const monogram = getMonogram(name)
  const resolvedTint = tint ?? getTintIndex(name)

  return (
    <div
      className={`ui-shop-avatar ui-shop-avatar-${size} ui-shop-avatar-tint-${resolvedTint} ${className}`.trim()}
      aria-label={`${name} avatar`}
      role="img"
    >
      {monogram}
    </div>
  )
}

export default ShopAvatar
