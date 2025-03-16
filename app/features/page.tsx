'use client';

import React, { useState } from 'react';
import { 
  FaRobot, 
  FaChartLine,
  FaSearch,
  FaTrophy,
  FaUpload,
  FaSpinner,
  FaPaperPlane
} from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import ExtracurricularDatabase from '../components/ExtracurricularDatabase';

interface StoryGeneratorForm {
  gpa: string;
  testScores: string;
  extracurriculars: string;
  targetSchools: string;
}

interface ExtracurricularFinderForm {
  interests: string;
  skills: string;
  targetMajor: string;
  location: string;
}

interface Message {
  type: 'user' | 'ai';
  content: string;
  role?: 'user' | 'assistant';
}

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const majors = [
  'Computer Science',
  'Engineering',
  'Business',
  'Medicine',
  'Law',
  'Arts',
  'Sciences',
  'Humanities'
];

const activities = {
  'Computer Science': [
    {
      title: 'Coding Competition',
      description: 'Participate in programming contests and hackathons',
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      title: 'Open Source Contributing',
      description: 'Contribute to open source projects on GitHub',
      difficulty: 'Medium',
      impact: 'High'
    }
  ],
  'Engineering': [
    {
      title: 'Robotics Club',
      description: 'Build and program robots for competitions',
      difficulty: 'High',
      impact: 'High'
    },
    {
      title: 'Engineering Projects',
      description: 'Work on practical engineering projects',
      difficulty: 'Medium',
      impact: 'High'
    }
  ],
  'Business': [
    {
      title: 'Student Business Club',
      description: 'Learn about entrepreneurship and business management',
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      title: 'Stock Market Competition',
      description: 'Participate in virtual trading competitions',
      difficulty: 'Medium',
      impact: 'Medium'
    }
  ],
  'Medicine': [
    {
      title: 'Hospital Volunteering',
      description: 'Gain experience in healthcare settings',
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      title: 'Medical Research',
      description: 'Assist in medical research projects',
      difficulty: 'High',
      impact: 'Very High'
    }
  ],
  'Law': [
    {
      title: 'Mock Trial',
      description: 'Participate in simulated court proceedings',
      difficulty: 'High',
      impact: 'High'
    },
    {
      title: 'Legal Internship',
      description: 'Work at a law firm or legal organization',
      difficulty: 'High',
      impact: 'Very High'
    }
  ],
  'Arts': [
    {
      title: 'Art Exhibition',
      description: 'Showcase your artwork in galleries',
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      title: 'Theater Production',
      description: 'Participate in theater performances',
      difficulty: 'Medium',
      impact: 'High'
    }
  ],
  'Sciences': [
    {
      title: 'Science Fair',
      description: 'Conduct and present scientific research',
      difficulty: 'High',
      impact: 'High'
    },
    {
      title: 'Lab Research',
      description: 'Work in a research laboratory',
      difficulty: 'High',
      impact: 'Very High'
    }
  ],
  'Humanities': [
    {
      title: 'Literary Magazine',
      description: 'Edit and publish student writing',
      difficulty: 'Medium',
      impact: 'Medium'
    },
    {
      title: 'Model UN',
      description: 'Participate in diplomatic simulations',
      difficulty: 'High',
      impact: 'High'
    }
  ]
};

