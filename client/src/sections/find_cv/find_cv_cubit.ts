// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { api } from "@/api";
import { CvResolved } from "@/ts_client";
import * as nanostores from "nanostores";

const state = nanostores.map<{
  cv_list: CvResolved[];
  in_progress: boolean;
}>({
  cv_list: [],
  in_progress: false,
});

export class FindCVCubit {
  static state = state;

  static async init() {
    // Init code
  }

  static async search(search_query: string) {
    state.setKey("in_progress", true);
    try {
      const cv_list = await api.search_cv({ search_query });
      state.setKey("cv_list", cv_list);
    } catch (e) {
      console.log(e);
    }
    state.setKey("in_progress", false);
  }
}
