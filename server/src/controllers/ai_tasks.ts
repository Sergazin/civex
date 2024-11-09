// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import * as T from "../ts_server";
import { AiTaskRawModel, CvRawModel } from "../ts_server/models";
export async function get_ai_tasks(_auth_claims: T.AuthClaims): Promise<T.AiTaskResolved[]> {
  const tasks: T.AiTaskResolved[] = await AiTaskRawModel.find({}).sort({ created_at: -1 }).lean();
  const cvs = await CvRawModel.find({}).lean();
  for (const task of tasks) {
    task.cv = cvs.find((cv) => cv.ai_task_uuid === task.uuid);
  }

  return tasks;
}
