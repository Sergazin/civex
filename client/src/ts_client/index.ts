// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// =============================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Client API File
// =============================================================================================
import * as T from "./types";
export * from "./types";
import type { AxiosInstance } from "axios";

export class API {
  axios_client: AxiosInstance;
  sub_path: string;

  constructor(axios_client: AxiosInstance, sub_path = "") {
    this.sub_path = sub_path;
    this.axios_client = axios_client;
  }

async auth_check():Promise<T.AuthClaims>{ let resp = await this.axios_client.get<T.AuthClaims>(`${this.sub_path}/auth-check`);
return resp.data; }
async login(body: T.LoginForm):Promise<T.LoginResult>{ let resp = await this.axios_client.post<T.LoginResult>(`${this.sub_path}/login`, body);
return resp.data; }
async get_ai_tasks():Promise<T.AiTaskResolved[]>{ let resp = await this.axios_client.get<T.AiTaskResolved[]>(`${this.sub_path}/ai_tasks`);
return resp.data; }
async get_cv_list():Promise<T.CvResolved[]>{ let resp = await this.axios_client.get<T.CvResolved[]>(`${this.sub_path}/cv`);
return resp.data; }
async create_cv(body: T.CreateCv):Promise<T.AiTaskResolved>{ let resp = await this.axios_client.post<T.AiTaskResolved>(`${this.sub_path}/cv/create`, body);
return resp.data; }
async search_cv(body: T.SearchCv):Promise<T.CvResolved[]>{ let resp = await this.axios_client.post<T.CvResolved[]>(`${this.sub_path}/cv/search`, body);
return resp.data; }
async ai_chat_message(body: T.AiChatMessageRequest):Promise<T.AiChatMessageResult>{ let resp = await this.axios_client.post<T.AiChatMessageResult>(`${this.sub_path}/ai-chat`, body);
return resp.data; }
async upload(body: T.UploadRequest):Promise<T.UploadResult>{ let resp = await this.axios_client.post<T.UploadResult>(`${this.sub_path}/upload`, body);
return resp.data; }
}