import React from "react"
import { Icon } from "../icons/Icon"
import { useUI } from "../state/UIContext"

export function ComingSoonSheet() {
  const { comingSoon, closeComingSoon } = useUI()

  if (!comingSoon) return null

  return (
    <div className="assistant-backdrop" onClick={closeComingSoon}>
      <section
        className="assistant-sheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
      >
        <div className="sheet-handle" />
        <div className="assistant-heading">
          <span>
            <Icon name="spark" size={22} />
          </span>
          <div>
            <h2 id="coming-soon-title">{comingSoon.title}</h2>
            <p>Coming soon</p>
          </div>
          <button aria-label="Close" onClick={closeComingSoon}>
            <Icon name="close" />
          </button>
        </div>
        <div className="assistant-message" style={{ margin: "20px 0" }}>
          <p>{comingSoon.message}</p>
        </div>
        <button
          className="compare-button"
          onClick={closeComingSoon}
          style={{ marginTop: "16px" }}
        >
          Got it
        </button>
      </section>
    </div>
  )
}

export default ComingSoonSheet
