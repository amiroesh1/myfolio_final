'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-[56px] leading-[1.2] font-bold mb-8">
            <div className="text-[#1E293B]">Craft Your Perfect</div>
            <div className="text-[#4F46E5]">College Portfolio</div>
          </h1>
          
          <p className="text-xl text-[#475569] max-w-2xl mb-6">
            Discover real student stories, explore extracurricular opportunities, 
            and build your standout application with MyFolio.
          </p>
          
          <p className="text-base text-[#64748B] max-w-xl mb-12">
            Browse verified extracurriculars, read authentic student journeys, 
            and compare your profile with successful applicants at top universities.
          </p>

          <div className="max-w-2xl mb-12">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-[#1E293B] mb-1">Student Stories</h3>
                <p className="text-sm text-[#64748B]">
                  Read authentic journeys from students who got into top universities
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-[#1E293B] mb-1">Extracurriculars</h3>
                <p className="text-sm text-[#64748B]">
                  Explore opportunities and activities to boost your profile
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-[#1E293B] mb-1">Applications</h3>
                <p className="text-sm text-[#64748B]">
                  Compare profiles and see what made successful applicants stand out
                </p>
              </div>
            </div>
          </div>

          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Start Now – It's Free
            </Link>
          )}

          <div className="mt-8 space-y-2">
            <p className="text-[#64748B] text-sm">No credit card required</p>
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-[#E2E8F0] border-2 border-white" />
                ))}
              </div>
              <span className="text-[#64748B] text-sm">
                Joined by 10,000+ students worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 