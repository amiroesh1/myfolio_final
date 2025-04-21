'use client';

import React from 'react';
import { useUser, SignIn } from '@clerk/nextjs';
import ExtracurricularDatabase from '../components/ExtracurricularDatabase';

export default function Features() {
  const { isSignedIn } = useUser();

  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))',
      }}
    >
      {/* Контент страницы */}
      <div className={`transition-all duration-300 ${!isSignedIn ? 'blur-md brightness-50' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-[#1E293B] mb-4 sm:mb-6">
              MyFolio Features
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#475569] text-center mb-8 sm:mb-16 px-4">
              Discover opportunities to enhance your college application — explore curated programs, competitions, internships designed to boost your profile.
            </p>

            <section className="mt-8 sm:mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6 sm:mb-8 text-center">
                Browse Opportunities
              </h2>
              <ExtracurricularDatabase />
            </section>
          </div>
        </div>
      </div>

      {/* Ограниченная форма логина — теперь не закрывает навбар */}
      {!isSignedIn && (
        <div className="fixed top-40 left-0 w-full z-40 flex items-center justify-center">
          <div className="bg-white/90 p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Please Sign In to Access Features
            </h2>
            <SignIn redirectUrl="/features" />
          </div>
        </div>
      )}
    </main>
  );
}
