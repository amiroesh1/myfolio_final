'use client';

import Link from 'next/link';
import Image from 'next/image';

export type StoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type StorySection = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

export type Story = {
  id: string;
  name: string;
  date: string;
  link?: string | null;
  summary?: string | null;
  sections?: StorySection[];
  status: StoryStatus;
  createdAt: string;
  coverImage?: string | null;
};

type StoryCardProps = {
  story: Story;
  compact?: boolean;
};

export function StoryCard({ story, compact = false }: StoryCardProps) {
  const dateLabel = new Date(story.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Обработка sections если они еще не распарсены
  let sections = story.sections;
  if (sections && typeof sections === 'string') {
    try {
      sections = JSON.parse(sections);
    } catch {
      sections = [];
    }
  }
  if (!Array.isArray(sections)) {
    sections = [];
  }

  // Получаем изображение - из coverImage или из первой секции
  const coverImage = story.coverImage || (sections && sections.length > 0 && sections[0]?.imageUrl) || null;

  const previewText =
    story.summary ||
    (sections && sections.length > 0 && sections[0]?.content) ||
    '';

  return (
    <Link href={`/section/${story.id}`}>
      <article className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full cursor-pointer">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={coverImage}
              alt={story.name || 'Story cover'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-bold text-white text-base drop-shadow-lg">
                {story.name && story.name.trim().length > 0 ? story.name : 'Anonymous'}
              </h3>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {!coverImage && (
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-900">
                {story.name && story.name.trim().length > 0 ? story.name : 'Anonymous'}
              </h3>
            </div>
          )}

          <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
            {dateLabel}
          </p>

          <p
            className={`text-sm text-gray-600 mb-4 leading-relaxed flex-1 ${
              compact ? 'line-clamp-3' : 'line-clamp-4'
            }`}
          >
            {previewText}
          </p>

          {/* Read more indicator */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
              Read story →
            </span>
            {story.link && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(story.link!, '_blank');
                }}
                className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
              >
                🔗 Link
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
      </article>
    </Link>
  );
}


