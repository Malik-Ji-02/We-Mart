import { useLocation } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useCart } from "../state/CartContext"
import { useUI } from "../state/UIContext"

export function AssistantFab() {
  const location = useLocation()
  const { count } = useCart()
  const { openAssistant } = useUI()

  const hiddenRoutes = ["/checkout"]
  const isHidden =
    hiddenRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/tracking")

  if (isHidden) return null

  return (
    <button
      className={`assistant-fab ${count > 0 ? "with-cart" : ""}`}
      aria-label="Open Apna Assistant"
      onClick={openAssistant}
    >
      <Icon name="spark" size={20} />
      <span>Ask Apna</span>
    </button>
  )
}

export default AssistantFab
