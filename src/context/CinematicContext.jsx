import { createContext, useContext, useState } from "react"

const CinematicContext = createContext()

export function CinematicProvider({ children }) {
  const [mode, setMode] = useState(null) 
  // null | "dive" | "surface"

  const dive = () => setMode("dive")
  const surface = () => setMode("surface")
  const reset = () => setMode(null)

  return (
    <CinematicContext.Provider value={{ mode, dive, surface, reset }}>
      {children}
    </CinematicContext.Provider>
  )
}

export const useCinematic = () => useContext(CinematicContext)
