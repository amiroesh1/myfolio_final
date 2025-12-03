'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/supabase/test-connection');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Connection failed');
      }

      setResult(
        `✅ Success!\n\n${JSON.stringify(data, null, 2)}`,
      );
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Setup Guide</h1>

        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Шаг 1: Создай .env файл
            </h2>
            <p className="text-sm text-yellow-800 mb-3">
              В корне проекта создай файл <code className="bg-yellow-100 px-1 rounded">.env</code>
            </p>
            <div className="bg-yellow-100 rounded p-3 text-sm font-mono">
              <div>DATABASE_URL="postgresql://postgres:[PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres"</div>
            </div>
            <p className="text-sm text-yellow-800 mt-3">
              <strong>Как получить connection string:</strong>
            </p>
            <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1 mt-2">
              <li>Зайди на https://supabase.com/dashboard</li>
              <li>Выбери проект: lqgurdhcxzjchudxuuts</li>
              <li>Project Settings → Database</li>
              <li>Connection string → URI (НЕ connection pooling!)</li>
              <li>Скопируй и вставь в .env файл</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">
              📋 Шаг 2: Запусти миграции
            </h2>
            <p className="text-sm text-blue-800 mb-2">
              После создания .env файла выполни в терминале:
            </p>
            <div className="bg-blue-100 rounded p-3 text-sm font-mono space-y-1">
              <div>npx prisma generate</div>
              <div>npx prisma migrate dev --name init</div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="font-semibold text-green-900 mb-2">
              ✅ Шаг 3: Проверь подключение
            </h2>
            <button
              onClick={testConnection}
              disabled={loading}
              className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Test Database Connection'}
            </button>

            {result && (
              <div className="mt-4 p-4 bg-white border border-green-200 rounded-md">
                <pre className="text-sm text-green-800 whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-white border border-red-200 rounded-md">
                <p className="text-sm text-red-800 font-semibold mb-2">
                  ❌ Connection Failed
                </p>
                <p className="text-sm text-red-700">{error}</p>
                <div className="mt-3 text-sm text-red-700">
                  <p><strong>Возможные причины:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Файл .env не создан или DATABASE_URL отсутствует</li>
                    <li>Неправильный пароль в connection string</li>
                    <li>Миграции не запущены (таблица Story не создана)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h2 className="font-semibold text-purple-900 mb-2">
              🚀 Шаг 4: Добавь историю
            </h2>
            <p className="text-sm text-purple-800 mb-3">
              После успешной проверки подключения:
            </p>
            <div className="space-y-2">
              <a
                href="/admin/stories/add-to-supabase"
                className="inline-flex items-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700"
              >
                Add Story to Supabase
              </a>
              <p className="text-xs text-purple-700">
                Или запусти: <code className="bg-purple-100 px-1 rounded">npx prisma db seed</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

