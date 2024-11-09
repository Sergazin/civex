// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { api } from "@/api";
import { AiTaskResolved } from "@/ts_client";
import * as nanostores from "nanostores";

const state = nanostores.map<{
  ai_tasks: AiTaskResolved[];
}>({
  ai_tasks: [],
});

export class AddCvCubit {
  static state = state;

  static async init() {
    this.fetch();
    setInterval(async () => {
      this.fetch();
    }, 2000);
  }
  static async fetch() {
    const ai_tasks = await api.get_ai_tasks();
    state.setKey("ai_tasks", ai_tasks);
  }

  static async add_ai_task(pdf_url: string) {
    const ai_task = await api.create_cv({ pdf_url });
    state.setKey("ai_tasks", [ai_task, ...state.get().ai_tasks]);
  }
}
