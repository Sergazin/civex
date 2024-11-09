// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { useStore } from "@nanostores/react";
import { useNavigate } from "@tanstack/react-router";
import { CvStoreCubit } from "./cv_store_cubit";
import { CvItemEl } from "./cv_item";

export default function CVStoreScreen() {
  const nav = useNavigate();
  const state = useStore(CvStoreCubit.state);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Хранилище резюме</h1>
      <p className="text-gray-600 mb-8">
        Здесть вы можете просмотреть и скачать резюме, которые были добавлены и проанализированы AI.
      </p>
      <ul className=" grid gap-8 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {state.cv_list.map((cv) => ( <CvItemEl cv={cv} />))}
        <li
          className="border border-gray-200 rounded-lg p-4 bg-blue-500 text-white cursor-pointer"
          onClick={() => nav({ to: "/add-cv" })}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <i className="bx bx-add-to-queue text-4xl"></i>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold whitespace-nowrap">Добавить новое резюме</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm ">Нажмите, чтобы добавить новое резюме</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
