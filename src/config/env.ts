// Environment variable configuration with TypeScript support
interface EnvironmentConfig {
  USE_MOCK_API: boolean;
  ENV: "development" | "production" | "test";
  DATE_TIME_FORMAT: string;
}

// Validate and export environment variables with types
export const ENV: EnvironmentConfig = {
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === "true",
  ENV: (import.meta.env.VITE_ENV || "development") as EnvironmentConfig["ENV"],
  DATE_TIME_FORMAT:
    import.meta.env.VITE_DATE_TIME_FORMAT || "YYYY-MM-DD HH:mm:ss",
};

// Validate required environment variables
const requiredEnvVars: (keyof EnvironmentConfig)[] = ["ENV"];

for (const envVar of requiredEnvVars) {
  if (!ENV[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
