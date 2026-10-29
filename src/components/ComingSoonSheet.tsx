import { useUI } from "../state/UIContext"
import { Sheet } from "./ui/Sheet"
import { Button } from "./ui/Button"

export function ComingSoonSheet() {
  const { comingSoon, closeComingSoon } = useUI()

  if (!comingSoon) return null

  return (
    <Sheet
      isOpen={Boolean(comingSoon)}
      onClose={closeComingSoon}
      title={comingSoon.title}
    >
      <div className="assistant-message" style={{ margin: "var(--sp-4) 0" }}>
        <p>{comingSoon.message}</p>
      </div>
      <Button
        variant="primary"
        fullWidth
        size="md"
        onClick={closeComingSoon}
        style={{ marginTop: "var(--sp-4)" }}
      >
        Got it
      </Button>
    </Sheet>
  )
}

export default ComingSoonSheet
