import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCinematic } from "../context/CinematicContext"
import { useToken } from "../context/TokenContext"
import audioManager from "../utils/audioManager"


export default function Dashboard() {
  const navigate = useNavigate()
  const { surface, reset } = useCinematic()
  const { setTokenAndStorage } = useToken()

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

  // ✅ TOKEN VALIDATION SUDAH DI APP.JSX - TIDAK PERLU DI SINI
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   console.log("📊 DASHBOARD - Token check:", token)
  //   if (!token || token === "undefined" || token === "null") {
  //     console.log("❌ No valid token, redirecting to /")
  //     navigate("/", { replace: true })
  //   } else {
  //     console.log("✅ Dashboard accessed with valid token")
  //   }
  // }, [navigate])

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
      setTokenAndStorage(null)  // Use TokenContext to update state
      reset()
      audioManager.stopAllSounds()
      navigate("/") // Auto-redirect happens via App.jsx routing
    }, 1500)
  }



return (
    <div className="bg-[#05080f] text-white">

      {/* ================= LOGOUT BUTTON ================= */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="
            px-6 py-2 rounded-lg
            bg-red-600/20 border border-red-500/50
            text-red-400 font-semibold
            hover:bg-red-600/40 hover:border-red-500
            transition-all duration-300
            active:scale-95
          "
        >
          LOGOUT
        </button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">

        {/* ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_65%)]" />

        <div className="relative z-10 fade-in">
          <h1 className="text-6xl md:text-7xl font-bold tracking-[0.25em] mb-6 glow-text">
            DISCORD
          </h1>
          <h2 className="text-4xl font-semibold tracking-widest mb-6">
            REST API
          </h2>

          <p className="text-cyan-300 text-xl mb-2">
            Final Project – Platform Based Programming
          </p>

          <p className="text-gray-400 tracking-widest">
            Node.js • Express • MySQL • JWT
          </p>
        </div>
      </section>

      {/* ================= ARCHITECTURE ================= */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto fade-in">

        <div className="card">
          <h3 className="text-2xl font-bold mb-4 text-cyan-300">Frontend</h3>
          <p className="text-gray-400">React + Tailwind</p>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-4 text-cyan-300">Backend</h3>
          <p className="text-gray-400">Node.js + Express</p>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-4 text-cyan-300">Database</h3>
          <p className="text-gray-400">MySQL (Relational)</p>
        </div>

      </div>


      {/* ================= DATABASE ================= */}
      <section className="py-32 px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">🗄 Database Design</h2>

        <div className="grid md:grid-cols-2 gap-10">
        <img
          src="/screenshots/db-fix1.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
        <img
          src="/screenshots/db-fix2.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
        <img
          src="/screenshots/test1.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
        <img
          src="/screenshots/test2.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
        </div>
      </section>

      {/* ================= ENDPOINT ================= */}
      <section className="py-32 bg-[#070b14] px-10">
        <h2 className="text-4xl font-bold mb-12 text-center">
          🔌 REST API Endpoint
        </h2>

        <div className="space-y-16 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl mb-4 text-cyan-300">Create Server</h3>
        <img
          src="/screenshots/cs-fix1.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
          </div>

          <div>
            <h3 className="text-2xl mb-4 text-cyan-300">Join Server</h3>
        <img
          src="/screenshots/cs-fix2.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
          </div>
        </div>
      </section>

      {/* ================= API PUBLIC ================= */}
      <section className="py-32 px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">🌍 API Public</h2>
        <p className="text-gray-300 mb-6">
          Sistem ini terintegrasi dengan API Public eksternal
          untuk memperkaya data aplikasi.
        </p>
        <img
          src="/screenshots/api public.png"
          className="image-frame hover:scale-[1.02] transition duration-700"
        />
      </section>

      {/* ================= SECURITY ================= */}
      <section className="py-32 bg-[#070b14] px-10">
        <h2 className="text-4xl font-bold mb-12 text-center">
          🔐 JWT & Security
        </h2>
        <p className="text-center text-gray-300">
          Menggunakan JSON Web Token sebagai sistem autentikasi
          dan proteksi endpoint.
        </p>
            <div>
            <h3 className="text-2xl mb-4 text-cyan-300">Json WEB Token</h3>
          <img
            src="/screenshots/login-fix.png"
            className="image-frame hover:scale-[1.02] transition duration-700"
          />
          </div>
      </section>

      {/* ================= DEMO FLOW ================= */}
      <section className="py-32 px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 tracking-widest glow-text">
          🔌 REST API ENDPOINT
        </h2>
        <ol className="list-decimal ml-6 text-gray-300 space-y-2">
          <li>User Register</li>
          <li>User Login</li>
          <li>Token JWT</li>
          <li>Access Protected API</li>
        </ol>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-40 text-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />

        <h2 className="text-4xl font-bold mb-6 glow-text">
          THANK YOU
        </h2>

        <p className="text-gray-400 tracking-widest">
          Discord REST API – Final Project
        </p>
      </section>

    </div>
  )
}