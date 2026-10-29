import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useUI } from "../state/UIContext"
import { Sheet } from "./ui/Sheet"

export function AssistantSheet() {
  const { isAssistantOpen, closeAssistant } = useUI()
  const navigate = useNavigate()

  function handleAction(path: string) {
    closeAssistant()
    navigate(path)
  }

  return (
    <Sheet
      isOpen={isAssistantOpen}
      onClose={closeAssistant}
      title="Apna Assistant"
    >
      <div className="assistant-message">
        <p>
          Hi Ananya. I can compare a shopping list, find an item nearby, or
          help with your order.
        </p>
      </div>
      <div className="assistant-actions">
        <button type="button" onClick={() => handleAction("/smart-basket")}>
          <span>
            <Icon name="spark" />
          </span>
          <span>
            <strong>Compare my weekly list</strong>
            <small>Find the best local basket</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button type="button" onClick={() => handleAction("/search?q=milk")}>
          <span>
            <Icon name="search" />
          </span>
          <span>
            <strong>Find milk under ₹30</strong>
            <small>Search nearby shops</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button type="button" onClick={() => handleAction("/search?q=fresh vegetables")}>
          <span>
            <Icon name="store" />
          </span>
          <span>
            <strong>Show fresh vegetables</strong>
            <small>From sellers near you</small>
          </span>
          <Icon name="chevron" />
        </button>
      </div>
      <button
        type="button"
        className="assistant-input"
        onClick={() => handleAction("/smart-basket")}
      >
        <span>Ask about products, shops or savings</span>
        <Icon name="arrow" />
      </button>
      <small className="assistant-disclaimer">
        Suggestions use sample catalogue data in this prototype.
      </small>
    </Sheet>
  )
}

export default AssistantSheet
