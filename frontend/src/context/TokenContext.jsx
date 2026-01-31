import { createContext, useContext, useState, useEffect } from "react"

const TokenContext = createContext()

export function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const setTokenAndStorage = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken)
      setToken(newToken)
      console.log("💾 Token set:", newToken.substring(0, 10) + "...")
    } else {
      localStorage.removeItem("token")
      setToken(null)
      console.log("🗑️ Token removed")
    }
  }

  const hasValidToken = token && token !== "undefined" && token !== "null"

  return (
    <TokenContext.Provider value={{ token, setTokenAndStorage, hasValidToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error("useToken must be used within TokenProvider")
  }
  return context
}
