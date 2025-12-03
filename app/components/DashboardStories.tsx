'use client';

import { useEffect, useMemo, useState } from 'react';
import { Story, StoryCard } from './StoryCard';

export default function DashboardStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories?status=APPROVED&limit=30');
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

  const filtered = useMemo(() => {
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
      return q ? haystack.toLowerCase().includes(q) : true;
    });
  }, [stories, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[#1E293B]">
            Student Stories
          </h2>
          <p className="text-xs text-gray-500">
            Browse real stories from students who got into top universities.
          </p>
        </div>
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or keywords…"
            className="border rounded-md px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading stories…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          No stories match your search yet. Try a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}


