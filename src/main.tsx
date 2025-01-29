import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ENV } from "./config/env";
import "./index.css";
import { router } from "./router.tsx";

async function initializeMockAPI() {
  if (ENV.VITE_USE_MOCK_API) {
    const { worker } = await import("./services/api/mock/browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}

initializeMockAPI().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
