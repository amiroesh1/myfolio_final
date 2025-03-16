'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
            <div className="max-w-3xl mt-20">
              <h1 className="text-[80px] leading-[1.2] font-black mb-8">
                <div className="text-[#1E293B]">Craft Your Perfect</div>
                <div className="text-[#4F46E5]">College Portfolio</div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  AI Application Mentor
                </h3>
                <p className="text-[#475569] text-base">
                  Get instant, personalized feedback on your college applications with our AI technology. Perfect your essays and stand out from the crowd.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#4F46E5] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Profile Compare
                </h3>
                <p className="text-[#475569] text-base">
                  See how you measure up against successful applicants at your dream schools. Identify and improve key areas of your profile.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#4F46E5] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Personalized Extracurricular Matching
                </h3>
                <p className="text-[#475569] text-base">
                  Let AI match you with perfect extracurricular activities based on your interests. Find opportunities that truly reflect who you are.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#4F46E5] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Extracurriculars & Opportunities Database
                </h3>
                <p className="text-[#475569] text-base">
                  Browse our curated database of verified extracurriculars and competitions. Discover opportunities that colleges love to see.
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
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Find Competitions
                </h3>
                <p className="text-[#475569]">
                  Discover verified competitions and extracurricular opportunities to enhance your profile.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Structure Your Portfolio
                </h3>
                <p className="text-[#475569]">
                  Get personalized guidance on organizing and presenting your achievements effectively.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4F46E5]">
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3">
                  Get Mentorship
                </h3>
                <p className="text-[#475569]">
                  Connect with successful applicants who've made it to top universities.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">
  <h2 className="text-2xl font-bold text-[#1E293B] mb-6 text-center">Success Stories</h2>
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    {/* Sarah Chen */}
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <img 
          src="https://media.licdn.com/dms/image/v2/D4E03AQEI2-YzwDRUsg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728099789795?e=1747267200&v=beta&t=xbbbBSTtDTFeUERXfjiX55hV5ai8V5BzBJp1ekkUFkw" 
          alt="Sarah Chen" 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-[#1E293B]">Sarah Chen</h3>
          <p className="text-sm text-[#64748B]">Harvard '24</p>
        </div>
      </div>
      <p className="text-[#475569] italic">
        "MyFolio helped me organize my achievements and present them in a way that truly stood out. The AI feedback was invaluable during my application process."
      </p>
    </div>
    {/* James Rodriguez */}
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <img 
          src="https://media.licdn.com/dms/image/v2/D5603AQERrabilmOspQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705893750193?e=1747267200&v=beta&t=NTN3F4BdJ_ymBgo2cuby60CxQLmV6S2GwyZ5c0zQqnA" 
          alt="James Rodriguez" 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-[#1E293B]">James Rodriguez</h3>
          <p className="text-sm text-[#64748B]">Stanford '23</p>
        </div>
      </div>
      <p className="text-[#475569] italic">
        "The competition database and mentorship connections were game-changers. I found opportunities I never knew existed."
      </p>
    </div>
  </div>

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
            <button className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-300">
              Start Now – It's Free
            </button>
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
                  <li className="text-[#475569]">support@myfolio.com</li>
                  <li className="text-[#475569]">1-800-MYFOLIO</li>
                  <li className="text-[#475569]">123 College Ave</li>
                  <li className="text-[#475569]">San Francisco, CA 94105</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-4">Social Media</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#475569] hover:text-[#4F46E5]">Twitter</a></li>
                  <li><a href="#" className="text-[#475569] hover:text-[#4F46E5]">LinkedIn</a></li>
                  <li><a href="#" className="text-[#475569] hover:text-[#4F46E5]">Instagram</a></li>
                  <li><a href="#" className="text-[#475569] hover:text-[#4F46E5]">Facebook</a></li>
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
              © 2024 MyFolio. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
} 