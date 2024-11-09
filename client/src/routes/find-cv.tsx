// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import FindCVScreen from "@/sections/find_cv";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/find-cv")({
  component: FindCVScreen,
});
