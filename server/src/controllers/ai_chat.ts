// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import * as T from "../ts_server";
import {vector_store} from "./ai_queue";
export async function ai_chat_message(
  auth_claims: T.AuthClaims,
  body: T.AiChatMessageRequest,
): Promise<T.AiChatMessageResult> {
  const result = await vector_store.similaritySearchWithScore(body.search_query, 10);

  throw new Error("Method not implemented.");
}
