'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  APPLICATION_PROFILES,
  ApplicationProfile,
} from './applicationData';

export default function ApplicationProfiles() {
  const [schoolType, setSchoolType] = useState<string>('All');
  const [major, setMajor] = useState<string>('All');
  const [scoreRange, setScoreRange] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const majors = Array.from(
    new Set(APPLICATION_PROFILES.map((p) => p.intendedMajor)),
  ).sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return APPLICATION_PROFILES.filter((p) => {
      const matchesSchool =
        schoolType === 'All' || p.schoolType === schoolType;

      const matchesMajor =
        major === 'All' || p.intendedMajor === major;

      let matchesScore = true;
      if (scoreRange !== 'All' && p.satScore) {
        if (scoreRange === '1500+') {
          matchesScore = p.satScore >= 1500;
        } else if (scoreRange === '<1500') {
          matchesScore = p.satScore < 1500;
        }
      }

      const haystack = [
        p.title,
        p.fullName,
        p.intendedMajor,
        p.location,
        p.highSchool,
        p.program,
        p.submission,
        p.conditions,
        p.extracurriculars.map((e) => e.title).join(' '),
        p.awards.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = q ? haystack.includes(q) : true;

      return matchesSchool && matchesMajor && matchesScore && matchesSearch;
    });
  }, [schoolType, major, scoreRange, search]);

  return (
    <div className="space-y-6">
      {/* Filters bar */}
      <div className="bg-white/80 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Search
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, major, location, award..."
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Filter by School Type
          </label>
          <select
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Filter by Intended Major
          </label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All</option>
            {majors.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            SAT Score
          </label>
          <select
            value={scoreRange}
            onChange={(e) => setScoreRange(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All</option>
            <option value="1500+">1500+</option>
            <option value="<1500">&lt;1500</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Showing {filtered.length} application profiles
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((profile) => {
          const attending = profile.collegeDecisions.find((d) => d.attending)?.school;

          return (
            <Link
              key={profile.id}
              href={`/dashboard/applications/${profile.id}`}
              className="block"
            >
              <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow transition-transform duration-200 hover:-translate-y-1 p-5 md:p-6 cursor-pointer h-full">
                <header className="mb-3">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                    {profile.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Major:{' '}
                    <span className="text-indigo-600 font-semibold">
                      {profile.intendedMajor}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold text-gray-900">
                      {profile.highSchool || '—'}
                    </span>
                    {' • '}
                    <span className="font-semibold text-gray-900">
                      {profile.location}
                    </span>
                  </p>
                  {attending && (
                    <p className="text-sm text-emerald-700 font-semibold mt-1">
                      Final choice: {attending}
                    </p>
                  )}
                </header>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.highSchool && (
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                      {profile.highSchool}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">
                    {profile.location}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                    {profile.gender}
                  </span>
                </div>

                <div className="grid md:grid-cols-[2fr,1.3fr] gap-4 items-start">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {profile.extracurriculars[0]?.description || profile.extracurriculars[0]?.title || 'Strong extracurricular profile'}
                  </p>

                  <div className="bg-indigo-50 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-800">
                    <div>
                      <div className="font-semibold text-gray-700">GPA</div>
                      <div className="text-lg font-bold">
                        {profile.gpaType === 'unweighted' && profile.gpa <= 4.0
                          ? profile.gpa.toFixed(2)
                          : profile.gpa.toFixed(0)}
                      </div>
                    </div>
                    {profile.satScore && (
                      <div>
                        <div className="font-semibold text-gray-700">SAT</div>
                        <div className="text-lg font-bold">{profile.satScore}</div>
                      </div>
                    )}
                    {profile.apScores && profile.apScores.length > 0 && (
                      <div>
                        <div className="font-semibold text-gray-700">AP Exams</div>
                        <div className="text-lg font-bold">{profile.apScores.length}</div>
                      </div>
                    )}
                    {profile.ibScores && profile.ibScores.length > 0 && (
                      <div>
                        <div className="font-semibold text-gray-700">IB Exams</div>
                        <div className="text-lg font-bold">{profile.ibScores.length}</div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">
            No profiles match your filters yet. Try adjusting the filters.
          </p>
        )}
      </div>
    </div>
  );
}


