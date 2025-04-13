'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const sampleActivities = [
  {
    title: 'International Science Olympiad',
    category: 'Science',
    type: 'Competition',
    deadline: 'April 30, 2024',
    location: 'Online',
    isOnline: true,
    interests: ['Science', 'Research', 'Competition'],
    period: 'School Year',
    financialRating: 'Free',
    isHighlySelective: true,
    description: 'Global science competition for high school students'
  },
  {
    title: 'Tech Startup Internship',
    category: 'Technology',
    type: 'Internship',
    deadline: 'March 31, 2024',
    location: 'San Francisco, CA',
    isOnline: false,
    interests: ['Technology', 'Entrepreneurship'],
    period: 'Summer',
    financialRating: 'Paid',
    isHighlySelective: false,
    description: 'Work with innovative startups in Silicon Valley'
  },
  {
    title: 'Global Youth Leadership Summit',
    category: 'Development',
    type: 'Leadership',
    deadline: 'May 15, 2024',
    location: 'New York, NY',
    isOnline: false,
    interests: ['Leadership', 'Public Speaking'],
    period: 'Summer',
    financialRating: 'High Cost',
    isHighlySelective: true,
    description: 'Intensive leadership training program'
  },
];

export default function ExtracurricularDatabase() {
  const [filters, setFilters] = useState({
    type: [] as string[],
    period: [] as string[],
    financialRating: [] as string[],
    isHighlySelective: false
  });

  const toggleFilter = (type: 'type' | 'period' | 'financialRating', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(t => t !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setFilters({
                  type: [],
                  period: [],
                  financialRating: [],
                  isHighlySelective: false
                })}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </button>
            </div>

            {/* Quick Filters Section */}
            <div className="space-y-6">
              {/* Time Period */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Time Period</h3>
                <div className="space-y-2">
                  {['Summer', 'School Year'].map(period => (
                    <label key={period} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.period.includes(period)}
                        onChange={() => toggleFilter('period', period)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{period}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Type</h3>
                <div className="space-y-2">
                  {['Competition', 'Internship', 'Leadership', 'Research'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleFilter('type', type)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cost</h3>
                <div className="space-y-2">
                  {['Free', 'Low Cost', 'Medium Cost'].map(cost => (
                    <label key={cost} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.financialRating.includes(cost)}
                        onChange={() => toggleFilter('financialRating', cost)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{cost}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Selectivity */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Selectivity</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isHighlySelective}
                    onChange={(e) => setFilters(prev => ({ ...prev, isHighlySelective: e.target.checked }))}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Highly Selective</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 gap-6">
            {sampleActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  {activity.isHighlySelective && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Selective
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 text-gray-900">{activity.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Period:</span>
                    <span className="ml-2 text-gray-900">{activity.period}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 text-gray-900">{activity.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <span className="ml-2 text-gray-900">{activity.financialRating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activity.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Deadline: {activity.deadline}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
