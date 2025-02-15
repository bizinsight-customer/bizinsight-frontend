import { ErrorFallback } from "@/components/error-boundary/ErrorFallback";
import { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import "./App.css";
import AuthStateChangeHandler from "./components/auth/AuthStateChangeHandler";
import { GlobalErrorHandler } from "./components/error-boundary/GlobalErrorHandler";

const logError = (error: Error, info: ErrorInfo) => {
  // Log to your error reporting service
  console.error("Caught by error boundary:", error, info);
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <GlobalErrorHandler />
      <AuthStateChangeHandler />
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
