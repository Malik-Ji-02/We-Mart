import { useLocation, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useLocation as useAppLocation } from "../state/LocationContext"
import { useUI } from "../state/UIContext"
import { currentUser } from "../data/user"
import { IconButton } from "./ui/IconButton"

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
        <div className="home-compact-header">
          <button
            className="address-button-compact"
            onClick={openLocationGate}
            aria-label={`Delivery location: ${locationName}, delivery in 20 minutes. Tap to change.`}
          >
            <span className="brand-mark-compact" aria-hidden="true">
              <Icon name="pin" size={18} />
            </span>
            <span className="address-single-line">
              <strong className="address-name">{locationName}</strong>
              <span className="address-sep">·</span>
              <span className="address-eta">20 min</span>
            </span>
            <Icon name="chevron" size={14} />
          </button>
          <div className="header-actions">
            <IconButton
              aria-label="Notifications"
              onClick={() =>
                openComingSoon(
                  "Notifications",
                  "Order alerts and hyperlocal store offers will appear here soon.",
                )
              }
            >
              <Icon name="bell" />
            </IconButton>
            <button
              className="header-avatar-btn"
              onClick={() => navigate("/account")}
              aria-label="Account profile"
            >
              {currentUser.avatar}
            </button>
          </div>
        </div>
      ) : (
        <div className="title-row">
          {showBack && (
            <IconButton
              aria-label="Go back"
              onClick={() => navigate(-1)}
            >
              <Icon name="back" />
            </IconButton>
          )}
          <h1>{displayTitle}</h1>
          {!isSearch && (
            <IconButton
              aria-label="Search"
              onClick={() => navigate("/search")}
            >
              <Icon name="search" />
            </IconButton>
          )}
        </div>
      )}

      {isSearch && (
        <label className="search-bar">
          <Icon name="search" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search milk, atta or a local shop"
            autoFocus
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
