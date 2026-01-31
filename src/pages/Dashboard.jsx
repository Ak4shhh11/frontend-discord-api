import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCinematic } from "../context/CinematicContext"
import audioManager from "../utils/audioManager"


export default function Dashboard() {
  const navigate = useNavigate()
  const { surface, reset } = useCinematic()

  const [visible, setVisible] = useState(false)
  const [surfacing, setSurfacing] = useState(false)

  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])


  useEffect(() => {
  audioManager.playAmbient("dashboard-hum.mp3", 0.12)

  return () => audioManager.stopAmbient()
}, [])

  const handleLogout = () => {
    audioManager.playSound("surface.mp3", {
      volume: 0.9,
    })


    surface()

    setTimeout(() => {
      localStorage.removeItem("token")
      navigate("/") // ⬅️ BALIK KE LANDING
      reset()
      audioManager.stopAllSounds()
    }, 1500)
  }



  return (
    <div
      className={`
        min-h-screen flex items-center justify-center
        bg-[#05080f] text-white relative overflow-hidden
        transition-all duration-1000
        ${visible ? "opacity-100" : "opacity-0"}
        ${surfacing ? "scale-90 brightness-150" : ""}
      `}
    >

      {/* 🎬 DASHBOARD INTRO */}
      {intro && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <h1 className="text-white text-4xl tracking-[0.35em] animate-fadeInSlow">
            WELCOME BACK TO THE DEEP SEA
          </h1>
        </div>
      )}


      {/* ☀️ SURFACE LIGHT */}
      {surfacing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <h1 className="text-white text-3xl tracking-widest animate-fadeIn">
            SEE YOU ABOVE THE SURFACE
          </h1>
        </div>
      )}

      {/* 🌊 AMBIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-black" />
      <div className="absolute inset-0 dashboard-particles pointer-events-none" />

      {/* CONTENT */}
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <h1
          className={`
            text-4xl font-bold mb-4
            transition-all duration-1000 delay-300
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          `}
        >
          Welcome Back 🌊
        </h1>

        <p
          className={`
            text-gray-400 mb-10
            transition-all duration-1000 delay-500
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          `}
        >
          You’ve reached the deep sea dashboard.
        </p>

        <div className="flex gap-6 justify-center">
          <button
            className="
              px-8 py-4 rounded-xl
              border border-cyan-400/40
              text-cyan-300 tracking-widest
              hover:bg-cyan-400/10
              transition-all duration-300
            "
          >
            CREATE SERVER
          </button>

          {/* 🔴 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="
              px-8 py-4 rounded-xl
              border border-red-400/40
              text-red-300 tracking-widest
              hover:bg-red-400/10
              hover:shadow-[0_0_25px_rgba(248,113,113,0.4)]
              transition-all duration-300
            "
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  )
}
