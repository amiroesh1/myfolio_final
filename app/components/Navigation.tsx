'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return nothing on first render to avoid hydration mismatch
  }

  // Special minimal nav for dashboard: no marketing links,
  // only logo and auth controls
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/about" className="flex items-center space-x-2">
              <FaGraduationCap className="h-8 w-8 text-[#4F46E5]" />
              <span className="text-lg font-bold text-[#4F46E5]">MyFolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isDashboard && (
              <>
                <Link href="/about" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
                  About
                </Link>
                <Link href="/blog" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
                  Blog
                </Link>
                <Link href="/dashboard" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
                  Dashboard
                </Link>
                <Link href="/contact" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
                  Contact
                </Link>
              </>
            )}
            <SignedIn>
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className="bg-[#4F46E5] text-white px-5 py-2 rounded-full hover:bg-[#4338CA] transition-colors duration-300 text-[15px]"
              >
                Login
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-[#475569]" />
            ) : (
              <FaBars className="w-6 h-6 text-[#475569]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {!isDashboard && (
              <>
                <Link
                  href="/about"
                  className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/contact"
                  className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
            <SignedIn>
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className="bg-[#4F46E5] text-white px-5 py-2 rounded-full hover:bg-[#4338CA] transition-colors duration-300 text-[15px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
