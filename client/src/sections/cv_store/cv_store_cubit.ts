// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { api } from "@/api";
import { CvResolved } from "@/ts_client";
import * as nanostores from "nanostores";

const state = nanostores.map<{
  cv_list: CvResolved[];
}>({
  cv_list: [],
});

export class CvStoreCubit {
  static state = state;

  static async init() {
    this.fetch();
    setInterval(async () => {
      this.fetch();
    }, 2000);
    // Init code
  }
  static async fetch() {
    const cv_list = await api.get_cv_list();
    state.setKey("cv_list", cv_list);
    // Init code
  }
}
