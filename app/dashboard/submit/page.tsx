'use client';

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
      <h2 className="text-2xl font-bold text-[#1E293B]">Share Your Story</h2>

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
        Read real journeys from students around the world and share your own story. See how others built their extracurricular profiles and what helped them stand out in college admissions.
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
}

