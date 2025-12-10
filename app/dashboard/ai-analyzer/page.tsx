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
      setError('Добавьте PDF или введите текст.');
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
        throw new Error(data?.error || 'Ошибка анализа');
      }
      setResult(data.result || data);
    } catch (e: any) {
      setError(e.message || 'Ошибка запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white/80 border border-slate-100 rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">AI Analyzer</h1>
          <p className="text-sm text-slate-600">
            Загрузите PDF (резюме/портфолио) или вставьте текст. AI оценит профиль и подберёт программы.
          </p>
        </div>

        <div className="bg-white/80 border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">PDF (до 5MB)</label>
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
            <label className="text-sm font-medium text-slate-800">Текст (альтернатива PDF)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              placeholder="Кратко о себе: интересы, планы, достижения..."
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
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? 'Анализируем...' : 'Analyze Profile'}
          </button>
        </div>

        {result && (
          <div className="bg-white/90 border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
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
          </div>
        )}
      </div>
    </main>
  );
}

