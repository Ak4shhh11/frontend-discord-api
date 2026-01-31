import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

console.log("🔗 API Base URL:", API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
})

// Interceptor untuk log semua request
api.interceptors.request.use(config => {
  console.log(`📤 API REQUEST: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`)
  return config
})

// Interceptor untuk log semua response
api.interceptors.response.use(
  response => {
    console.log(`📥 API RESPONSE: ${response.status}`, response.data)
    return response
  },
  error => {
    console.error(`❌ API ERROR: ${error.response?.status || 'No status'}`, error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
