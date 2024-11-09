// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ==================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
// ===============================================================
export enum AiTaskStatusEnum { Created = "CREATED",InProgress = "IN_PROGRESS",Completed = "COMPLETED",Canceled = "CANCELED",Failed = "FAILED", }

export type AiTaskStatusCreated = { name: AiTaskStatusEnum.Created;
 };
export type AiTaskStatusInProgress = { name: AiTaskStatusEnum.InProgress;
 };
export type AiTaskStatusCompleted = { name: AiTaskStatusEnum.Completed;
 };
export type AiTaskStatusCanceled = { name: AiTaskStatusEnum.Canceled;
 };
export type AiTaskStatusFailed = { name: AiTaskStatusEnum.Failed;
 };

export type AiTaskStatus = | AiTaskStatusCreated| AiTaskStatusInProgress| AiTaskStatusCompleted| AiTaskStatusCanceled| AiTaskStatusFailed
