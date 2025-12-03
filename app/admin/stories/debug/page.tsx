'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function StoriesDebugPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories/debug');
        const data = await res.json();
        setStories(data.stories || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load stories');
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <SignedOut>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-4">You must be signed in to view debug info.</p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Debug: All Stories in Database</h1>
            <a
              href="/admin/stories"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to moderation
            </a>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {error}</p>
          ) : stories.length === 0 ? (
            <p className="text-sm text-gray-500">No stories found in database.</p>
          ) : (
            <div className="space-y-6">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="border rounded-lg p-6 bg-gray-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      История #{index + 1}: {story.name || 'Anonymous'}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        story.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : story.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {story.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>ID:</strong> {story.id}
                    </div>
                    <div>
                      <strong>Дата:</strong>{' '}
                      {new Date(story.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Создано:</strong>{' '}
                      {new Date(story.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>Обновлено:</strong>{' '}
                      {new Date(story.updatedAt).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <strong className="block mb-1">Summary:</strong>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                      {story.summary || '(пусто)'}
                    </p>
                  </div>

                  <div>
                    <strong className="block mb-1">
                      Sections ({Array.isArray(story.sections) ? story.sections.length : 0}):
                    </strong>
                    <div className="space-y-3">
                      {Array.isArray(story.sections) && story.sections.length > 0 ? (
                        story.sections.map((section: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded border space-y-2"
                          >
                            <div className="font-semibold text-sm">
                              Секция {idx + 1}: {section.title || '(без названия)'}
                            </div>
                            <div className="text-sm text-gray-700 whitespace-pre-line border-t pt-2">
                              {section.content || '(пусто)'}
                            </div>
                            {section.imageUrl && (
                              <div className="text-xs text-blue-600">
                                Image URL: {section.imageUrl}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          (нет секций или sections не является массивом)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <a
                      href={`/section/${story.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Посмотреть на сайте →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SignedIn>
    </div>
  );
}

