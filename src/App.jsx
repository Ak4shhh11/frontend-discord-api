import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"

import { CinematicProvider } from "./context/CinematicContext"
import CinematicLayer from "./components/CinematicLayer"

export default function App() {
  return (
    <CinematicProvider>
      <BrowserRouter>

        {/* 🎥 GLOBAL CINEMATIC LAYER */}
        <CinematicLayer />

        {/* 🚦 ROUTES */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>
    </CinematicProvider>
  )
}
