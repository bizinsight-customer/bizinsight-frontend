export const ENV = {
  VITE_API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === "true",
};
