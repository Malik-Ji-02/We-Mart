import { useLocation, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useCart } from "../state/CartContext"
import { formatPrice } from "../lib/format"

export function CartBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { count, subtotal, cartShopIds } = useCart()

  const hiddenRoutes = ["/cart", "/checkout"]
  const isHidden =
    count === 0 ||
    hiddenRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/tracking")

  if (isHidden) return null

  return (
    <button
      className="cart-bar"
      onClick={() => navigate("/cart")}
      aria-label={`View cart with ${count} items from ${cartShopIds.length} shops`}
    >
      <span className="cart-bag">
        <Icon name="bag" size={18} />
        {count}
      </span>
      <span>
        <strong>{formatPrice(subtotal)}</strong>
        <small>
          {cartShopIds.length} local {cartShopIds.length === 1 ? "shop" : "shops"}
        </small>
      </span>
      <b>View cart</b>
      <Icon name="arrow" size={18} />
    </button>
  )
}

export default CartBar
