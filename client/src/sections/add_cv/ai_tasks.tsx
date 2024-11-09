// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { AiTaskResolved, AiTaskStatus, AiTaskStatusEnum } from "@/ts_client";
import { useStore } from "@nanostores/react";
import { AddCvCubit } from "./add_cv_cubit";
import { Button } from "@/components/ui/button";

const getStatusIcon = (status: AiTaskStatus) => {
  switch (status.name) {
    case AiTaskStatusEnum.Created:
      return <i className="bx bx-time text-yellow-500"></i>;
    case AiTaskStatusEnum.InProgress:
      return <i className="bx bx-loader-alt animate-spin text-blue-500"></i>;
    case AiTaskStatusEnum.Completed:
      return <i className="bx bx-check text-green-500"></i>;
    case AiTaskStatusEnum.Failed:
      return <i className="bx bx-x text-red-500"></i>;
  }
};

const getStatusName = (status: AiTaskStatus) => {
  switch (status.name) {
    case AiTaskStatusEnum.Created:
      return "Ожидание";
    case AiTaskStatusEnum.InProgress:
      return "В процессе";
    case AiTaskStatusEnum.Completed:
      return "Завершено";
    case AiTaskStatusEnum.Failed:
      return "Ошибка";
  }
};

export default function AiTasksEl() {
  const state = useStore(AddCvCubit.state);
  const ai_tasks = state.ai_tasks;

  return (
    <div className="w-full   space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-center">Подготовка резюме</h1>
        <p className="text-center">Здесь вы можете увидеть статусы ваших резюме:</p>
      </div>
      {ai_tasks.map((ai_task) => (
        <AiTaskEl ai_task={ai_task} />
      ))}
    </div>
  );
}

export const AiTaskEl: React.FC<{ ai_task: AiTaskResolved }> = ($) => {
  const [progress, setProgress] = React.useState(0);

  const progress_percent_per_second = 1;

  useEffect(() => {
    const status = $.ai_task.status.name;
    setProgress(
      status === AiTaskStatusEnum.Created
        ? 2
        : status === AiTaskStatusEnum.InProgress
          ? 20
          : status === AiTaskStatusEnum.Completed
            ? 100
            : 0,
    );

    if (status !== AiTaskStatusEnum.InProgress) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - $.ai_task.created_at;
      const seconds = Math.floor(diff / 1000);
      const pr = seconds * progress_percent_per_second;
      setProgress(Math.min(pr, 100));
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <div className="bg-white border rounded-lg p-4 flex items-center space-x-4 w-full">
      <div className="flex-shrink-0">
        <i className="bx bxs-file-pdf text-3xl text-blue-500"></i>
      </div>
      <div className="flex-grow w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <h2 className="text-lg font-semibold flex flex-col  space-x-1 overflow-hidden  w-full">
            <div className="flex  justify-between lg:flex-row flex-col pb-1">
              <div className="grow">Резюме №{$.ai_task.no}</div>
              <div className="flex gap-4  justify-start ">
                <span className="flex items-center space-x-1">
                  {getStatusIcon($.ai_task.status)}
                  <span className="text-sm">{getStatusName($.ai_task.status)}</span>
                </span>
                {$.ai_task.cv && (
                  <div className="flex justify-end mt-2">
                    <Button
                      size="xs"
                      className="bg-blue-500 hover:bg-blue-600 text-white "
                      onClick={() => {
                        window.open($.ai_task.cv?.pdf_url);
                      }}
                    >
                      <i className="bx bx-link-external"></i>
                      PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {$.ai_task.cv && (
              <span className="  text-xs block">{`${$.ai_task.cv.name} ${$.ai_task.cv.surname} - ${$.ai_task.cv.position}`}</span>
            )}
          </h2>
        </div>

        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};
