'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Activity {
  title: string;
  category: string;
  type: string;
  deadline: string;
  location: string;
  isOnline: boolean;
  interests: string[];
  period: string;
  financialRating: string;
  isHighlySelective: boolean;
  description: string;
  url: string;
}

export default function ExtracurricularDatabase() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: [] as string[],
    period: [] as string[],
    format: [] as string[],
    financialRating: [] as string[],
    majors: [] as string[],
    isHighlySelective: false
  });

  // Filter options
  const filterOptions = {
    type: ['Competition', 'Program', 'Internship'],
    period: ['Summer', 'School Year'],
    format: ['Online', 'In-Person', 'Hybrid'],
    financialRating: ['Free', 'Paid', 'Financial Aid Available'],
    majors: ['Business', 'Engineering', 'Computer Science', 'Economics', 'Political Science']
  };

  // Fetch activities from the API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities');
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(data);
        setFilteredActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities when search query or filters change
  useEffect(() => {
    let result = activities;

    // Apply search filter across all fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(activity => 
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query) ||
        activity.type.toLowerCase().includes(query) ||
        activity.interests.some(interest => interest.toLowerCase().includes(query)) ||
        activity.location.toLowerCase().includes(query) ||
        activity.financialRating.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      result = result.filter(activity => filters.type.includes(activity.type));
    }

    // Apply period filter
    if (filters.period.length > 0) {
      result = result.filter(activity => filters.period.includes(activity.period));
    }

    // Apply format filter
    if (filters.format.length > 0) {
      result = result.filter(activity => {
        const format = activity.location === 'Hybrid' ? 'Hybrid' : 
                      activity.isOnline ? 'Online' : 'In-Person';
        return filters.format.includes(format);
      });
    }

    // Apply cost filter
    if (filters.financialRating.length > 0) {
      result = result.filter(activity => {
        return filters.financialRating.some(rating => {
          if (rating === 'Financial Aid Available') {
            return activity.financialRating.toLowerCase().includes('financial aid') ||
                   activity.financialRating.toLowerCase().includes('scholarship');
          }
          if (rating === 'Free') {
            return activity.financialRating.toLowerCase().startsWith('free');
          }
          if (rating === 'Paid') {
            return activity.financialRating.toLowerCase().startsWith('paid');
          }
          return activity.financialRating.toLowerCase().includes(rating.toLowerCase());
        });
      });
    }

    // Apply majors filter
    if (filters.majors.length > 0) {
      result = result.filter(activity => filters.majors.some(major => activity.interests.includes(major)));
    }

    // Apply selectivity filter
    if (filters.isHighlySelective) {
      result = result.filter(activity => activity.isHighlySelective);
    }

    setFilteredActivities(result);
  }, [searchQuery, filters, activities]);

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    if (type === 'isHighlySelective') {
      setFilters(prev => ({
        ...prev,
        isHighlySelective: !prev.isHighlySelective
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(t => t !== value)
          : [...prev[type], value]
      }));
    }
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
                  format: [],
                  financialRating: [],
                  majors: [],
                  isHighlySelective: false
                })}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </button>
            </div>

            <div className="space-y-6">
              {/* Majors */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Majors</h3>
                <div className="space-y-2">
                  {filterOptions.majors.map(major => (
                    <label key={major} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.majors.includes(major)}
                        onChange={() => toggleFilter('majors', major)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{major}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Period */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Time Period</h3>
                <div className="space-y-2">
                  {filterOptions.period.map(period => (
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
                  {filterOptions.type.map(type => (
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

              {/* Format */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Format</h3>
                <div className="space-y-2">
                  {filterOptions.format.map(format => (
                    <label key={format} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.format.includes(format)}
                        onChange={() => toggleFilter('format', format)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cost</h3>
                <div className="space-y-2">
                  {filterOptions.financialRating.map(cost => (
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
                    onChange={() => toggleFilter('isHighlySelective', '')}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {activity.isHighlySelective && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Highly Selective
                      </span>
                    )}
                  </div>
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
                    <span className="text-gray-600">Format:</span>
                    <span className="ml-2 text-gray-900">
                      {activity.location === 'Hybrid' ? 'Hybrid' : activity.isOnline ? 'Online' : 'In-Person'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <span className="ml-2 text-gray-900">{activity.financialRating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
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
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No opportunities found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
