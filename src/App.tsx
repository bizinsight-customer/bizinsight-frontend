import { ErrorFallback } from "@/components/error-boundary/ErrorFallback";
import { ApiProvider } from "@/services/api/ApiProvider";
import { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import "./App.css";

const logError = (error: Error, info: ErrorInfo) => {
  // Log to your error reporting service
  console.error("Caught by error boundary:", error, info);
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ApiProvider>
        <Outlet />
      </ApiProvider>
    </ErrorBoundary>
  );
}

export default App;
