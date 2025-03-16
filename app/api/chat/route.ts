import { NextResponse } from 'next/server';
import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  if (!DEEPSEEK_API_KEY) {
    console.error('DeepSeek API key is not configured');
    return NextResponse.json(
      { error: 'DeepSeek API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty messages array' },
        { status: 400 }
      );
    }

    // Log the request payload for debugging
    console.log('Request Payload:', {
      model: 'deepseek-chat',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Accept': 'application/json'
        },
        timeout: 60000 // 60 seconds
      }
    );

    // Log the response for debugging
    console.log('DeepSeek response status:', response.status);
    console.log('DeepSeek response data:', response.data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    // Enhanced error logging
    console.error('DeepSeek API Error:', {
      message: error.message,
      status: error.response?.status || 'No status code',
      data: error.response?.data || 'No response data',
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: {
          ...error.config?.headers,
          Authorization: 'Bearer [REDACTED]'
        }
      }
    });

    const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
    console.error('Detailed error:', errorMessage);

    return NextResponse.json(
      { 
        error: 'Failed to get response from DeepSeek',
        details: errorMessage,
        status: error.response?.status || 500
      },
      { status: error.response?.status || 500 }
    );
  }
}