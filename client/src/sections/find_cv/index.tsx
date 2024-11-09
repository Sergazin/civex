// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindCVCubit } from "./find_cv_cubit";
import { useStore } from "@nanostores/react";
import { CvItemEl } from "../cv_store/cv_item";

const tags = ["Программист", "UI - специалист", "Менеджер по продажам", "Маркетолог", "Дизайнер", "Тестировщик"];

export default function FindCVScreen() {
  const state = useStore(FindCVCubit.state);
  const [current_pdf, set_current_pdf] = useState("");

  const [search_query, set_search_query] = useState("");

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* First part: Search form and results */}
        <div className="w-full lg:w-1/2">
          <div>
            <div className="flex gap-2 mb-4">
              <Input
                type="search"
                placeholder="Поиск резюме"
                defaultValue={search_query}
                onChange={(e) => set_search_query(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={() => FindCVCubit.search(search_query)}>
                <i className="bx bx-search mr-2"></i>
                Поиск
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => {
                    set_search_query(tag);
                    FindCVCubit.search(tag);
                  }}
                  size={"xs"}
                >
                  <i className="bx bx-tag-alt"></i>
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {state.in_progress ? (
            <div className="flex justify-center items-center h-64">
              <i className="bx bx-loader bx-spin text-4xl text-primary"></i>
            </div>
          ) : state.cv_list.length > 0 ? (
            <>
              <ul className="space-y-2 mb-4">
                {state.cv_list.map((cv) => (
                  <CvItemEl
                    cv={cv}
                    onClick={() => {
                      set_current_pdf(cv.pdf_url);
                    }}
                  />
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8 h-72 flex flex-col items-center justify-center">
              <i className="bx bx-search text-7xl text-gray-500 block"></i>
              Нет результатов. Попробуйте изменить параметры поиска.
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 lg:flex-row flex-col items-center">
                <div className="w-24 flex items-center justify-center">
                  <i className="bx bx-bot text-6xl text-primary"></i>{" "}
                </div>
                <div>
                  <h1 className="text-xl font-bold">Используйте ИИ для поиска резюме</h1>
                  <p>Используйте нашу систему ИИ для более точного поиска подходящих кандидатов.</p>
                  <p>Система ИИ будет анализировать ваши предыдущие вакансии и рекомендовать подходящие резюме.</p>
                  <p>Вводите любые ключевые слова, и система ИИ попробует найти подходящие резюме.</p>
                </div>
              </div>
              {/*<Button className="mt-4"> <i className="bx bx-bot mr-2"></i> Начать ИИ-поиск </Button>*/}
            </CardContent>
          </Card>
        </div>

        {/* Second part: AI recommendation and CV preview */}
        <div className="w-full lg:w-1/2 space-y-4">
          <Card className=" sticky top-10">
            <CardHeader>
              <CardTitle>Предпросмотр резюме</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {current_pdf ? (
                <iframe
                  src={current_pdf + "#toolbar=0&navpanes=0&zoom=fitW"}
                  className="w-full aspect-[3/4]"
                ></iframe>
              ) : (
                <div className="aspect-[3/4] bg-gray-100 rounded flex items-center justify-center">
                  <i className="bx bxs-file-pdf text-6xl text-gray-400"></i>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
