'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useUser, SignIn } from '@clerk/nextjs';
import ExtracurricularDatabase from '../components/ExtracurricularDatabase';
import ApplicationProfiles from '../components/ApplicationProfiles';
import DashboardStories from '../components/DashboardStories';

export default function Dashboard() {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    'database' | 'applications' | 'stories' | 'submit'
  >('database');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['database', 'applications', 'stories', 'submit'].includes(tab)) {
      setActiveTab(tab as typeof activeTab);
    }
  }, [searchParams]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'applications':
        return <ApplicationProfiles />;
      case 'stories':
        return <DashboardStories />;
      case 'submit':
        return (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#1E293B]">
              Share Your Story
            </h2>
            
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

            <p className="text-[#475569]">
              Read real journeys from students around the world and share your own
              story. See how others built their extracurricular profiles and what
              helped them stand out in college admissions.
            </p>
            <div className="space-y-3 text-sm text-[#64748B]">
              <p className="font-medium">What's coming:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Easy story sharing</li>
                <li>Real-time updates</li>
                <li>Better image handling</li>
                <li>Enhanced experience</li>
              </ul>
            </div>
          </div>
        );
      case 'database':
      default:
        return <ExtracurricularDatabase />;
    }
  };

  // Если не залогинен, показываем только форму входа
  if (!isSignedIn) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background:
            'linear-gradient(to right, rgb(235, 240, 255), rgb(233, 244, 255), rgb(230, 247, 252))',
        }}
      >
        <div className="bg-white/90 p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Please Sign In to Access Your Dashboard
          </h2>
          <SignIn redirectUrl="/dashboard" />
        </div>
      </main>
    );
  }

  // Показываем dashboard только для залогиненных пользователей
  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          'linear-gradient(to right, rgb(235, 240, 255), rgb(233, 244, 255), rgb(230, 247, 252))',
      }}
    >
      <div className="transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B]">
                  MyFolio Dashboard
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Your space to explore extracurriculars, get AI suggestions, and share your story.
                </p>
              </div>
              <Link
                href="/about"
                className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-full bg-white/80 hover:bg-white text-[#4F46E5] text-sm font-semibold shadow-sm hover:shadow-md transition-colors transition-shadow duration-200"
              >
                Back to MyFolio
              </Link>
            </div>

            {/* Dashboard tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('database')}
                className={`px-4 py-2 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  activeTab === 'database'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } shadow`}
              >
                Extracurricular Database
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  activeTab === 'applications'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } shadow`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`px-4 py-2 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  activeTab === 'stories'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } shadow`}
              >
                Stories
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-4 py-2 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  activeTab === 'submit'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } shadow`}
              >
                Share Your Story
              </button>
            </div>
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </main>
  );
}


