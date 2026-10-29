import React from "react"
import { IconName } from "../types"

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  filled?: boolean
  "aria-label"?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export function Icon({
  name,
  size = 20,
  className,
  filled = false,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  const isAccessible = Boolean(ariaLabel)
  const resolvedAriaHidden = ariaHidden !== undefined ? ariaHidden : isAccessible ? undefined : true

  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8v10H3Z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v11h16V10M3 10l2-7h14l2 7" />
        <path d="M3 10c1.5 2.5 4.5 2.5 6 0 1.5 2.5 4.5 2.5 6 0 1.5 2.5 4.5 2.5 6 0" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l2 13H3Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    shield: (
      <>
        <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    heart: (
      <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 5 3 11 8 15 5-4 13-10 8-15Z" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    sort: <path d="M8 6h12M8 12h8M8 18h4M4 4v16" />,
    back: <path d="m15 5-7 7 7 7" />,
    phone: <path d="M7 3H4c-1 10 7 18 17 17v-3l-5-2-2 3c-4-1-7-4-8-8l3-2Z" />,
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 1 1 4 3v2m-1 3h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    cash: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    upi: <path d="m7 4 5 8-5 8m5-16 5 8-5 8" />,
    bell: (
      <>
        <path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4Z" />
        <path d="M10 21h4" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
        <path d="M20 2v4M18 4h4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={resolvedAriaHidden}
      role={isAccessible ? "img" : undefined}
    >
      {paths[name]}
    </svg>
  )
}

export default Icon
