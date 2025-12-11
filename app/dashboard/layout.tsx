'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, SignIn } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '/dashboard/database', label: 'Extracurriculars', icon: '📚' },
  { href: '/dashboard/applications', label: 'Applications', icon: '🗂️' },
  { href: '/dashboard/stories', label: 'Stories', icon: '📝' },
  { href: '/dashboard/submit', label: 'Share Your Story', icon: '📣' },
  { href: '/dashboard/ai-analyzer', label: 'AI Analyzer', icon: '🤖' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [animStyle, setAnimStyle] = useState({ opacity: 1, transform: 'translateY(0px)' });

  useEffect(() => {
    // fallback redirect if user somehow lands on /dashboard without subpath
    if (pathname === '/dashboard') {
      router.replace('/dashboard/database');
    }
    // smooth transition on page change
    setAnimStyle({ opacity: 0, transform: 'translateY(6px) scale(0.985)' });
    const t = setTimeout(() => {
      setAnimStyle({ opacity: 1, transform: 'translateY(0px) scale(1)' });
    }, 10);
    return () => clearTimeout(t);
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
      style={{ background: 'linear-gradient(120deg, #fff7ed 0%, #f4f7ff 40%, #eef2ff 100%)' }}
    >
      <div className="transition-all duration-300">
        <div className="w-full px-0 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

            <div className="flex gap-4">
              {/* Sidebar */}
              <aside className="hidden lg:flex lg:w-80 flex-col gap-3 sticky top-6 self-start h-[calc(100vh-6rem)] bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 text-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/15 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-white text-orange-600 font-black flex items-center justify-center shadow-md">
                    🎓
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-wide text-white/90">MyFolio</div>
                    <div className="text-base font-semibold">Dashboard</div>
                  </div>
                </div>
                {NAV_ITEMS.map((item) => {
                  const active = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 hover:translate-x-0.5 ${
                        active
                          ? 'bg-white text-orange-600 shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </aside>

              {/* Mobile sidebar (top buttons) */}
              <div className="flex lg:hidden flex-col gap-2">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {NAV_ITEMS.map((item) => {
                    const active = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex-shrink-0 text-left px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                          active
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-white text-gray-700 shadow-sm'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span className="font-semibold text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div
                key={pathname}
                className="flex-1 transition-all duration-200"
                style={{
                  transition: 'opacity 220ms ease, transform 220ms ease',
                  ...animStyle,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

