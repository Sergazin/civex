// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { v4 } from "uuid";
import * as T from "../ts_server";
import { AiTaskRawModel, CvRawModel } from "../ts_server/models";
import { auth_check, login } from "./auth";
import { upload } from "./upload";
import { run_ai_queue } from "./ai_queue";
import { search_cv } from "./ai_search";
import { ai_chat_message } from "./ai_chat";
import { get_ai_tasks } from "./ai_tasks";

export class Controller implements T.API {
  ai_chat_message = ai_chat_message;
  login = login;
  auth_check = auth_check;
  get_ai_tasks = get_ai_tasks;

  async create_cv(auth_claims: T.AuthClaims, body: T.CreateCv): Promise<T.AiTaskResolved> {
    const qty = await AiTaskRawModel.countDocuments({});

    const new_task: T.AiTaskRaw = {
      no: qty + 1,
      status: { name: T.AiTaskStatusEnum.Created },
      created_at: Date.now(),
      creator_uuid: auth_claims.user_uuid,
      uuid: v4(),
      ...body,
    };

    const task = await AiTaskRawModel.create(new_task);
    run_ai_queue();
    return task;
  }

  async get_cv_list(_auth_claims: T.AuthClaims): Promise<T.CvResolved[]> {
    const list = await CvRawModel.find({}).sort({ created_at: -1 });
    return list;
  }
  upload = upload;
  search_cv = search_cv;
}
