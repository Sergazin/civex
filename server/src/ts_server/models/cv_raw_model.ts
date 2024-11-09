// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// ===============================================================
import * as T from "../types";
import * as M from ".";

import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const CvRawSchemaObj = {
    uuid: { type: String, required: true },
ai_task_uuid: { type: String, required: true },
no: { type: Number, required: true },
name: { type: String, required: true },
surname: { type: String, required: true },
position: { type: String, required: true },
extracted_text: { type: String, required: true },
pdf_url: { type: String, required: true },
creator_uuid: { type: String, required: true },
created_at: { type: Number, required: true },

};

export const CvRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const CvRawSchema = new mongoose.Schema(CvRawSchemaObj, CvRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type CvRawDoc = mongoose.Document<unknown, any, T.CvRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const CvRawModel = mongoose.model<T.CvRaw>("cv_raw", CvRawSchema);

