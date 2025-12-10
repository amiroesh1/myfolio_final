'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/dashboard/database', label: 'Extracurricular Database' },
  { href: '/dashboard/applications', label: 'Applications' },
  { href: '/dashboard/stories', label: 'Stories' },
  { href: '/dashboard/submit', label: 'Share Your Story' },
  { href: '/dashboard/ai-analyzer', label: 'AI Analyzer' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // fallback redirect if user somehow lands on /dashboard without subpath
    if (pathname === '/dashboard') {
      router.replace('/dashboard/database');
    }
  }, [pathname, router]);

  if (!isSignedIn) {
    return (
      <main
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background:
            'linear-gradient(to right, rgb(235, 240, 255), rgb(233, 244, 255), rgb(230, 247, 252))',
        }}
      >
        <div className="bg-white/90 p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Please Sign In to Access Your Dashboard
          </h2>
          <SignIn redirectUrl="/dashboard/database" />
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          'linear-gradient(to right, rgb(235, 240, 255), rgb(233, 244, 255), rgb(230, 247, 252))',
      }}
    >
      <div className="transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B]">
                  MyFolio Dashboard
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Your space to explore extracurriculars, get AI suggestions, and share your story.
                </p>
              </div>
              <Link
                href="/"
                className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-full bg-white/80 hover:bg-white text-[#4F46E5] text-sm font-semibold shadow-sm hover:shadow-md transition-colors transition-shadow duration-200"
              >
                Back to MyFolio
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Sidebar */}
              <aside className="lg:w-64 flex lg:flex-col gap-2 sticky top-6 self-start">
                {NAV_ITEMS.map((item) => {
                  const active = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                        active ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 shadow'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </aside>

              {/* Content */}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

