'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center md:order-2">
          <div className="text-sm text-gray-600">Contacts:</div>
          <a href="https://t.me/myfoliokz" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
            @myfoliokz
          </a>
          <a href="https://t.me/amiroesh" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
            @amiroesh
          </a>
          <a href="mailto:amir.mirmanov11@gmail.com" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
            amir.mirmanov11@gmail.com
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 MyFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}