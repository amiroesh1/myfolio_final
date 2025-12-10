import { NextResponse } from 'next/server';

const SYSTEM_PROMPT =
  'You are an expert education counselor. Respond only to questions about the user’s profile, applications, or studies. If the request is off-topic, reply with: "I can only help with your profile and applications." Always answer in English, be concise and actionable.';

const GEMINI_MODEL = 'gemini-pro';

export async function POST(req: Request) {
  try {
    const { messages, userId, isSubscribed } = await req.json();

    const userMessagesCount = messages.filter((m: any) => m.role === 'user').length;
    const FREE_LIMIT = 2;
    const SUBSCRIBED_LIMIT = 100;
    const currentLimit = isSubscribed ? SUBSCRIBED_LIMIT : FREE_LIMIT;

    if (!isSubscribed && userMessagesCount >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error: `You've used all ${FREE_LIMIT} free messages. Contact @sun_ansarito or @amiroesh to get ${SUBSCRIBED_LIMIT} messages.`,
          limitReached: true,
        },
        { status: 403 },
      );
    }

    if (isSubscribed && userMessagesCount >= SUBSCRIBED_LIMIT) {
      return NextResponse.json(
        {
          error: `You've used all ${SUBSCRIBED_LIMIT} monthly messages. Contact @sun_ansarito or @amiroesh to renew.`,
          limitReached: true,
        },
        { status: 403 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    ];

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          safetySettings: [
            { category: 'HARM_CATEGORY_DEROGATORY', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_VIOLENCE', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }),
      },
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error('Gemini Error:', data);
      return NextResponse.json({ error: data.error?.message || 'AI service error' }, { status: 500 });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({
      result: text,
      usageCount: userMessagesCount + 1,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
