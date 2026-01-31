import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCinematic } from "../context/CinematicContext"
import audioManager from "../utils/audioManager"

export default function Landing() {
  const navigate = useNavigate()
  const { dive, reset } = useCinematic()
  const [diving, setDiving] = useState(false)

  // ❌ REMOVE AUTO-REDIRECT - HANDLE DI APP.JSX LEVEL
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   console.log("🏠 LANDING - Checking token:", token)
  //   if (token && token !== "undefined" && token !== "null") {
  //     console.log("✅ Token valid, redirecting to dashboard")
  //     navigate("/dashboard", { replace: true })
  //   }
  // }, [navigate])

  const handleDive = () => {
    audioManager.playSound("simple-whoosh.mp3", {
      volume: 0.45,
      rate: 0.85,
    })

    setDiving(true)
    dive()

    // 🫁 kasih otak napas
    setTimeout(() => {
      reset()
      navigate("/login")
    }, 1600)
  }


  useEffect(() => {
  audioManager.playAmbient("deep-sea.mp3", 0.15)
  return () => audioManager.stopAmbient()
}, [])

  return (
    <div
      className={`
        relative min-h-screen overflow-hidden
        bg-[#02040c] text-white
        transition-all duration-[1400ms] ease-in-out
        ${diving ? "scale-110 brightness-50" : ""}
      `}
    >
      {/* BREATHING GLOW */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-yellow-400/20 rounded-full blur-[220px] surface-glow" />

      {/* LIGHT WAVES */}
      <div className="absolute inset-0 light-wave blur-[140px]" />

      {/* SEA MIST */}
      <div className="absolute inset-0 sea-mist opacity-40" />

      {/* PLANKTON */}
      {[...Array(35)].map((_, i) => (
        <span
          key={i}
          className="plankton"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${18 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}

      {/* CONTENT */}
      <div
        className={`
          relative z-10 flex items-center justify-center min-h-screen px-6
          transition-all duration-[1200ms] ease-in-out
          ${diving ? "translate-y-20 opacity-0 blur-md" : ""}
        `}
      >
        <div className="text-center max-w-4xl">
          <p className="tracking-[0.4em] text-yellow-400/80 uppercase mb-6">
            Ocean Surface
          </p>

          <h1 className="text-6xl md:text-7xl font-semibold leading-tight mb-8">
            End Task
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              THE FINAL ASSIGNMENT
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-16 leading-relaxed">
            Present our final assignment — it is powerful.
            Enter when ready.
          </p>

          <div className="flex justify-center gap-10">
            <button
              onMouseEnter={() => {
                if (!audioManager.sounds["hover-soft.mp3"]) {
                  audioManager.playSound("hover-soft.mp3", { volume: 0.2 })
                }
              }}


              onClick={handleDive}
              className={`
                luxury-btn
                transition-all duration-[1000ms] ease-in-out
                ${diving ? "scale-150 opacity-0" : ""}
              `}
            >
              DIVE IN
            </button>

            <Link to="/login" className="luxury-btn ghost">
              OBSERVE
            </Link>
          </div>
        </div>
      </div>

      {/* OVERLAY HITAM */}
      {diving && (
        <div className="fixed inset-0 bg-black z-50 animate-fadeIn" />
      )}

      {/* DEPTH FADE */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-black" />
    </div>
  )
}
