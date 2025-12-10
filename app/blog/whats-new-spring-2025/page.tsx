import Link from 'next/link';

export default function WhatsNewSpring2025() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
      <div className="text-sm text-gray-500">May 2025</div>
      <h1 className="text-3xl font-bold text-[#1E293B]">What’s New in MyFolio: AI Analyzer, Fresh UI, and Faster Search</h1>
      <p className="text-[#475569] leading-relaxed">
        We’ve shipped a wave of improvements to make building your portfolio smoother and more fun. Here’s a quick rundown of what changed.
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1E293B]">AI Analyzer</h2>
        <ul className="list-disc list-inside text-[#475569] space-y-2">
          <li>Upload a PDF or paste text to get a profile score, strengths/weaknesses, and program suggestions.</li>
          <li>Clean UI, fast responses, and direct link back to the dashboard to keep iterating.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1E293B]">Dashboard & Navigation</h2>
        <ul className="list-disc list-inside text-[#475569] space-y-2">
          <li>Sticky sidebar with smooth transitions and clearer branding.</li>
          <li>Each section is a dedicated page for faster loading and better deep-links.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1E293B]">Extracurriculars & Applications</h2>
        <ul className="list-disc list-inside text-[#475569] space-y-2">
          <li>Better search matching and cleaner cards so text no longer overflows.</li>
          <li>Applications now show school, city, gender, final choice, and program highlights.</li>
        </ul>
      </div>

      <div className="space-y-2 text-[#475569]">
        <p>
          Coming up soon: live Zoom meetings, more stories with photos, and automated updates for the extracurricular database.
        </p>
        <p className="font-semibold">Founders: Amir and Ansar</p>
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center text-[#4F46E5] font-semibold hover:text-[#4338CA] transition-colors"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}

