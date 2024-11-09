// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { AddCvScreen } from "@/sections/add_cv";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add-cv")({
  component: AddCvScreen,
});
