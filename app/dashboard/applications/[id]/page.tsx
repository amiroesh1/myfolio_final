'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { APPLICATION_PROFILES } from '../../../components/applicationData';

const SECTIONS = [
  { id: 'demographics', label: 'Demographics', icon: '👤' },
  { id: 'academics', label: 'Academics + Test Scores', icon: '📚' },
  { id: 'ap-ib', label: 'AP/IB Exam Scores', icon: '📝' },
  { id: 'extracurriculars', label: 'Extracurriculars', icon: '🏆' },
  { id: 'awards', label: 'Awards & Honors', icon: '🎖️' },
  { id: 'decisions', label: 'College Decisions', icon: '🎓' },
  { id: 'recommendation', label: 'Recommendation Letter', icon: '✉️' },
];

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('demographics');
  const profile = APPLICATION_PROFILES.find((p) => p.id === params.id);

  const sections = useMemo(() => {
    if (!profile) return [];
    const s = [
      { id: 'demographics', label: 'Demographics', icon: '👤' },
      { id: 'academics', label: 'Academics + Test Scores', icon: '📚' },
    ];
    if ((profile.apScores && profile.apScores.length > 0) || (profile.ibScores && profile.ibScores.length > 0)) {
      s.push({ id: 'ap-ib', label: 'AP/IB Exam Scores', icon: '📝' });
    }
    if (profile.extracurriculars && profile.extracurriculars.length > 0) {
      s.push({ id: 'extracurriculars', label: 'Extracurriculars', icon: '🏆' });
    }
    if (profile.awards && profile.awards.length > 0) {
      s.push({ id: 'awards', label: 'Awards & Honors', icon: '🎖️' });
    }
    if (profile.collegeDecisions && profile.collegeDecisions.length > 0) {
      s.push({ id: 'decisions', label: 'College Decisions', icon: '🎓' });
    }
    if (profile.recommendationLetter?.content) {
      s.push({ id: 'recommendation', label: 'Recommendation Letter', icon: '✉️' });
    }
    return s;
  }, [profile]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <p className="text-sm text-gray-600 mb-4">
          Application profile could not be found.
        </p>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to applications
        </button>
      </main>
    );
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.3 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(to right, rgb(235, 240, 255), rgb(233, 244, 255), rgb(230, 247, 252))',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {profile.title}
              </h1>
              <p className="text-base text-gray-600 max-w-3xl">
                View this student's application. Find out about their demographics,
                Test Scores, Recommendation Letters, Extracurriculars, Awards, and
                more!
              </p>
            </div>
            <Link
              href="/dashboard?tab=applications"
              className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-sm font-semibold text-[#4F46E5] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center"
            >
              ← Back to Applications
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    activeSection === section.id
                      ? 'bg-[#4F46E5] text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Demographics */}
            <section
              id="demographics"
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Demographics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">Gender</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {profile.gender}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">Ethnicity</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {profile.ethnicity}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {profile.location}
                  </div>
                </div>
                {profile.highSchool && (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xs text-gray-600 mb-1">High School</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {profile.highSchool}
                    </div>
                  </div>
                )}
                {profile.incomeBracket && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xs text-gray-600 mb-1">Income Bracket</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {profile.incomeBracket}
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">High School</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {profile.highSchool || profile.schoolType}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">Hooks</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {profile.hooks || 'None'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-4 col-span-2 md:col-span-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs text-gray-600 mb-1">Intended Major</div>
                  <div className="text-xl font-bold text-gray-900">
                    {profile.intendedMajor}
                  </div>
                </div>
                {profile.program && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl p-4 col-span-2 md:col-span-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xs text-gray-600 mb-1">Program</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {profile.program}
                    </div>
                  </div>
                )}
                {(profile.submission || profile.conditions) && (
                  <div className="bg-gradient-to-br from-green-50 to-blue-100 rounded-xl p-4 col-span-2 md:col-span-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xs text-gray-600 mb-1">Admission / Offer</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {[profile.submission, profile.conditions].filter(Boolean).join(' • ')}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Academics + Test Scores */}
            <section
              id="academics"
              className="bg-[#d7e5ff] rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Academics + Test Scores
              </h2>

              {profile.seniorYearCourses && profile.seniorYearCourses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    Senior Year Courseload
                    <span className="text-xs text-gray-500">ℹ️</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.seniorYearCourses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-800 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-xs text-gray-500 mb-1">GPA ({profile.gpaType === 'unweighted' ? 'UW' : 'W'})</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {profile.gpaType === 'unweighted' && profile.gpa <= 4.0
                      ? profile.gpa.toFixed(2)
                      : profile.gpa.toFixed(0)}
                  </div>
                </div>
                {profile.satScore && (
                  <div className="bg-white rounded-xl p-4 shadow-sm text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-xs text-gray-500 mb-1">SAT Score</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {profile.satScore}
                    </div>
                    {profile.satMath && profile.satReading && (
                      <div className="text-xs text-gray-600 mt-1">
                        M:{profile.satMath} R:{profile.satReading}
                      </div>
                    )}
                  </div>
                )}
                {profile.ieltsScore && (
                  <div className="bg-white rounded-xl p-4 shadow-sm text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-xs text-gray-500 mb-1">IELTS</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {profile.ieltsScore}
                    </div>
                    {(profile.ieltsReading ||
                      profile.ieltsListening ||
                      profile.ieltsSpeaking ||
                      profile.ieltsWriting) && (
                      <div className="text-xs text-gray-600 mt-1">
                        R:{profile.ieltsReading ?? '-'} L:{profile.ieltsListening ?? '-'} S:{profile.ieltsSpeaking ?? '-'} W:{profile.ieltsWriting ?? '-'}
                      </div>
                    )}
                  </div>
                )}
                {profile.actScore && (
                  <div className="bg-white rounded-xl p-4 shadow-sm text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-xs text-gray-500 mb-1">ACT Score</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {profile.actScore}
                    </div>
                  </div>
                )}
                <div className="bg-white rounded-xl p-4 shadow-sm text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-xs text-gray-500 mb-1">Class Rank</div>
                  <div className="text-3xl font-bold text-gray-900">#1</div>
                </div>
              </div>

              {profile.dualEnrollment && profile.dualEnrollment.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Dual Enrollment
                  </h3>
                  <div className="space-y-2">
                    {profile.dualEnrollment.map((de, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {de.course}
                        </div>
                        <div className="text-xs text-gray-600">
                          {de.institution} — Grade: {de.grade}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* AP/IB Exam Scores */}
            {((profile.apScores && profile.apScores.length > 0) || profile.ibScores) && (
              <section
                id="ap-ib"
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  AP/IB Exam Scores
                </h2>

                {profile.apScores && profile.apScores.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AP Scores</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {profile.apScores.map((ap, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg ${
                            ap.score === 5
                              ? 'bg-green-50 border-2 border-green-200'
                              : ap.score === 4
                              ? 'bg-yellow-50 border-2 border-yellow-200'
                              : ap.score === 3
                              ? 'bg-orange-50 border-2 border-orange-200'
                              : 'bg-red-50 border-2 border-red-200'
                          }`}
                        >
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {ap.score}
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {ap.subject}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.ibScores && profile.ibScores.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">IB Scores</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {profile.ibScores.map((ib, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {ib.score}
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {ib.subject}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    AP Scores Information
                  </h4>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-200 border-2 border-green-400 flex items-center justify-center font-bold">
                        5
                      </div>
                      <span>Receives college credit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-200 border-2 border-yellow-400 flex items-center justify-center font-bold">
                        4
                      </div>
                      <span>Eligible for credit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-200 border-2 border-orange-400 flex items-center justify-center font-bold">
                        3
                      </div>
                      <span>Eligible for credit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-200 border-2 border-red-400 flex items-center justify-center font-bold">
                        2
                      </div>
                      <span>No college credit</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Extracurriculars */}
            <section
              id="extracurriculars"
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Extracurriculars
                <span className="text-sm text-gray-500">ℹ️</span>
              </h2>

              <div className="space-y-4">
                {profile.extracurriculars.map((ec, idx) => {
                  const isTopThree = ec.rank && ec.rank <= 3;
                  const crownColors = [
                    'text-yellow-500',
                    'text-blue-500',
                    'text-gray-700',
                  ];

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                        isTopThree
                          ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isTopThree && (
                          <div className="flex-shrink-0">
                            <div
                              className={`text-2xl ${crownColors[ec.rank! - 1]}`}
                            >
                              👑
                            </div>
                            <div className="text-xs font-bold text-gray-600 text-center mt-1">
                              #{ec.rank}
                            </div>
                          </div>
                        )}
                        {!isTopThree && (
                          <div className="flex-shrink-0 text-lg font-bold text-gray-400">
                            #{idx + 1}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {ec.title}
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed mb-2">
                            {ec.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            {ec.years}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Awards */}
            {profile.awards.length > 0 && (
              <section
                id="awards"
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Awards & Honors
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {profile.awards.map((award, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {award}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* College Decisions */}
            <section
              id="decisions"
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                College Decision Results
              </h2>
              <div className="space-y-3">
                {profile.collegeDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      decision.attending
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md'
                        : decision.result === 'Admitted'
                        ? 'bg-blue-50 border-blue-200'
                        : decision.result === 'Waitlisted'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {decision.school}
                        </div>
                        <div className="text-sm text-gray-600">
                          {decision.decisionType}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            decision.attending
                              ? 'bg-green-500 text-white'
                              : decision.result === 'Admitted'
                              ? 'bg-blue-500 text-white'
                              : decision.result === 'Waitlisted'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-400 text-white'
                          }`}
                        >
                          {decision.result}
                          {decision.attending && ' — Attending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendation Letter */}
            <section
              id="recommendation"
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recommendation Letter
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {profile.recommendationLetter.author}
                  </div>
                  <div className="text-xs text-gray-600">
                    {profile.recommendationLetter.role}
                  </div>
                </div>
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {profile.recommendationLetter.content}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
