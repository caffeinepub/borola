import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "oklch(0.98 0.005 90)",
            fontFamily: "sans-serif",
            padding: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "480px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "oklch(0.25 0.095 255)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <span
                style={{
                  color: "oklch(0.98 0.005 90)",
                  fontSize: "1.5rem",
                  fontWeight: "900",
                }}
              >
                B
              </span>
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "900",
                color: "oklch(0.16 0.04 260)",
                marginBottom: "0.75rem",
              }}
            >
              BOROLA Party
            </h1>
            <p
              style={{
                color: "oklch(0.52 0.04 255)",
                marginBottom: "1.5rem",
                lineHeight: "1.6",
              }}
            >
              Something went wrong loading the app. Please refresh the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "oklch(0.25 0.095 255)",
                color: "oklch(0.98 0.005 90)",
                border: "none",
                borderRadius: "6px",
                padding: "0.75rem 1.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
