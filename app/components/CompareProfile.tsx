import React, { useState } from 'react';

export default function CompareProfile() {
  const [gpa, setGpa] = useState('');
  const [testScores, setTestScores] = useState('');
  const [extracurriculars, setExtracurriculars] = useState('');
  const [targetSchools, setTargetSchools] = useState('');
  const [analysis, setAnalysis] = useState('');

  const generateAnalysis = () => {
    // Basic analysis based on inputs
    let analysisText = '';
    
    if (gpa && testScores) {
      const gpaValue = parseFloat(gpa);
      const satMatch = testScores.match(/\d+/);
      const satScore = satMatch ? parseInt(satMatch[0]) : 0;

      analysisText = `Your GPA of ${gpa} and ${testScores} are `;
      
      if (gpaValue >= 3.8 && satScore >= 1450) {
        analysisText += `competitive for top-tier schools. With strong extracurriculars, you have a good chance at Ivy League and similar competitive universities.`;
      } else if (gpaValue >= 3.5 && satScore >= 1350) {
        analysisText += `solid for many selective universities. You may want to consider schools in the top 50 range, and your extracurriculars will be important.`;
      } else if (gpaValue >= 3.0) {
        analysisText += `not competitive for top-tier schools like Ivy League. However, with strong extracurriculars (like Olympiads, leadership, or a startup), you still have a good chance at mid to high-tier universities, especially if your essays and recommendations are strong.`;
      } else {
        analysisText += `below average for selective colleges. Focus on schools with higher acceptance rates or consider community college transfer pathways.`;
      }
    } else {
      analysisText = 'Please enter both GPA and test scores to generate an analysis.';
    }

    setAnalysis(analysisText);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Compare Profile</h2>
      
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
          <input 
            type="text" 
            placeholder="e.g., 3.95" 
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Scores (SAT)</label>
          <input 
            type="text" 
            placeholder="e.g., SAT 1500" 
            value={testScores}
            onChange={(e) => setTestScores(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Extracurriculars</label>
          <textarea 
            placeholder="List your main activities..." 
            rows={3}
            value={extracurriculars}
            onChange={(e) => setExtracurriculars(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Schools</label>
          <input 
            type="text" 
            placeholder="e.g., Harvard, MIT, Stanford" 
            value={targetSchools}
            onChange={(e) => setTargetSchools(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          onClick={generateAnalysis}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Analysis
        </button>

        {analysis && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Analysis Result:</h3>
            <p className="text-gray-700">{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}