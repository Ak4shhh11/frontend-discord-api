import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  
  console.log("🛡️ ProtectedRoute - Token:", token)

  if (!token || token === "undefined" || token === "null") {
    console.log("🚫 ProtectedRoute - No token, redirecting to /")
    localStorage.removeItem("token")
    return <Navigate to="/" replace />  // 👈 CHANGED: "/" instead of "/login"
  }

  console.log("✅ ProtectedRoute - Token valid, rendering children")
  return children
}

