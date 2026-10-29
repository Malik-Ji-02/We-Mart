import { useLocation, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { IconName } from "../types"
import { useCart } from "../state/CartContext"

interface NavItem {
  icon: IconName
  path: string
  label: string
  isCart?: boolean
}

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { count } = useCart()

  const items: NavItem[] = [
    { icon: "home", path: "/", label: "Home" },
    { icon: "grid", path: "/categories", label: "Categories" },
    { icon: "spark", path: "/smart-basket", label: "Smart Basket" },
    { icon: "bag", path: "/cart", label: "Cart", isCart: true },
    { icon: "user", path: "/account", label: "Account" },
  ]

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => {
        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path)

        return (
          <button
            key={item.path}
            className={isActive ? "active" : ""}
            onClick={() => navigate(item.path)}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.label}
          >
            <span>
              <Icon name={item.icon} />
              {item.isCart && count > 0 && <i>{count}</i>}
            </span>
            <small>{item.label}</small>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
