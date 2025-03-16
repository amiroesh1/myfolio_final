'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaGraduationCap className="w-6 h-6 text-[#4F46E5]" />
            <span className="text-lg font-bold text-[#4F46E5]">MyFolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
              About
            </Link>
            <Link href="/blog" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
              Blog
            </Link>
            <Link href="/features" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
              Features
            </Link>
            <Link href="/pricing" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
              Pricing
            </Link>
            <Link href="/contact" className="text-[#475569] hover:text-[#1E293B] text-[15px]">
              Contact
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg
                       hover:bg-[#4338CA] transition-colors duration-300 text-[15px]"
            >
              Sign Up – It's Free
            </Link>
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
              href="/features" 
              className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="block text-[#475569] hover:text-[#1E293B] py-2 text-[15px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/signup" 
              className="block w-full text-center bg-[#4F46E5] text-white px-4 py-2 
                       rounded-lg hover:bg-[#4338CA] transition-colors duration-300 text-[15px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up – It's Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 