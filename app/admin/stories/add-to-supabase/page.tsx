'use client';

import { useState } from 'react';

export default function AddToSupabasePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addStory = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/stories/supabase-add', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add story');
      }

      setResult(
        `✅ Success! Story added/updated in Supabase!\n\n${JSON.stringify(
          data,
          null,
          2,
        )}`,
      );
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Add Aziz Story to Supabase
        </h1>

        <div className="space-y-4">
          <p className="text-gray-600">
            This will add/update the Aziz story directly to your Supabase
            database with status APPROVED.
          </p>

          <button
            onClick={addStory}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Story to Supabase'}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <pre className="text-sm text-green-800 whitespace-pre-wrap">
                {result}
              </pre>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 border rounded-md">
            <p className="text-sm text-gray-600">
              <strong>What this does:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 list-disc list-inside space-y-1">
              <li>
                Connects to your Supabase database at
                lqgurdhcxzjchudxuuts.supabase.co
              </li>
              <li>
                Adds or updates the Aziz story with all 12 sections in English
              </li>
              <li>Sets status to APPROVED so it appears on the website</li>
              <li>
                After this, the story will be visible on /section and other
                pages
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

