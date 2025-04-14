'use client';

import React from 'react';
import ExtracurricularDatabase from '../components/ExtracurricularDatabase';

export default function Features() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-[#1E293B] mb-4 sm:mb-6">
            MyFolio Features
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#475569] text-center mb-8 sm:mb-16 px-4">
            Discover opportunities to enhance your college application — explore curated programs, competitions, internships designed to boost your profile.
          </p>

          {/* Extracurricular Database Section */}
          <section className="mt-8 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6 sm:mb-8 text-center">
              Browse Opportunities
            </h2>
            <ExtracurricularDatabase />
          </section>
        </div>
      </div>
    </main>
  );
}
