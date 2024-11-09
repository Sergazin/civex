// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AddCvDescription() {
  return (
    <Card className="w-full sticky top-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Как загрузить резюме</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center">
            <i className="bx bx-upload mr-2 text-blue-500"></i>
            Загрузка резюме
          </h2>
          <p>Для загрузки вашего резюме, пожалуйста, следуйте этим шагам:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Нажмите на кнопку "Загрузить резюме"</li>
            <li>Выберите файл вашего резюме в формате PDF</li>
            <li>Нажмите "Открыть" или "Загрузить"</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center">
            <i className="bx bx-file mr-2 text-green-500"></i>
            Технические требования
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Формат файла: PDF</li>
            <li>Максимальный размер: 5 МБ</li>
            <li>Рекомендуемое разрешение: 300 dpi</li>
            <li>Текст должен быть читаемым и не защищенным паролем</li>
          </ul>
        </section>

        <Alert>
          <i className="bx bx-time text-2xl mr-2"></i>
          <AlertTitle>Обработка занимает время</AlertTitle>
          <AlertDescription>
            После загрузки вашего резюме, оно будет обработано нашим ИИ. Этот процесс может занять некоторое время.
            Пожалуйста, будьте терпеливы.
          </AlertDescription>
        </Alert>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center">
            <i className="bx bx-check-circle mr-2 text-purple-500"></i>
            Проверка статуса
          </h2>
          <p>После загрузки резюме вы можете проверить статус обработки:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Перейдите в раздел "Мои заявки"</li>
            <li>Найдите вашу последнюю загрузку</li>
            <li>Статус будет отображен как "В обработке", "Завершено" или "Ошибка"</li>
          </ol>
        </section>
      </CardContent>
    </Card>
  );
}
