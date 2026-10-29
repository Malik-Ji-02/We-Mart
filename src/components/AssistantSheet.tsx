import React from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useUI } from "../state/UIContext"

export function AssistantSheet() {
  const { isAssistantOpen, closeAssistant } = useUI()
  const navigate = useNavigate()

  if (!isAssistantOpen) return null

  function handleAction(path: string) {
    closeAssistant()
    navigate(path)
  }

  return (
    <div className="assistant-backdrop" onClick={closeAssistant}>
      <section
        className="assistant-sheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-title"
      >
        <div className="sheet-handle" />
        <div className="assistant-heading">
          <span>
            <Icon name="spark" size={22} />
          </span>
          <div>
            <h2 id="assistant-title">Apna Assistant</h2>
            <p>Your shortcut to smarter local shopping</p>
          </div>
          <button aria-label="Close assistant" onClick={closeAssistant}>
            <Icon name="close" />
          </button>
        </div>
        <div className="assistant-message">
          <p>
            Hi Ananya. I can compare a shopping list, find an item nearby, or
            help with your order.
          </p>
        </div>
        <div className="assistant-actions">
          <button onClick={() => handleAction("/smart-basket")}>
            <span>
              <Icon name="spark" />
            </span>
            <span>
              <strong>Compare my weekly list</strong>
              <small>Find the best local basket</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button onClick={() => handleAction("/search?q=milk")}>
            <span>
              <Icon name="search" />
            </span>
            <span>
              <strong>Find milk under ₹30</strong>
              <small>Search nearby shops</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button onClick={() => handleAction("/search?q=fresh vegetables")}>
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
          className="assistant-input"
          onClick={() => handleAction("/smart-basket")}
        >
          <span>Ask about products, shops or savings</span>
          <Icon name="arrow" />
        </button>
        <small className="assistant-disclaimer">
          Suggestions use sample catalogue data in this prototype.
        </small>
      </section>
    </div>
  )
}

export default AssistantSheet
