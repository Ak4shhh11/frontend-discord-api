import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

import { CinematicProvider } from "./context/CinematicContext"
import { TokenProvider, useToken } from "./context/TokenContext"
import CinematicLayer from "./components/CinematicLayer"

// 🔐 Smart Router Component
function AppRoutes() {
  const { hasValidToken } = useToken()

  return (
    <Routes>
      {/* Landing: Redirect to Dashboard if already logged in */}
      <Route
        path="/"
        element={
          hasValidToken ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Landing />
          )
        }
      />

      {/* Login: Redirect to Dashboard if already logged in */}
      <Route
        path="/login"
        element={
          hasValidToken ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Dashboard: Check token before render */}
      <Route
        path="/dashboard"
        element={
          hasValidToken ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Catch-all: Redirect to / */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <TokenProvider>
      <CinematicProvider>
        <BrowserRouter>
          {/* 🎥 GLOBAL CINEMATIC LAYER */}
          <CinematicLayer />

          {/* 🚦 ROUTES */}
          <AppRoutes />
        </BrowserRouter>
      </CinematicProvider>
    </TokenProvider>
  )
}
