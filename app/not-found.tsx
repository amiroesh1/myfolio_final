import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-6xl font-bold text-[#1E293B]">404</h1>
        <div className="w-px h-12 bg-gray-200"></div>
        <p className="text-[#475569]">This page could not be found.</p>
      </div>
      <Link 
        href="/"
        className="text-[#4F46E5] hover:text-[#4338CA] transition-colors duration-300"
      >
        Go back home
      </Link>
    </div>
  )
} 