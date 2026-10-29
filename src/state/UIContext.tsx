import React, { createContext, useContext, useState } from "react"

interface ComingSoonState {
  title: string
  message: string
}

interface UIContextType {
  isAssistantOpen: boolean
  comingSoon: ComingSoonState | null
  openAssistant: () => void
  closeAssistant: () => void
  openComingSoon: (title: string, message?: string) => void
  closeComingSoon: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [comingSoon, setComingSoon] = useState<ComingSoonState | null>(null)

  function openAssistant() {
    setIsAssistantOpen(true)
  }

  function closeAssistant() {
    setIsAssistantOpen(false)
  }

  function openComingSoon(
    title: string,
    message: string = "This feature is currently under development for our upcoming release.",
  ) {
    setComingSoon({ title, message })
  }

  function closeComingSoon() {
    setComingSoon(null)
  }

  return (
    <UIContext.Provider
      value={{
        isAssistantOpen,
        comingSoon,
        openAssistant,
        closeAssistant,
        openComingSoon,
        closeComingSoon,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
