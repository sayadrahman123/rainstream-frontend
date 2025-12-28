import axios from "axios";

// FIX: Use the Environment Variable, or fallback to a relative path
// This ensures it uses the Amplify Rewrite Rule ("/api/v1") in production
// and localhost in development if configured.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Interceptor (Keep this, it's perfect) ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
