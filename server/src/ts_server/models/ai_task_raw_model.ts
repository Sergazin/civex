// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// ===============================================================
import * as T from "../types";
import * as M from ".";

import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const AiTaskRawSchemaObj = {
    uuid: { type: String, required: true },
no: { type: Number, required: true },
status: M.AiTaskStatusSchemaObj,
pdf_url: { type: String, required: true },
created_at: { type: Number, required: true },
creator_uuid: { type: String, required: true },

};

export const AiTaskRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const AiTaskRawSchema = new mongoose.Schema(AiTaskRawSchemaObj, AiTaskRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type AiTaskRawDoc = mongoose.Document<unknown, any, T.AiTaskRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const AiTaskRawModel = mongoose.model<T.AiTaskRaw>("ai_task_raw", AiTaskRawSchema);

