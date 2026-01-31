import { useCinematic } from "../context/CinematicContext"

export default function CinematicLayer() {
  const { mode } = useCinematic()

  if (!mode) return null

  return (
    <div
      className={`
        fixed inset-0 z-[9999] pointer-events-none
        transition-all duration-1000
        ${mode === "dive"
          ? "bg-black opacity-100 animate-dive"
          : "bg-white opacity-100 animate-surface"}
      `}
    />
  )
}
