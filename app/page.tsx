import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-[56px] leading-[1.2] font-bold mb-8">
            <div className="text-[#1E293B]">Craft Your Perfect</div>
            <div className="text-[#4F46E5]">College Portfolio</div>
          </h1>
          
          <p className="text-xl text-[#475569] max-w-2xl mb-12">
            AI-powered guidance to help students showcase their achievements, explore 
            extracurriculars, and optimize applications for top universities.
          </p>

          <Link
            href="/features"
            className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300"
          >
            Start Now – It's Free
          </Link>

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