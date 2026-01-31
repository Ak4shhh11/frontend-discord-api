import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { useCinematic } from "../context/CinematicContext"
import { useToken } from "../context/TokenContext"
import audioManager from "../utils/audioManager"


export default function Login() {
  const navigate = useNavigate()
  const { dive, reset } = useCinematic()
  const { setTokenAndStorage } = useToken()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [diving, setDiving] = useState(false)
  const [enter, setEnter] = useState(false)

  // 🎬 MASUK HALAMAN PELAN
  useEffect(() => {
    const t = setTimeout(() => setEnter(true), 400)
    return () => clearTimeout(t)
  }, [])

  // 🔐 HANYA CLEAR TOKEN JIKA INVALID
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("🔐 LOGIN - Checking token:", token)
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("token")
    } else {
      console.log("⚠️ Token exists, user should be at dashboard!")
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    if (loading) return

    audioManager.playSound("simple-whoosh.mp3", {
      volume: 0.45,
      rate: 0.9,
    })

    console.log("🔴 LOGIN CLICKED - Email:", email)

    setError("")
    setLoading(true)

    setDiving(true)
    dive()

    try {
      console.log("📡 Calling API: POST /api/auth/login")
      const res = await api.post("/api/auth/login", {
        email,
        password,
      })

      console.log("✅ LOGIN SUCCESS - Response:", res.data)
      
      const token = res.data.token
      if (!token) {
        throw new Error("⚠️ Token tidak ada di response!")
      }

      setTokenAndStorage(token)
      console.log("💾 Token disimpan ke localStorage:", token)

      setTimeout(() => {
        setLoading(false)
        reset()
        console.log("🎯 Navigating to /dashboard...")
        navigate("/dashboard")
      }, 1400)

    } catch (err) {
      console.error("❌ LOGIN ERROR:", err.message || err)
      console.error("❌ Full error object:", err)
      setError(err.response?.data?.message || "Login gagal - " + (err.message || "Unknown error"))
      setLoading(false)
      setDiving(false)
      reset()
    }
  }


  return (
    <div
      className={`
        min-h-screen bg-[#07090d] flex items-center justify-center relative overflow-hidden
        transition-all duration-1000 ease-out
        ${enter ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
    >

      {/* 🌑 OVERLAY HITAM — TENGGELAM */}
      {diving && (
        <div
          className="
            fixed inset-0 bg-black
            transition-opacity duration-1000
            opacity-0 animate-fadeIn
            z-40
            pointer-events-none
          "
        />
      )}

      {/* 🌊 BUBBLES */}
      {[
        { size: 180, duration: 20 },
        { size: 140, duration: 24 },
        { size: 110, duration: 28 },
        { size: 80, duration: 32 },
      ].map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            "--size": `${b.size}px`,
            left: `${15 + i * 22}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${i * 4}s`,
          }}
        />
      ))}

      {/* Ambient Light */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-indigo-500/5" />

      {/* 🔐 LOGIN CARD */}
      <form
        onSubmit={handleLogin}
        className={`
          relative z-10 w-[420px] p-10
          bg-[#0e1117]/90 backdrop-blur-xl
          rounded-2xl border border-white/10
          shadow-[0_0_50px_rgba(0,0,0,0.9)]
          transition-all duration-1000 delay-300 ease-out
          ${enter ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold text-white">
            Discord<span className="text-yellow-400">.</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Dive into modern communication
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-[#05070b] text-white
            border border-white/10
            focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400
            outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-8 rounded-xl bg-[#05070b] text-white
            border border-white/10
            focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400
            outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 🚀 BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            group relative w-full h-14 rounded-xl
            bg-[#0b0e13]
            border border-yellow-400/40
            text-yellow-400 font-semibold tracking-widest
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_15px_40px_rgba(250,204,21,0.35)]
            active:scale-[0.98]
            active:shadow-[0_0_25px_rgba(250,204,21,0.5)]
            disabled:opacity-50
            overflow-hidden
            
          "
        >
          <span className="absolute top-0 left-[-100%] h-[2px] w-full
            bg-gradient-to-r from-transparent via-yellow-400 to-transparent
            group-hover:left-full transition-all duration-700" />

          <span className="absolute bottom-0 right-[-100%] h-[2px] w-full
            bg-gradient-to-r from-transparent via-yellow-400 to-transparent
            group-hover:right-full transition-all duration-700" />

            <span className={`relative z-10 ${loading ? "animate-pulse" : ""}`}>
              {loading ? "AUTHENTICATING..." : "LOGIN"}
            </span>
        </button>
      </form>
    </div>
  )
}
