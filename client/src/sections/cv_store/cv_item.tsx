// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { Button } from "@/components/ui/button";
import { CvResolved } from "@/ts_client";
import { ChevronRight } from "lucide-react";
import React from "react";

export const CvItemEl: React.FC<{ cv: CvResolved; onClick?: () => void }> = ({ cv, onClick }) => {
  return (
    <li
      key={cv.uuid}
      className={
        "border border-gray-200 rounded-lg p-4 " + (onClick ? "cursor-pointer hover:bg-gray-100 transition" : "")
      }
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-4 hidden lg:block">
          <i className="bx bxs-file-pdf text-4xl text-blue-500"></i>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {cv.name} {cv.surname}
          </h2>
          <div className="flex justify-between  lg:flex-row flex-col gap-4">
            <div>
              <p className="text-sm text-gray-600">{cv.position}</p>
              <p className="text-xs text-gray-400">Создано: {new Date(cv.created_at).toLocaleDateString("ru-RU")}</p>
            </div>
            <Button variant="outline" className="ml-4" asChild>
              <a href={cv.pdf_url} target="_blank" rel="noopener noreferrer">
                Открыть PDF
                <ChevronRight className="h-4 w-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
