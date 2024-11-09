// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import * as T from "../ts_server";
import { CvRawModel } from "../ts_server/models";
import { vector_store } from "./ai_queue";
export async function search_cv(auth_claims: T.AuthClaims, body: T.SearchCv): Promise<T.CvResolved[]> {
  const result = await vector_store.similaritySearchWithScore(body.search_query, 10);
  console.log(result);

  const id_list = result.map(([r, score]) => r.id!).filter((id) => id);
  const sort_hashmap = new Map<string, number>();

  for (const [r, score] of result) {
    if (!r.id) continue;
    sort_hashmap.set(r.id, score);
  }

  const sorted_ids = id_list.sort((a, b) => {
    const a_score = sort_hashmap.get(a) || 0;
    const b_score = sort_hashmap.get(b) || 0;
    return a_score - b_score > 0 ? 1 : -1;
  });

  const found_cv = await CvRawModel.find({ uuid: { $in: id_list } });

  // Sort from highest to lowest score
  const found_cv_sorted = found_cv.sort((a, b) => {
    const a_index = sorted_ids.indexOf(a.uuid);
    const b_index = sorted_ids.indexOf(b.uuid);
    return b_index - a_index > 0 ? 1 : -1;
  });

  /*
  for (const doc of result) {
    console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
  }
  * **/

  return found_cv_sorted;
}
