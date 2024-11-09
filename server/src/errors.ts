// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
export enum AppErrors {
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  UNDEFINED_ERROR = "UNDEFINED_ERROR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
}

export class AppError {
  code: AppErrors;
  constructor(code: AppErrors) {
    if (AppErrors.hasOwnProperty(code)) {
      this.code = code as AppErrors;
    } else {
      throw new Error("Invalid error code: " + code);
    }
  }

  static NOT_IMPLEMENTED = new AppError(AppErrors.NOT_IMPLEMENTED);
  static PERMISSION_DENIED = new AppError(AppErrors.PERMISSION_DENIED);
  static UNDEFINED_ERROR = new AppError(AppErrors.UNDEFINED_ERROR);
  static USER_NOT_FOUND = new AppError(AppErrors.USER_NOT_FOUND);
  static PASSWORD_MISMATCH = new AppError(AppErrors.PASSWORD_MISMATCH);

  get message() {
    switch (this.code) {
      case AppErrors.NOT_IMPLEMENTED:
        return "This method is not implemented yet, please ask the developer to implement it.";
      case AppErrors.PERMISSION_DENIED:
        return "Permission denied.";
    }
  }
}

import type { ErrorRequestHandler } from "express";
export const error_middleware: ErrorRequestHandler = function (err: Error, _req, res, _next) {
  console.log("AppError", err);
  let error = err instanceof AppError ? err : new AppError(AppErrors.UNDEFINED_ERROR);
  res.status(400).json({ domain: "APP_ERROR", code: error.code, message: error.message });
};
