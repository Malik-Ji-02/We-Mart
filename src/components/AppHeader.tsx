import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useLocation as useAppLocation } from "../state/LocationContext"
import { useUI } from "../state/UIContext"

interface AppHeaderProps {
  title?: string
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function AppHeader({
  title,
  searchQuery = "",
  onSearchChange,
}: AppHeaderProps) {
  const routerLocation = useLocation()
  const navigate = useNavigate()
  const { locationName, openLocationGate } = useAppLocation()
  const { openComingSoon } = useUI()

  const isHome = routerLocation.pathname === "/"
  const isSearch = routerLocation.pathname === "/search"

  const mainPages = ["/", "/categories", "/shops", "/smart-basket", "/cart", "/account"]
  const showBack = !mainPages.includes(routerLocation.pathname)

  const headerTitleMap: Record<string, string> = {
    "/categories": "Shop by category",
    "/shops": "Nearby shops",
    "/search": "Search",
    "/smart-basket": "Smart Basket",
    "/cart": "Your cart",
    "/checkout": "Payment",
    "/account": "Account",
  }

  const displayTitle =
    title ||
    headerTitleMap[routerLocation.pathname] ||
    (routerLocation.pathname.startsWith("/tracking") ? "Track order" : "ApnaMarket")

  return (
    <header className="app-header">
      {isHome ? (
        <div className="delivery-row">
          <button
            className="address-button"
            onClick={openLocationGate}
            aria-label="Change delivery location"
          >
            <span className="brand-mark" aria-hidden="true">
              <Icon name="store" size={20} />
            </span>
            <span>
              <small>Delivery in 20 minutes</small>
              <strong>{locationName}</strong>
            </span>
            <Icon name="chevron" size={14} />
          </button>
          <button
            className="icon-button"
            aria-label="Notifications"
            onClick={() =>
              openComingSoon(
                "Notifications",
                "Order alerts and hyperlocal store offers will appear here soon.",
              )
            }
          >
            <Icon name="bell" />
          </button>
        </div>
      ) : (
        <div className="title-row">
          {showBack && (
            <button
              className="icon-button"
              aria-label="Go back"
              onClick={() => navigate(-1)}
            >
              <Icon name="back" />
            </button>
          )}
          <h1>{displayTitle}</h1>
          {!isSearch && (
            <button
              className="icon-button"
              aria-label="Search"
              onClick={() => navigate("/search")}
            >
              <Icon name="search" />
            </button>
          )}
        </div>
      )}

      {(isHome || isSearch) && (
        <label className="search-bar">
          <Icon name="search" />
          <input
            value={searchQuery}
            onFocus={() => {
              if (isHome) navigate("/search")
            }}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search milk, atta or a local shop"
          />
          <span aria-hidden="true" style={{ display: "grid", placeItems: "center" }}>
            <Icon name="mic" />
          </span>
        </label>
      )}
    </header>
  )
}

export default AppHeader
