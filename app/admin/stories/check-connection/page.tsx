'use client';

import { useState } from 'react';

export default function CheckConnectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/supabase/test');
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Connection failed');
        setResult(data);
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to check connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Проверка подключения к Supabase
        </h1>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">
              🔍 Что проверяем:
            </h2>
            <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
              <li>Наличие переменных окружения (.env.local)</li>
              <li>Подключение к Supabase API</li>
              <li>Доступ к таблице Story</li>
              <li>Возможность читать данные</li>
            </ul>
          </div>

          <button
            onClick={checkConnection}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Проверяю...' : '🔍 Проверить подключение'}
          </button>

          {result && result.success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Подключение успешно!
                  </h3>
                  <pre className="text-sm text-green-800 bg-white p-3 rounded border overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                  <div className="mt-3 text-sm text-green-700">
                    <p>
                      <strong>Найдено историй:</strong> {result.details?.storiesCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(error || (result && !result.success)) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">❌</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-2">
                    Ошибка подключения
                  </h3>
                  <p className="text-sm text-red-800 mb-3">{error || result?.error}</p>

                  {result?.details && (
                    <div className="text-sm text-red-700 mb-3">
                      <p className="font-semibold">Детали:</p>
                      <pre className="mt-1 bg-white p-2 rounded border text-xs overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </div>
                  )}

                  {result?.hint && (
                    <div className="text-sm text-red-700 bg-red-100 p-3 rounded border border-red-300">
                      <p className="font-semibold mb-1">💡 Подсказка:</p>
                      <p>{result.hint}</p>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-red-700">
                    <p className="font-semibold mb-2">🔧 Как исправить:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>
                        Убедись, что создан файл <code className="bg-red-100 px-1 rounded">.env.local</code> в корне проекта
                      </li>
                      <li>
                        Добавь в него:
                        <pre className="mt-1 bg-red-100 p-2 rounded text-xs overflow-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://lqgurdhcxzjchudxuuts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ3VyZGhjeHpqY2h1ZHh1dXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTEzMTcsImV4cCI6MjA4MDI2NzMxN30.bS0tS4ODfJNXKLAePTIaYkB4NnXmNyUOl0VMiV1B7KE`}
                        </pre>
                      </li>
                      <li>Перезапусти dev сервер: <code className="bg-red-100 px-1 rounded">npm run dev</code></li>
                      <li>
                        Если таблица не существует, запусти:{' '}
                        <code className="bg-red-100 px-1 rounded">npx prisma migrate dev</code>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-900 mb-2">
              📋 Как проверить в Supabase Dashboard:
            </h2>
            <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
              <li>
                Зайди на{' '}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://supabase.com/dashboard
                </a>
              </li>
              <li>Выбери проект: <strong>lqgurdhcxzjchudxuuts</strong></li>
              <li>
                Перейди в <strong>Table Editor</strong> (левый сайдбар)
              </li>
              <li>
                Убедись, что таблица <code className="bg-gray-200 px-1 rounded">Story</code> существует
              </li>
              <li>
                Перейди в <strong>Project Settings → API</strong>
              </li>
              <li>
                Проверь, что <strong>Project URL</strong> и <strong>anon public</strong> ключ совпадают
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

