'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { Story, StoryCard } from '../components/StoryCard';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Form removed - coming soon

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories?status=APPROVED&limit=12');
        const data = await res.json();
        
        // Обработка sections для каждой истории
        const storiesWithParsedSections = data.map((story: Story) => {
          let sections = story.sections;
          if (typeof sections === 'string') {
            try {
              sections = JSON.parse(sections);
            } catch {
              sections = [];
            }
          }
          if (!Array.isArray(sections)) {
            sections = [];
          }
          return {
            ...story,
            sections,
          };
        });
        
        setStories(storiesWithParsedSections);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Form handlers removed - coming soon with Supabase

  const filteredStories = useMemo(() => {
    const q = search.toLowerCase().trim();
    return stories.filter((story) => {
      const haystack =
        (story.name || '') +
        ' ' +
        (story.summary || '') +
        ' ' +
        (story.sections || [])
          .map((s) => `${s.title} ${s.content}`)
          .join(' ');
      const matchesSearch = q
        ? haystack.toLowerCase().includes(q)
        : true;
      return matchesSearch;
    });
  }, [stories, search]);

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <section>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Student Stories
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Read real experiences from students who built standout extracurricular
            profiles. Share your own journey to help others navigate their path.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 border rounded-lg p-6 shadow-sm bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Share Your Story</h2>
            
            {/* Coming Soon Banner */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🚀</span>
                <h3 className="text-xl font-bold">Coming Soon</h3>
              </div>
              <p className="text-purple-50 text-sm mb-3">
                We're working on a new feature that will allow you to share your student journey and help others.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="font-medium">What's coming:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Easy story sharing</li>
                <li>Real-time updates</li>
                <li>Better image handling</li>
                <li>Enhanced experience</li>
              </ul>
            </div>

          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Latest Stories
                </h2>
                <p className="text-xs text-gray-500">
                  Search by name or keywords from different sections.
                </p>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or section titles and keywords…"
                  className="border rounded-md px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-gray-500">Loading stories…</p>
            ) : filteredStories.length === 0 ? (
              <p className="text-sm text-gray-500">
                No stories match your filters yet. Try a different category or
                keyword.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


