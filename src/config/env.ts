// Environment variable configuration with TypeScript support
interface EnvironmentConfig {
  API_URL: string;
  USE_MOCK_API: boolean;
  ENV: "development" | "production" | "test";
}

// Validate and export environment variables with types
export const ENV: EnvironmentConfig = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === "true",
  ENV: (import.meta.env.VITE_ENV || "development") as EnvironmentConfig["ENV"],
};

// Validate required environment variables
const requiredEnvVars: (keyof EnvironmentConfig)[] = ["API_URL", "ENV"];

for (const envVar of requiredEnvVars) {
  if (!ENV[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
