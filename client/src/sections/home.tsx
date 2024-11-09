// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function HomeScreen() {
  const nav = useNavigate();

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex gap-8 lg:flex-row flex-col">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Добро пожаловать в CiVeX</CardTitle>
            <CardDescription className="text-xl">
              Наш сервис помогает находить подходящие резюме с помощью искусственного интеллекта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              CiVeX использует передовые алгоритмы машинного обучения для анализа и сопоставления резюме с
              требованиями работодателей. Это позволяет быстро и эффективно находить наиболее подходящих кандидатов.
            </p>
          </CardContent>
        </Card>
        <Card className="min-w-48">
          <CardHeader className="hidden">
            <CardTitle className="text-3xl font-bold hidden"></CardTitle>
            <CardDescription className="text-xl"></CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full p-4">
            <img src="/assets/logo.svg" alt="CiVeX" className="w-48 h-48" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Найти Резюме</CardTitle>
            <CardDescription>Используйте AI для поиска подходящих резюме</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Как найти подходящее резюме:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Введите ключевые слова или требования к должности</li>
              <li>Нажмите "Поиск" для запуска AI-анализа</li>
              <li>Просмотрите результаты и выберите наиболее подходящие резюме</li>
            </ol>
            <Button className="mt-4" onClick={() => nav({ to: "/find-cv" })}>
              <i className="bx bx-search mr-2"></i>
              Начать поиск
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Добавить Резюме</CardTitle>
            <CardDescription>Загрузите новое резюме в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Чтобы загрузить резюме:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Нажмите кнопку "Загрузить Резюме"</li>
              <li>Выберите файл резюме в формате PDF или DOCX</li>
              <li>Нажмите "Отправить" для завершения загрузки</li>
            </ol>
            <Button className="mt-4" onClick={() => nav({ to: "/add-cv" })}>
              <i className="bx bx-upload mr-2"></i>
              Загрузить Резюме
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Хранилище Резюме</CardTitle>
            <CardDescription>Просмотрите доступные резюме в нашем хранилище</CardDescription>
          </CardHeader>
          <CardContent>
            <p>В хранилище резюме вы можете:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Просматривать все загруженные резюме</li>
              <li>Сохранять интересные резюме</li>
              <li>Скачивать резюме в формате PDF</li>
            </ul>
            <Button className="mt-4" onClick={() => nav({ to: "/cv-store" })}>
              <i className="bx bx-store mr-2"></i>
              Перейти в Хранилище Резюме
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
