// app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return NextResponse.json({
      reply: completion.data.choices[0].message?.content,
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json(
      { error: 'Something went wrong with AI.' },
      { status: 500 }
    );
  }
}
