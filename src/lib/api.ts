import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://toko.ox-sys.com", // o'zingizning subdomain
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Token qo'shish
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("ox_auth");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // parsing xatoliklarini e'tiborsiz qoldirish
    }
  }
  return config;
});

// Response handle
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("ox_auth");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
