// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// ===============================================================
import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const AiTaskStatusSchemaObj = { type: { "name": String }, required: true, default: { "name": "created"}, enum: ["CREATED", "IN_PROGRESS", "COMPLETED", "CANCELED", "FAILED", ] };
