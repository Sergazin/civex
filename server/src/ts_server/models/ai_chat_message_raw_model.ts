// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// ===============================================================
import * as T from "../types";
import * as M from ".";

import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const AiChatMessageRawSchemaObj = {
    uuid: { type: String, required: true },
text: { type: String, required: true },
from_bot: { type: Boolean, required: true, default: false },
created_at: { type: Number, required: true },
creator_uuid: { type: String, required: true },

};

export const AiChatMessageRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const AiChatMessageRawSchema = new mongoose.Schema(AiChatMessageRawSchemaObj, AiChatMessageRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type AiChatMessageRawDoc = mongoose.Document<unknown, any, T.AiChatMessageRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const AiChatMessageRawModel = mongoose.model<T.AiChatMessageRaw>("ai_chat_message_raw", AiChatMessageRawSchema);

