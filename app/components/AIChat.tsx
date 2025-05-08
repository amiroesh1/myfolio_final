'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const presetQuestions = [
  "Where should I start learning?",
  "How to prepare for IELTS?",
  "What are best universities for CS?",
  "How to write a personal statement?",
  "What scholarships are available?"
];

export default function AIChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const chatRef = useRef(null);

  const FREE_LIMIT = 2;
  const SUBSCRIBED_LIMIT = 100;
  const currentLimit = isSubscribed ? SUBSCRIBED_LIMIT : FREE_LIMIT;
  const hasReachedLimit = usageCount >= currentLimit;

  useEffect(() => {
    const loadChatData = () => {
      try {
        const savedChat = localStorage.getItem('aiChatData');
        if (savedChat) {
          const { messages: savedMessages, count, isSubscribed: savedSub } = JSON.parse(savedChat);
          if (savedMessages) setMessages(savedMessages);
          if (count) setUsageCount(count);
          if (savedSub !== undefined) setIsSubscribed(savedSub);
        }
      } catch (e) {
        console.error("Failed to load chat history", e);
        localStorage.removeItem('aiChatData');
      }
    };
    loadChatData();
  }, []);

  useEffect(() => {
    if (user) {
      const subscriptionStatus = user.publicMetadata?.isSubscribed === true;
      setIsSubscribed(subscriptionStatus);
      
      const updateSubscriptionStatus = () => {
        const savedChat = localStorage.getItem('aiChatData') || '{}';
        const chatData = JSON.parse(savedChat);
        localStorage.setItem('aiChatData', JSON.stringify({
          ...chatData,
          isSubscribed: subscriptionStatus
        }));
      };
      updateSubscriptionStatus();
    } else {
      // Clear chat data when user logs out
      localStorage.removeItem('aiChatData');
      setMessages([]);
      setUsageCount(0);
      setIsSubscribed(false);
    }
  }, [user]);

  useEffect(() => {
    const saveChatData = () => {
      const chatData = {
        messages,
        count: usageCount,
        isSubscribed,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('aiChatData', JSON.stringify(chatData));
    };

    const timer = setTimeout(saveChatData, 300);
    return () => clearTimeout(timer);
  }, [messages, usageCount, isSubscribed]);

  useEffect(() => {
    if (messages.length > 0) {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async (question) => {
    if (!question.trim() || loading || hasReachedLimit) return;

    const userMsg = { role: 'user', content: question };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setLoading(true);
    setInput('');

    try {
      // Check limit again in case it changed during state updates
      if (usageCount + 1 >=  currentLimit) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: getLimitReachedMessage()
        }]);
        showLimitAlert();
        setUsageCount(currentLimit); // Set to exact limit to prevent overflow
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          userId: user?.id,
          isSubscribed
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      const data = await response.json();
      const assistantMsg = {
        role: 'assistant',
        content: formatResponse(data.result)
      };

      setMessages(prev => [...prev, assistantMsg]);
      setUsageCount(prev => prev + 1);

    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error.message || "Error sending message");
      setMessages(prev => prev.filter(m => m !== userMsg));
    } finally {
      setLoading(false);
    }
  };

  const getLimitReachedMessage = () => {
    return `You've reached the message limit (${currentLimit} ${isSubscribed ? 'premium' : 'free'} messages). Please contact us in Telegram to continue: <a href="https://t.me/sun_ansarito" target="_blank" class="text-blue-600 hover:underline">@sun_ansarito</a> or <a href="https://t.me/amiroesh" target="_blank" class="text-blue-600 hover:underline">@amiroesh</a>`;
  };

  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/## (.*?)(\n|$)/g, '<h3 class="font-bold text-lg mt-2">$1</h3>')
      .replace(/- (.*?)(\n|$)/g, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  const showLimitAlert = () => {
    toast.error(`You've reached the message limit (${currentLimit}). Contact @sun_ansarito or @amiroesh in Telegram`);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Education Advisor</h1>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isSubscribed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {isSubscribed ? 'PRO' : 'FREE'}
            </span>
            <span className="text-sm text-gray-600">
              {usageCount}/{currentLimit} messages
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="text-lg font-medium">Ask me anything about education</h3>
              <p className="mt-1">I can help with universities, tests, scholarships and more</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-4 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm text-gray-800 flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating response...
              </div>
            </div>
          )}
          {hasReachedLimit && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
                <div dangerouslySetInnerHTML={{ __html: getLimitReachedMessage() }} />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm shadow-xs transition-colors disabled:opacity-50"
                disabled={loading || hasReachedLimit}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 disabled:opacity-50"
              placeholder="Type your question..."
              disabled={loading || hasReachedLimit}
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full disabled:opacity-50 transition-colors flex items-center justify-center"
              disabled={!input.trim() || loading || hasReachedLimit}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
