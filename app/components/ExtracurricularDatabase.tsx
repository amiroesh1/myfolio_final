'use client';

import { useState } from 'react';

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
        </div>
      </div>
    </div>
  );
} 