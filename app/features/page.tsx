'use client';

import React, { useState } from 'react';
import { useUser, SignIn } from '@clerk/nextjs';
import ExtracurricularDatabase from '../components/ExtracurricularDatabase';
import CompareProfile from '../components/CompareProfile';
import AIPoweredExtracurricularFinder from '../components/AIPoweredExtracurricularFinder';
import AIChat from '../components/AIChat';

export default function Features() {
  const { isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState('extracurricular');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'mentor':
        return <AIChat />;
      case 'compare':
        return <CompareProfile />;
      case 'finder':
        return <AIPoweredExtracurricularFinder />;
      case 'extracurricular':
      default:
        return <ExtracurricularDatabase />;
    }
  };

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: 'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))',
      }}
    >
      <div className={`transition-all duration-300 ${!isSignedIn ? 'blur-md brightness-50' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-[#1E293B] mb-6">
              MyFolio Features
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button onClick={() => setActiveTab('extracurricular')} className={`px-4 py-2 rounded-full ${activeTab === 'extracurricular' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} shadow`}>
                Extracurricular Database
              </button>
              <button onClick={() => setActiveTab('compare')} className={`px-4 py-2 rounded-full ${activeTab === 'compare' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} shadow`}>
                Compare Profile
              </button>
              <button onClick={() => setActiveTab('finder')} className={`px-4 py-2 rounded-full ${activeTab === 'finder' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} shadow`}>
                AI-Powered Extracurricular Finder
              </button>
              {/* <button onClick={() => setActiveTab('extracurricular')} className={`px-4 py-2 rounded-full ${activeTab === 'extracurricular' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} shadow`}>
                Extracurricular Database
              </button> */}
              <button onClick={() => setActiveTab('mentor')} className={`px-4 py-2 rounded-full ${activeTab === 'mentor' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} shadow`}>
                AI Application Mentor
              </button>
            </div>
            {renderActiveTab()}
          </div>
        </div>
      </div>

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
