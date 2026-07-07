const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

const fallbackBaseUrl = import.meta.env.PROD
    ? "https://belman-backend.fly.dev"
    : "http://localhost:5192";

export const API_BASE_URL = (envBaseUrl || fallbackBaseUrl).replace(/\/$/, "");