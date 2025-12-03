'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { toast, Toaster } from 'react-hot-toast';

type StoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type StorySection = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

type Story = {
  id: string;
  name: string;
  date: string;
  link?: string | null;
  summary?: string | null;
  sections?: StorySection[];
  status: StoryStatus;
  createdAt: string;
};

type EditableStory = Story & {
  editedSummary: string;
  editedSections: StorySection[];
  editedCoverImage?: string | null;
};

export default function AdminStoriesPage() {
  const { user, isLoaded } = useUser();
  const [stories, setStories] = useState<EditableStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Проверка прав админа (можно настроить через Clerk metadata или env)
      // Временно разрешаем всем залогиненным, но можно добавить проверку
      setIsAdmin(true);
    }
  }, [isLoaded, user]);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stories?status=PENDING&limit=100');
      const data = await res.json();
      const editableStories: EditableStory[] = data.map((story: Story) => {
        // Обработка sections - могут быть массивом или JSON строкой
        let sections: StorySection[] = [];
        if (story.sections) {
          if (Array.isArray(story.sections)) {
            sections = story.sections;
          } else if (typeof story.sections === 'string') {
            try {
              sections = JSON.parse(story.sections);
            } catch {
              sections = [];
            }
          } else {
            sections = story.sections as StorySection[];
          }
        }
        
        return {
          ...story,
          editedSummary: story.summary || '',
          editedSections: sections,
          editedCoverImage: (story as any).coverImage || null,
        };
      });
      setStories(editableStories);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const updateStoryContent = (id: string, field: 'editedSummary' | 'editedSections' | 'editedCoverImage', value: any) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, [field]: value } : story
      )
    );
  };

  const updateSectionContent = (
    storyId: string,
    sectionIndex: number,
    field: keyof StorySection,
    value: string
  ) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== storyId) return story;
        const newSections = [...story.editedSections];
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          [field]: value,
        };
        return { ...story, editedSections: newSections };
      })
    );
  };

  const updateStatus = async (story: EditableStory, status: StoryStatus) => {
    try {
      const res = await fetch(`/api/stories/${story.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          summary: story.editedSummary || null,
          sections: story.editedSections,
          coverImage: story.editedCoverImage || null,
        }),
      });
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        const errorMsg = data.error || `HTTP ${res.status}: Failed to update status`;
        console.error('❌ API Error:', { status: res.status, error: data });
        throw new Error(errorMsg);
      }
      
      toast.success(`✅ Story ${status.toLowerCase()} successfully!`);
      setStories((prev) => prev.filter((s) => s.id !== story.id));
    } catch (e: any) {
      console.error('❌ Update error:', e);
      const errorMsg = e.message || 'Failed to update status';
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Stories moderation</h1>
          <p className="text-sm text-gray-600">
            📍 <strong>Где посмотреть:</strong> Здесь отображаются все истории со статусом <code className="bg-yellow-100 px-1 rounded">PENDING</code>. 
            Нажмите кнопку <strong>"✅ Approve"</strong> чтобы одобрить и опубликовать историю на сайте.
          </p>
        </div>

        <SignedOut>
          <p className="text-gray-600 mb-4">
            You must be signed in as an admin to review and moderate stories.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              Pending stories are shown below. Approve to publish or reject to
              hide them from the public site.
            </p>
            <div className="flex gap-3">
              <a
                href="/admin/stories/debug"
                className="text-sm text-blue-600 hover:underline"
              >
                View all stories (debug)
              </a>
              <button
                onClick={fetchPending}
                className="text-sm text-blue-600 hover:underline"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading pending stories…</p>
          ) : stories.length === 0 ? (
            <p className="text-sm text-gray-500">No pending stories right now.</p>
          ) : (
            <div className="space-y-6">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="border rounded-lg p-6 bg-gray-50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-base">
                        {story.name || 'Anonymous'}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {new Date(story.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-yellow-800">
                      {story.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Summary (отображается в карточке)
                      </label>
                      <textarea
                        value={story.editedSummary}
                        onChange={(e) =>
                          updateStoryContent(story.id, 'editedSummary', e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        rows={3}
                        placeholder="Краткое описание истории..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Cover Image URL (обложка истории)
                      </label>
                      <input
                        type="url"
                        value={story.editedCoverImage || ''}
                        onChange={(e) =>
                          updateStoryContent(story.id, 'editedCoverImage', e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder="https://example.com/image.jpg"
                      />
                      {story.editedCoverImage && (
                        <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border">
                          <img
                            src={story.editedCoverImage}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Sections (полный контент истории)
                      </label>
                      <div className="space-y-3">
                        {story.editedSections.map((section, idx) => (
                          <div
                            key={idx}
                            className="border rounded-md p-3 bg-white space-y-2"
                          >
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) =>
                                updateSectionContent(
                                  story.id,
                                  idx,
                                  'title',
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-sm font-medium border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Название секции"
                            />
                            <textarea
                              value={section.content}
                              onChange={(e) =>
                                updateSectionContent(
                                  story.id,
                                  idx,
                                  'content',
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={6}
                              placeholder="Содержание секции..."
                            />
                            <input
                              type="text"
                              value={section.imageUrl || ''}
                              onChange={(e) =>
                                updateSectionContent(
                                  story.id,
                                  idx,
                                  'imageUrl',
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="URL изображения (опционально)"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {story.link && (
                    <a
                      href={story.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-blue-600 hover:underline block"
                    >
                      View related link
                    </a>
                  )}

                  {/* ⚠️ ВНИМАНИЕ: ВОТ ЗДЕСЬ ДЕЛАЕТСЯ APPROVE! ⚠️
                      Нажмите кнопку "Approve" чтобы одобрить историю и сделать её видимой на сайте */}
                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => updateStatus(story, 'APPROVED')}
                      className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
                    >
                      ✅ Approve (Одобрить)
                    </button>
                    <button
                      onClick={() => updateStatus(story, 'REJECTED')}
                      className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                    >
                      ❌ Reject (Отклонить)
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SignedIn>
      </main>
    </div>
  );
}


