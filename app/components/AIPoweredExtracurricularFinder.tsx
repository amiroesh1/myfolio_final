import React from 'react';

export default function AIPoweredExtracurricularFinder() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Find Perfect Extracurriculars</h2>
      
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
          <input 
            type="text" 
            placeholder="e.g., Computer Science, Biology, Writing" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input 
            type="text" 
            placeholder="e.g., Programming, Public Speaking" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Major</label>
          <input 
            type="text" 
            placeholder="e.g., Computer Science" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            placeholder="e.g., New York, NY" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Find Opportunities
        </button>
      </div>
    </div>
  );
}