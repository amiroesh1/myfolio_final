'use client';

import { useEffect, useRef, useState } from 'react';

const presetResponses: { [key: string]: string } = {
  "What extracurriculars should I pursue?":
    "Choose activities you're passionate about and stick with them long-term. Focus on depth, not just breadth — consistency and leadership matter.",
  "How do I build a strong college resume?":
    "Highlight impact, not just involvement. Include leadership, achievements, and unique experiences with real results.",
  "Suggest unique leadership activities for me":
    "Create a community project, run a school campaign, launch a blog or podcast, or lead workshops in your area of expertise.",
  "How can I impress Ivy League schools?":
    "Show intellectual depth, original thinking, and meaningful impact. Ivy Leagues want passion with purpose, not just high grades.",
};

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // 🧪 Тест API при загрузке
  useEffect(() => {
    const testOpenAI = async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Hello!' }],
          }),
        });

        const data = await res.json();
        console.log('✅ AI ответ:', data);
      } catch (error) {
        console.error('❌ Ошибка при запросе к AI:', error);
      }
    };

    testOpenAI();
  }, []);

  const handleSend = async (question: string) => {
    if (!question.trim()) return;

    const userMsg = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (presetResponses[question]) {
      const botMsg = { role: 'assistant', content: presetResponses[question] };
      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Oops! Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#FAFBFC] rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-200 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">AI Application Mentor</h2>
        <p className="text-sm text-gray-500 mt-1">Ask anything about college, extracurriculars, and strategy.</p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.keys(presetResponses).map((question, i) => (
          <button
            key={i}
            onClick={() => handleSend(question)}
            className="text-sm sm:text-base px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-full border border-gray-300 transition shadow-sm"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div
        ref={chatRef}
        className="bg-white h-[400px] sm:h-[500px] overflow-y-auto px-4 py-4 space-y-3 rounded-2xl border border-gray-100 shadow-inner"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-indigo-100 text-indigo-900 rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-400 px-5 py-3 rounded-2xl border border-gray-200 rounded-bl-none animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 bg-white">
        <input
          className="flex-grow bg-transparent outline-none text-sm sm:text-base placeholder-gray-400"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input || loading}
          className="ml-3 text-indigo-600 hover:text-indigo-800 transition text-lg disabled:opacity-30"
        >
          ✈️
        </button>
      </div>
    </div>
  );
}
