'use client';

import React from 'react';
import Link from 'next/link';
import { FaTrophy, FaRobot, FaChartLine, FaSearch, FaClock } from 'react-icons/fa';

export default function About() {
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
                AI-powered guidance to help students showcase their achievements, explore 
                extracurriculars, and optimize applications for top universities.
              </p>
              <div>
                <Link 
                  href="/features" 
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
            <h2 className="text-2xl font-bold text-[#1E293B] mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#4F46E5] mb-4">
                  <FaTrophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Extracurricular Database
                </h3>
                <p className="text-[#475569] text-base">
                  Browse our curated database of verified extracurriculars and competitions. Discover opportunities that colleges love to see.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="text-[#4F46E5] mb-4">
                  <FaRobot className="h-8 w-8" />
                </div>
                <div className="absolute top-4 right-4">
                  <FaClock className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  AI Application Mentor (Coming Soon)
                </h3>
                <p className="text-[#475569] text-base">
                  Get real-time feedback and personalized recommendations for your college applications.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="text-[#4F46E5] mb-4">
                  <FaChartLine className="h-8 w-8" />
                </div>
                <div className="absolute top-4 right-4">
                  <FaClock className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Compare Profile (Coming Soon)
                </h3>
                <p className="text-[#475569] text-base">
                  See how you measure up against successful applicants at your dream schools.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="text-[#4F46E5] mb-4">
                  <FaSearch className="h-8 w-8" />
                </div>
                <div className="absolute top-4 right-4">
                  <FaClock className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  AI-Powered Extracurricular Finder (Coming Soon)
                </h3>
                <p className="text-[#475569] text-base">
                  Let AI match you with perfect extracurricular activities based on your interests.
                </p>
              </div>
            </div>
          </section>

          {/* Community Stats Section */}
          <section className="text-center bg-white p-8 rounded-xl shadow-sm mb-16">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Our Growing Community</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-[#4F46E5] mb-2">10,000+</div>
                <div className="text-[#475569]">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#4F46E5] mb-2">500+</div>
                <div className="text-[#475569]">University Acceptances</div>
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
              <Link href="/features" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Find Competitions
                </h3>
                <p className="text-[#475569]">
                  Discover verified competitions and extracurricular opportunities to enhance your profile.
                </p>
              </Link>

              <Link href="/features" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Structure Your Portfolio
                </h3>
                <p className="text-[#475569]">
                  Get personalized guidance on organizing and presenting your achievements effectively.
                </p>
              </Link>

              <Link href="/features" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
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
                  href="/features" 
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
                  <li><Link href="/about" className="text-[#475569] hover:text-[#4F46E5]">About</Link></li>
                  <li><Link href="/blog" className="text-[#475569] hover:text-[#4F46E5]">Blog</Link></li>
                  <li><Link href="/privacy" className="text-[#475569] hover:text-[#4F46E5]">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-[#475569] hover:text-[#4F46E5]">Terms of Use</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-[#475569]">sunkarulyansar@gmail.com</li>
                  <li className="text-[#475569]"+7 707 988 5040</li>
                  <li className="text-[#475569]">Turar Ryskylov 14</li>
                  <li className="text-[#475569]">Astana, KZ 94105</li>
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
