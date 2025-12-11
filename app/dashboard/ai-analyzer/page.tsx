'use client';

import { useState } from 'react';

type AiResult = {
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  profile_score?: number;
  suggested_programs?: { name: string; type?: string; reason?: string }[];
  raw?: string;
};

export default function AiAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);

  const onSubmit = async () => {
    setError(null);
    setResult(null);

    if (!file && !text.trim()) {
      setError('Please upload a PDF or enter text.');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text.trim()) formData.append('text', text.trim());

    try {
      setLoading(true);
      const res = await fetch('/api/analyze-profile', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Analysis error');
      }
      setResult(data.result || data);
    } catch (e: any) {
      setError(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 overflow-hidden">
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_30%),radial-gradient(circle_at_80%_0%,white,transparent_25%),radial-gradient(circle_at_40%_60%,white,transparent_20%)]" />
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Analyzer</h1>
            <p className="text-sm md:text-base text-white/90 max-w-3xl">
              Upload a PDF (resume/portfolio) or paste text. AI will score the profile, surface strengths/weaknesses,
              and recommend programs. PDF is prioritized if both are provided.
            </p>
          </div>
        </div>

        <div className="bg-white/80 border border-slate-100 rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-800">PDF (up to 5MB)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm"
            />
            {file && (
              <p className="text-xs text-slate-500">
                Выбран: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">Text (alternative to PDF)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              placeholder="Briefly about you: interests, goals, achievements..."
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Analyze Profile'}
          </button>
        </div>

        {loading && (
          <div className="bg-white/90 border border-slate-100 rounded-2xl shadow-sm p-6 space-y-3 animate-pulse">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="h-3 w-5/6 bg-slate-200 rounded" />
            <div className="h-3 w-4/6 bg-slate-200 rounded" />
          </div>
        )}

        {result && !loading && (
          <div className="bg-white/90 border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4 transition-all duration-200">
            {result.profile_score !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">Profile Rating:</span>
                <span className="text-lg font-bold text-indigo-700">{result.profile_score}/10</span>
              </div>
            )}
            {result.summary && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Summary</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>
              </div>
            )}
            {result.strengths && result.strengths.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Strengths</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {result.strengths.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.weaknesses && result.weaknesses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {result.weaknesses.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Actionable Recommendations</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {result.recommendations.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.suggested_programs && result.suggested_programs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Suggested Programs</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {result.suggested_programs.map((p, idx) => (
                    <li key={idx}>
                      <span className="font-semibold text-indigo-700">{p.name}</span>
                      {p.type && <span className="text-xs text-slate-500 ml-2">({p.type})</span>}
                      {p.reason && <span className="text-sm text-slate-600 ml-2">— {p.reason}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.raw && (
              <div className="text-xs text-slate-500">
                <pre className="whitespace-pre-wrap">{result.raw}</pre>
              </div>
            )}
            <div className="pt-2">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:scale-[1.02] hover:shadow-md transition-all duration-200"
              >
                Ask more questions in AI chat
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

