import { ErrorFallback } from "@/components/error-boundary/ErrorFallback";
import { auth } from "@/services/firebase/auth"; // Assuming your firebase.ts is in services/firebase
import { onAuthStateChanged } from "firebase/auth";
import { ErrorInfo, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import "./App.css";
import AuthStateChangeHandler from "./components/auth/AuthStateChangeHandler";
import { GlobalErrorHandler } from "./components/error-boundary/GlobalErrorHandler";
import { ErrorPopup } from "./components/error-popup/ErrorPopup";

const logError = (error: Error, info: ErrorInfo) => {
  // Log to your error reporting service
  console.error("Caught by error boundary:", error, info);
};

function App() {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthInitialized) {
    return <div>Loading application...</div>; // Simple loading indicator
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <GlobalErrorHandler />
      <AuthStateChangeHandler />
      <ErrorPopup />
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
