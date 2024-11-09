// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthCubit } from "./sections/auth/auth_cubit";
import { AddCvCubit } from "./sections/add_cv/add_cv_cubit";
import { CvStoreCubit } from "./sections/cv_store/cv_store_cubit";
// Create a new router instance
const router = createRouter({ routeTree, history: createHashHistory() });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

// CUBITS INITIALIZATION
AuthCubit.on_auth(async () => {
  AddCvCubit.init();
  CvStoreCubit.init();
});

AuthCubit.init();

