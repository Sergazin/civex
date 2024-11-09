// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// =============================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Server API File
// =============================================================================================

import * as T from "./types";
export * from "./types";
export interface API {
    auth_check(auth_claims: AuthClaims,):Promise<T.AuthClaims>;
    login(body: T.LoginForm):Promise<T.LoginResult>;
    get_ai_tasks(auth_claims: AuthClaims,):Promise<T.AiTaskResolved[]>;
    get_cv_list(auth_claims: AuthClaims,):Promise<T.CvResolved[]>;
    create_cv(auth_claims: AuthClaims,body: T.CreateCv):Promise<T.AiTaskResolved>;
    search_cv(auth_claims: AuthClaims,body: T.SearchCv):Promise<T.CvResolved[]>;
    ai_chat_message(auth_claims: AuthClaims,body: T.AiChatMessageRequest):Promise<T.AiChatMessageResult>;
    upload(auth_claims: AuthClaims,body: T.UploadRequest):Promise<T.UploadResult>;
}
import JWT from "jsonwebtoken";
export type AuthClaims = { user_uuid: string; groups: string[] };

export function jwt_validate(access_token?: string): AuthClaims {
  if (!access_token) throw "JWT_INVALID";
  if (access_token.includes("Bearer ")) {
    access_token = access_token.split("Bearer ")[1];
  }
  const secret = process.env.JWT_SECRET || "secret";
  try {
    const decoded = JWT.verify(access_token, secret) as AuthClaims;
    return decoded;
  } catch (e) {
    if (e instanceof JWT.TokenExpiredError) {
      console.log({ expiredAt: e.expiredAt, now: new Date() });
      throw "JWT_EXPIRED";
    }
    throw "JWT_INVALID";
  }
}


import express from "express";
export function apply_routes(router: express.Router, api: API) {
     router.get("/auth-check", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.auth_check(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/login", async (req, res, next) => {
    try {
      
      
      res.json(await api.login(req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/ai_tasks", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.get_ai_tasks(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/cv", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.get_cv_list(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/cv/create", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.create_cv(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/cv/search", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.search_cv(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/ai-chat", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.ai_chat_message(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/upload", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.upload(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

}
