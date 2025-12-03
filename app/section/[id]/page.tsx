'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Story, StorySection } from '../../components/StoryCard';

type FullStory = Story & {
  sections: StorySection[];
};

export default function StoryDetailPage() {
  const params = useParams<{ id: string }>();
  const [story, setStory] = useState<FullStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/stories/${params.id}`);
        if (!res.ok) {
          throw new Error('Story not found');
        }
        const data = await res.json();
        
        // Обработка sections если они приходят как JSON строка
        if (data.sections && typeof data.sections === 'string') {
          try {
            data.sections = JSON.parse(data.sections);
          } catch (e) {
            console.error('Failed to parse sections', e);
            data.sections = [];
          }
        }
        
        // Убеждаемся, что sections это массив
        if (!Array.isArray(data.sections)) {
          data.sections = [];
        }
        
        setStory(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [story]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading story…</p>
      </main>
    );
  }

  if (error || !story) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <p className="text-sm text-gray-600 mb-4">
          {error || 'Story could not be found.'}
        </p>
        <Link
          href="/section"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to all stories
        </Link>
      </main>
    );
  }

  const storyDate = new Date(story.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/section"
            className="text-sm text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to all stories
          </Link>
        </div>

        {/* Title and Hero Image */}
        <header className="grid md:grid-cols-[1.8fr,1.2fr] gap-8 mb-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Student story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {story.summary && story.summary.length < 100
                ? story.summary
                : story.sections && story.sections.length > 0 && story.sections[0].title
                ? story.sections[0].title
                : story.summary
                ? story.summary.slice(0, 100) + '...'
                : `${story.name || 'Student'}'s Journey`}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-lg font-bold shadow-sm">
                {story.name?.[0] || 'A'}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {story.name || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-500">{storyDate}</p>
              </div>
            </div>
            {story.summary && (
              <p className="text-base text-gray-700 leading-relaxed">
                {story.summary}
              </p>
            )}
          </div>

          {/* Hero Image */}
          {(story as any).coverImage || (story.sections && story.sections.length > 0 && story.sections[0].imageUrl) ? (
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={(story as any).coverImage || story.sections[0].imageUrl}
                alt={story.name || 'Story cover'}
                fill
                className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {story.name?.[0]?.toUpperCase() || 'S'}
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Student Story
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Main Content with Sidebar */}
        <div className="grid lg:grid-cols-[280px,1fr] gap-10">
          {/* Left Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {story.sections?.map((section, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    activeSection === index
                      ? 'bg-[#4F46E5] text-white shadow-lg border-l-4 border-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {section.title || `Section ${index + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="space-y-12">
            {story.sections?.map((section, index) => (
              <section
                key={index}
                id={`section-${index}`}
                className="scroll-mt-24 space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {section.title || `Section ${index + 1}`}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
                {section.imageUrl && (
                  <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100 mt-6 shadow-lg group">
                    <Image
                      src={section.imageUrl}
                      alt={section.title || 'Story section image'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
