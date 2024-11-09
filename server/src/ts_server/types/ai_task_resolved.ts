// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ==================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import type { AiTaskStatus } from '../types/ai_task_status';
import type { CvResolved } from '../types/cv_resolved';
// ===============================================================
export type AiTaskResolved = { uuid: string;
no: number;
status: AiTaskStatus;
pdf_url: string;
created_at: number;
creator_uuid: string;
cv?: CvResolved;
 };
