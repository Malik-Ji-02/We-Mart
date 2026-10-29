import React, { Component, ErrorInfo, ReactNode } from "react"
import { Icon } from "../icons/Icon"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell">
          <div className="empty-state" style={{ minHeight: "80vh", justifyContent: "center" }}>
            <span>
              <Icon name="help" size={32} />
            </span>
            <h2>Something went wrong</h2>
            <p>We encountered an unexpected error. Please reload the app.</p>
            <button
              className="primary-button"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
