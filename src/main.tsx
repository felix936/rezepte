import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: ":slug", element: <RecipePage /> },
]);

import App from "./App.tsx";
import RecipePage from "./components/RecipePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
