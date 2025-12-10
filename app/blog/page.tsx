import Link from 'next/link';

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-[#1E293B] mb-6">Blog</h1>
      
      <div className="space-y-4">
        {/* New Article */}
        <div className="max-w-2xl bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
          <div className="mb-4">
            <span className="text-sm text-gray-500">May 2025</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-[#1E293B] mb-3">
            What’s New in MyFolio: AI Analyzer, Fresh UI, and Faster Search
          </h2>
          
          <p className="text-[#475569] mb-4 line-clamp-3">
            We shipped a wave of improvements: AI Analyzer, sticky sidebar, smoother pages, and cleaner extracurricular search.
          </p>
          
          <Link 
            href="/blog/whats-new-spring-2025" 
            className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
          >
            Read more
          </Link>
        </div>

        {/* Article Preview Card */}
        <div className="max-w-2xl bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
          <div className="mb-4">
            <span className="text-sm text-gray-500">April 14, 2025</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-[#1E293B] mb-3">
            🚀 Myfolio Is Live – Explore, Build, and Dream Big!
          </h2>
          
          <p className="text-[#475569] mb-4 line-clamp-3">
            Hey everyone! We're thrilled to announce the official launch of Myfolio! 🎉
            Now you can explore 100+ extracurricular activities to supercharge your profile and discover new passions.
          </p>
          
          <Link 
            href="/blog/myfolio-launch" 
            className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}