const features = [
  {
    name: 'AI Application Mentor',
    description: 'Get real-time feedback and personalized recommendations for your college applications.',
    icon: FaRobot,
    details: [
      'Real-time essay feedback and suggestions',
      'Personalized application strategy',
      'Interview preparation guidance'
    ]
  },
  {
    name: 'Compare Profile',
    description: 'AI analyzes successful applications to reverse-engineer winning strategies. Compare your profile with similar applicants who got into top schools.',
    icon: FaChartLine,
    details: [
      'Scans past accepted students\' portfolios',
      'Predicts success based on real acceptance trends',
      'Compare with Ivy League & T20 admits'
    ]
  },
  {
    name: 'AI-Powered Extracurricular Finder',
    description: 'Smart matching system that analyzes your profile and suggests personalized opportunities aligned with your target schools.',
    icon: FaSearch,
    details: [
      'Personalized activity recommendations',
      'Target school-specific suggestions',
      'Smart matching with your interests'
    ]
  },
  {
    name: 'Extracurricular Database',
    description: 'Find verified opportunities to boost your resume with our curated database of competitions, internships, and activities.',
    icon: FaTrophy,
    details: [
      'Verified competition listings',
      'Exclusive internship opportunities',
      'Leadership program database'
    ]
  }
];

export default function FeaturesPage() {
  const [selectedTab, setSelectedTab] = useState('AI Application Mentor');
  const [activeTab, setActiveTab] = useState('mentor');
  const [loading, setLoading] = useState(false);
  const [storyForm, setStoryForm] = useState<StoryGeneratorForm>({
    gpa: '',
    testScores: '',
    extracurriculars: '',
    targetSchools: ''
  });
  const [finderForm, setFinderForm] = useState<ExtracurricularFinderForm>({
    interests: '',
    skills: '',
    targetMajor: '',
    location: ''
  });
  const [results, setResults] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: "Hi there! I'm your AI-powered college application mentor. I'm here to help you navigate the college application process."
    },
    {
      type: 'ai',
      content: "Start off by asking me questions like 'What extracurriculars should I pursue?' or 'What AP classes are the best for a business major?'"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults({
      matchScore: 85,
      similarProfiles: 3,
      recommendations: [
        "Consider adding research experience to strengthen your STEM profile",
        "Your leadership activities align well with successful Harvard applicants",
        "Adding more community service could improve your chances"
      ]
    });
    setLoading(false);
  };

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
  
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage, role: 'user' }]);
    setInputMessage('');
    setLoading(true);
    setIsTyping(true);
  
    try {
      console.log('Sending chat request...');
      const response = await axios.post('/api/chat', {
        messages: [
          {
            role: 'system',
            content: 'You are an expert college application mentor with deep knowledge of the college admissions process. Your goal is to help students craft compelling applications and make informed decisions about their academic journey. Be specific, actionable, and encouraging in your responses.'
          },
          ...messages.map(msg => ({
            role: msg.role || (msg.type === 'user' ? 'user' : 'assistant'),
            content: msg.content
          })),
          { role: 'user', content: userMessage }
        ]
      });
  
      console.log('Chat response received:', response.data);
  
      if (response.data.choices?.[0]?.message?.content) {
        const aiResponse = response.data.choices[0].message.content;
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: aiResponse,
          role: 'assistant'
        }]);
      } else {
        console.error('Invalid API response format:', response.data);
        throw new Error('Invalid response format from API');
      }
    } catch (error: any) {
      console.error('Chat error:', {
        message: error.message,
        response: error.response?.data || 'No response data',
        status: error.response?.status || 'No status code'
      });
  
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
      if (error.response?.data?.error) {
        errorMessage += ` (Error: ${error.response.data.error})`;
      }
  
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: errorMessage,
        role: 'assistant'
      }]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to right, rgb(243, 238, 255), rgb(236, 242, 255), rgb(230, 247, 255))' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center text-[#1E293B] mb-6">
            MyFolio Features
          </h1>
          <p className="text-xl text-[#475569] text-center mb-16">
            Use our AI-powered tools to enhance your college application
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {['AI Application Mentor', 'Compare Profile', 'AI-Powered Extracurricular Finder', 'Extracurricular Database'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTab === tab
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {selectedTab === 'AI Application Mentor' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  AI Application Mentor
                </h2>
                <div className="flex flex-col h-[600px]">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-4">
                          <FaSpinner className="animate-spin h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <form onSubmit={handleMentorSubmit} className="flex gap-4">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about extracurriculars, essays, or application strategy..."
                        className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        disabled={loading || !inputMessage.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <FaPaperPlane className="h-4 w-4" />
                      </button>
                    </form>
                  </div>

                  <div className="mt-4 flex gap-2 overflow-x-auto py-2">
                    {[
                      "Best extracurriculars for STEM?",
                      "Tips for college application essays?",
                      "Top universities for computer science?",
                      "Importance of SAT scores?"
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setInputMessage(suggestion)}
                        className="flex-none px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'Compare Profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Compare Profile
                </h2>
                <form onSubmit={handleStorySubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GPA
                    </label>
                    <input
                      type="text"
                      value={storyForm.gpa}
                      onChange={(e) => setStoryForm({...storyForm, gpa: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 3.95"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Test Scores (SAT/ACT)
                    </label>
                    <input
                      type="text"
                      value={storyForm.testScores}
                      onChange={(e) => setStoryForm({...storyForm, testScores: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., SAT 1500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Key Extracurriculars
                    </label>
                    <textarea
                      value={storyForm.extracurriculars}
                      onChange={(e) => setStoryForm({...storyForm, extracurriculars: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="List your main activities..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Target Schools
                    </label>
                    <input
                      type="text"
                      value={storyForm.targetSchools}
                      onChange={(e) => setStoryForm({...storyForm, targetSchools: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Harvard, MIT, Stanford"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      'Generate Analysis'
                    )}
                  </button>
                </form>
              </div>
            )}

            {selectedTab === 'AI-Powered Extracurricular Finder' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Find Perfect Extracurriculars
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Interests
                    </label>
                    <input
                      type="text"
                      value={finderForm.interests}
                      onChange={(e) => setFinderForm({...finderForm, interests: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Computer Science, Biology, Writing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={finderForm.skills}
                      onChange={(e) => setFinderForm({...finderForm, skills: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Programming, Public Speaking"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Target Major
                    </label>
                    <input
                      type="text"
                      value={finderForm.targetMajor}
                      onChange={(e) => setFinderForm({...finderForm, targetMajor: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={finderForm.location}
                      onChange={(e) => setFinderForm({...finderForm, location: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Finding matches...
                      </>
                    ) : (
                      'Find Opportunities'
                    )}
                  </button>
                </form>
              </div>
            )}

            {selectedTab === 'Extracurricular Database' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Extracurricular & Opportunity Database
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Search competitions, internships, or activities..."
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Search
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        title: "International Science Olympiad",
                        deadline: "April 30, 2024",
                        type: "Competition",
                        category: "Science"
                      },
                      {
                        title: "Global Youth Leadership Summit",
                        deadline: "May 15, 2024",
                        type: "Leadership",
                        category: "Development"
                      },
                      {
                        title: "Tech Startup Internship Program",
                        deadline: "March 31, 2024",
                        type: "Internship",
                        category: "Technology"
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">Deadline: {item.deadline}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {results && !loading && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedTab === 'Compare Profile' ? 'Your Analysis Results' : 'Matching Opportunities'}
                </h3>
                
                {selectedTab === 'Compare Profile' && results.recommendations ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <span className="text-gray-600">Profile Match Score</span>
                      <span className="text-blue-600 font-bold">{results.matchScore}%</span>
                    </div>
                    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                      {results.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="p-4 flex items-start">
                          <FaChartLine className="text-blue-500 mt-1 mr-3" />
                          <p className="text-gray-600">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedTab === 'AI-Powered Extracurricular Finder' && results.opportunities ? (
                  <div className="space-y-4">
                    {results.opportunities.map((opp: any, i: number) => (
                      <div key={i} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{opp.title}</h4>
                            <p className="text-sm text-gray-500">Deadline: {opp.deadline}</p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {opp.match}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {opp.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {selectedTab === 'Extracurricular Database' && (
            <div className="mt-8">
              <ExtracurricularDatabase />
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 