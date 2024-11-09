// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import React from "react";
import PDFUpload from "./pdf_upload";
import AddCvDescription from "./description";
import AiTasksEl from "./ai_tasks";
import { AddCvCubit } from "./add_cv_cubit";

export const AddCvScreen: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full">
      <div className="xl:w-1/2 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-center">Загрузка резюме</h1>
          <p className="text-center">Для загрузки вашего резюме, пожалуйста, используйте форму ниже</p>
        </div>
        <PDFUpload onUpload={(pdf_url) => AddCvCubit.add_ai_task(pdf_url)} />
        <AddCvDescription />
      </div>
      <div className="xl:w-1/2">
        <AiTasksEl />
      </div>
    </div>
  );
};
