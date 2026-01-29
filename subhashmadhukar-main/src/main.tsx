import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  // Suppress known browser extension errors
  const errorMessage = event.reason?.message || String(event.reason || "");
  
  // Ignore message port errors from browser extensions
  if (
    errorMessage.includes("message port closed") ||
    errorMessage.includes("embed-page") ||
    errorMessage.includes("Extension context invalidated")
  ) {
    event.preventDefault();
    return;
  }
  
  // Log other unhandled rejections for debugging
  console.error("Unhandled promise rejection:", event.reason);
});

// Global error handler for general errors
window.addEventListener("error", (event) => {
  const errorMessage = event.message || "";
  
  // Suppress known browser extension errors
  if (
    errorMessage.includes("message port closed") ||
    errorMessage.includes("embed-page") ||
    errorMessage.includes("Extension context invalidated")
  ) {
    event.preventDefault();
    return;
  }
});

const root = createRoot(document.getElementById("root")!);

try {
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
}
