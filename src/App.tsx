import { ErrorFallback } from "@/components/error-boundary/ErrorFallback";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { StartupProvider } from "@/features/startup/components/startup-provider";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ErrorInfo, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import "./App.css";
import AuthStateChangeHandler from "./components/auth/AuthStateChangeHandler";
import { GlobalErrorHandler } from "./components/error-boundary/GlobalErrorHandler";
import { ErrorPopup } from "./components/error-popup/ErrorPopup";
import { apiState } from "./services/api/axios";

const logError = (error: Error, info: ErrorInfo) => {
  // Log to your error reporting service
  console.error("Caught by error boundary:", error, info);
};

function App() {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthInitialized(true);
      if (user) {
        apiState.isAuthInitialized = true;
        apiState.isReady = true;
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthInitialized) {
    return <div>Loading application...</div>;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <GlobalErrorHandler />
      <AuthStateChangeHandler />
      <ErrorPopup />
      {isAuthenticated ? (
        <StartupProvider>
          <Outlet />
        </StartupProvider>
      ) : (
        <Outlet />
      )}
    </ErrorBoundary>
  );
}

export default App;
