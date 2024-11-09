// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import CVStoreScreen from "@/sections/cv_store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv-store")({
  component: CVStoreScreen,
});
