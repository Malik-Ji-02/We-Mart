import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useCart } from "../state/CartContext"
import { useUI } from "../state/UIContext"
import { BottomNav } from "./ui/BottomNav"
import { CartBar } from "./CartBar"
import { Icon } from "../icons/Icon"

export function BottomStack() {
  const location = useLocation()
  const { count } = useCart()
  const { openAssistant } = useUI()

  const pathname = location.pathname
  const isCartOrCheckout = pathname === "/cart" || pathname === "/checkout"
  const isTracking = pathname.startsWith("/tracking")
  const isProductDetail = pathname.startsWith("/product/")
  const isShopDetail = pathname.startsWith("/shops/")

  const showBottomNav =
    !isCartOrCheckout &&
    !isTracking &&
    !isProductDetail &&
    !isShopDetail

  const showCartBar = count > 0 && !isCartOrCheckout && !isTracking
  const showFab = !isCartOrCheckout && !isTracking

  // Calculate live stack height and update --bottom-stack-h CSS variable
  useEffect(() => {
    let stackHeight = "76px"
    if (isCartOrCheckout || isProductDetail) {
      stackHeight = "calc(88px + var(--safe-bottom))"
    } else if (showBottomNav && showCartBar) {
      stackHeight = "calc(148px + var(--safe-bottom))"
    } else if (showBottomNav && !showCartBar) {
      stackHeight = "calc(76px + var(--safe-bottom))"
    } else if (showCartBar && !showBottomNav) {
      stackHeight = "calc(80px + var(--safe-bottom))"
    } else {
      stackHeight = "calc(var(--sp-4) + var(--safe-bottom))"
    }

    document.documentElement.style.setProperty("--bottom-stack-h", stackHeight)
  }, [isCartOrCheckout, isProductDetail, showBottomNav, showCartBar])

  // Compute live bottom position for FAB
  let fabBottom = "calc(var(--nav-h) + var(--safe-bottom) + 12px)"
  if (showCartBar && showBottomNav) {
    fabBottom = "calc(var(--nav-h) + var(--cart-bar-h) + var(--safe-bottom) + 20px)"
  } else if (showCartBar && !showBottomNav) {
    fabBottom = "calc(var(--cart-bar-h) + var(--safe-bottom) + 16px)"
  } else if (!showCartBar && !showBottomNav) {
    fabBottom = isProductDetail
      ? "calc(76px + var(--safe-bottom) + 12px)"
      : "calc(var(--safe-bottom) + 16px)"
  }

  return (
    <div className="bottom-stack" role="region" aria-label="Bottom controls">
      {showCartBar && <CartBar />}
      {showBottomNav && <BottomNav />}
      {showFab && (
        <button
          type="button"
          className="assistant-fab"
          style={{ bottom: fabBottom }}
          aria-label="Open Apna Assistant"
          onClick={openAssistant}
        >
          <Icon name="spark" size={20} />
          <span>Ask Apna</span>
        </button>
      )}
    </div>
  )
}

export default BottomStack
