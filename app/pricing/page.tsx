"use client";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-20 bg-gray-50">
      <h1 className="text-5xl font-extrabold text-[#1E293B] mb-8 text-center">Pricing Plans</h1>
      <p className="text-[#475569] max-w-2xl mx-auto text-center text-lg mb-12">
        Choose the perfect plan to kickstart your journey to top universities
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-[#4F46E5] transition-all">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Basic Start</h2>
            <div className="text-3xl font-bold text-[#4F46E5] mb-4">
              990 ₸<span className="text-lg text-[#475569]">/month</span>
            </div>
            <p className="text-[#475569]">Your first step towards your dream university starts here!</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>100 AI Messages</strong> - Ask questions about exam prep and admission advice (25/week)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>1x Profile Analysis</strong> - Get insights on your strengths and improvement areas</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>Exclusive Community</strong> - Connect with MIT, Ivy League, and top university students</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>Weekly Q&A Sessions</strong> - Live Zoom sessions with top university students</span>
            </li>
          </ul>

          <a 
            href="https://t.me/sun_ansarito" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#4F46E5] text-white py-3 rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Professional Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#4F46E5]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Professional Preparation</h2>
            <div className="text-3xl font-bold text-[#4F46E5] mb-4">
              1990 ₸<span className="text-lg text-[#475569]">/month</span>
            </div>
            <p className="text-[#475569]">Complete toolkit for serious applicants!</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>150 AI Messages</strong> - Personalized advice for essays and strategies (35-40/week)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>4x Profile Analysis</strong> - Track your progress weekly</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>Exclusive Community</strong> - Connect with MIT, Ivy League, and top university students</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>Weekly Q&A Sessions</strong> - Live Zoom sessions with top university students</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>SAT & IELTS Prep Plan</strong> - Personalized 30-day study schedule</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>AI Psychologist Chat</strong> - Unlimited access to AI mental health support</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#4F46E5] mr-2">✓</span>
              <span className="text-[#475569]"><strong>Premium Guides</strong> - Admission guides for USA, Hong Kong, China, Qatar, Turkey, Hungary</span>
            </li>
          </ul>

          <a 
            href="https://t.me/sun_ansarito" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#4F46E5] text-white py-3 rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            Buy Premium
          </a>
        </div>
      </div>
    </div>
  )
}
