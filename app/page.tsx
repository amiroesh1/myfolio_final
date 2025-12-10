'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTrophy, FaChartLine, FaSearch } from 'react-icons/fa';

export default function Home() {
  return (
   <main className="min-h-screen" style={{ background: 'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
            <div className="max-w-3xl mt-20">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-6xl mx-auto text-center mt-6 relative z-10 mb-3">
                Craft Your Perfect<br /> 
                <span className="text-[#4F46E5]">College Portfolio</span>
              </h1>
              <p className="text-xl text-[#475569] max-w-2xl mx-auto mb-12">
                Discover real student stories, explore extracurricular opportunities, 
                and build your standout application with MyFolio.
              </p>
              <div>
                <Link 
                  href="/dashboard" 
                  className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300"
                >
                  Start Now – It's Free
                </Link>
                <div className="mt-8">
                  <p className="text-[#64748B] text-sm">No credit card required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Features Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">What We Offer</h2>
            <p className="text-[#64748B] mb-12">Explore our available features and discover opportunities to build your perfect college portfolio.</p>
            <div className="grid md:grid-cols-4 gap-8">
              <Link 
                href="/dashboard/database"
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#4F46E5] cursor-pointer"
              >
                <div className="text-[#4F46E5] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <FaTrophy className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3 group-hover:text-[#4338CA] transition-colors">
                  Extracurricular Database
                </h3>
                <p className="text-[#475569] text-base mb-4">
                  Browse our curated database of verified extracurriculars and competitions. Discover opportunities that colleges love to see.
                </p>
                <div className="text-sm text-[#4F46E5] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore now →
                </div>
              </Link>

              <Link 
                href="/dashboard/stories"
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#4F46E5] cursor-pointer"
              >
                <div className="text-[#4F46E5] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3 group-hover:text-[#4338CA] transition-colors">
                  Student Stories
                </h3>
                <p className="text-[#475569] text-base mb-4">
                  Read real experiences from students who got into top universities. Learn from their journeys and see what made them stand out.
                </p>
                <div className="text-sm text-[#4F46E5] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read stories →
                </div>
              </Link>

              <Link 
                href="/dashboard/applications"
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#4F46E5] cursor-pointer"
              >
                <div className="text-[#4F46E5] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <FaSearch className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3 group-hover:text-[#4338CA] transition-colors">
                  Application Profiles
                </h3>
                <p className="text-[#475569] text-base mb-4">
                  Compare your profile with successful applicants. See detailed breakdowns of what got students into their dream schools.
                </p>
                <div className="text-sm text-[#4F46E5] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View profiles →
                </div>
              </Link>

              <Link 
                href="/dashboard/ai-analyzer"
                className="group bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-emerald-400 cursor-pointer"
              >
                <div className="text-emerald-600 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">🤖</div>
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-3 group-hover:text-emerald-800 transition-colors">
                  AI Analyzer
                </h3>
                <p className="text-[#475569] text-base mb-4">
                  Загрузите PDF или текст — AI оценит профиль, даст рейтинг, сильные/слабые стороны и подберёт программы.
                </p>
                <div className="text-sm text-emerald-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Попробовать →
                </div>
              </Link>
            </div>
          </section>

          {/* Community Stats Section */}
          <section className="text-center bg-white p-8 rounded-xl shadow-sm mb-16">
  <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Our Growing Community</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
    <div>
      <div className="text-3xl font-bold text-[#4F46E5] mb-2">1,000+</div>
      <div className="text-[#475569]">Active Students</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-[#4F46E5] mb-2">24/7</div>
      <div className="text-[#475569]">AI-Powered Support</div>
    </div>
  </div>
          </section>


          {/* Interactive Goals Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6 text-center">Select Your Goal</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/dashboard" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow transition-transform duration-200 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Find Competitions
                </h3>
                <p className="text-[#475569]">
                  Discover verified competitions and extracurricular opportunities to enhance your profile.
                </p>
              </Link>

              <Link href="/dashboard" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow transition-transform duration-200 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Structure Your Portfolio
                </h3>
                <p className="text-[#475569]">
                  Get personalized guidance on organizing and presenting your achievements effectively.
                </p>
              </Link>

              <Link href="/dashboard" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow transition-transform duration-200 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Get Mentorship
                </h3>
                <p className="text-[#475569]">
                  Connect with successful applicants who've made it to top universities.
                </p>
              </Link>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">

    

  {/* University Logos */}
  <div className="bg-white rounded-xl shadow-sm p-8">
    <div className="flex justify-center items-center gap-12">
      <img 
        src="https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png" 
        alt="Harvard" 
        className="w-16 h-16 object-contain"
      />
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png" 
        alt="Stanford" 
        className="w-16 h-16 object-contain"
      />
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png" 
        alt="MIT" 
        className="w-16 h-16 object-contain"
      />
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/800px-Yale_University_Shield_1.svg.png" 
        alt="Yale" 
        className="w-16 h-16 object-contain"
      />
      <img 
        src="https://branding.web-resources.upenn.edu/sites/default/files/styles/card_3x2/public/2022-03/UniversityofPennsylvania_FullLogo_RGB-4_0.png?h=ab080a2f&itok=tu_jMFEm" 
        alt="UPenn" 
        className="w-16 h-16 object-contain"
      />
    </div>
  </div>
</section>

          {/* Join Us Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Ready to Start?</h2>
            <p className="text-lg text-[#475569] mb-6">
              Join thousands of students who are crafting their perfect college portfolios with MyFolio.
            </p>
            <Link 
                  href="/dashboard" 
                  className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300"
                >
                  Start Now – It's Free
                </Link>
          </section>

          {/* Footer Section */}
          <footer className="mt-24 pt-16 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-[#475569] hover:text-[#4F46E5]">About</Link></li>
                  <li><Link href="/blog" className="text-[#475569] hover:text-[#4F46E5]">Blog</Link></li>
                  <li><Link href="/privacy" className="text-[#475569] hover:text-[#4F46E5]">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-[#475569] hover:text-[#4F46E5]">Terms of Use</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-[#475569]">amir.mirmanov11@gmail.com</li>
                  <li className="text-[#475569]">+7 777 050 8282</li>
                  <li className="text-[#475569]">Turar Ryskylov 14</li>
                  <li className="text-[#475569]">Astana, KZ 010000</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Social Media</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.linkedin.com/company/myfoliokz/" className="text-[#475569] hover:text-[#4F46E5]">LinkedIn</a></li>
                  <li><a href="https://www.instagram.com/myfolio.kz/" className="text-[#475569] hover:text-[#4F46E5]">Instagram</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Join Our Community</h3>
                <p className="text-[#475569] mb-4">Get the latest updates and tips for your college journey.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 rounded-lg border border-gray-200 flex-grow"
                  />
                  <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#4338CA] transition-colors duration-300">
                    Join
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-[#64748B] text-sm py-8 border-t border-gray-200">
              © 2025 MyFolio. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
