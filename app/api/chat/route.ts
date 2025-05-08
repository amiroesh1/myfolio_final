import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an expert education counselor specializing in:

1. University admissions (US, UK, Canada, Europe, Asia)
2. Standardized tests (IELTS, TOEFL, SAT, ACT, GRE, GMAT)
3. Application strategies (essays, recommendations, extracurriculars)
4. Scholarship and financial aid opportunities

Response Guidelines:
1. Always ask clarifying questions if request is vague
2. Provide step-by-step actionable advice
3. Recommend specific resources (books, courses, websites)
4. Use professional but friendly tone
5. Format responses clearly:

**Section Headers**
- Bullet points
*Important notes*
[Relevant links](https://example.com)

Example Response:
---
**For Harvard Admission:**

1. *Requirements*:
   - SAT: 1500+ (75th percentile)
   - GPA: 3.9+ unweighted
   - 2-3 AP exams with score 5

2. *Application Timeline*:
   - June-August: Prepare materials
   - September: Request recommendations
   - October: Finalize essays
   - November 1: Early Action deadline

[Official Admissions Page](https://college.harvard.edu/admissions)
---
`;

export async function POST(req: Request) {
  try {
    const { messages, userId, isSubscribed } = await req.json();

    // Подсчет уже отправленных пользователем сообщений в этом чате
    const userMessagesCount = messages.filter(m => m.role === 'user').length;
    
    // Установка лимитов
    const FREE_LIMIT = 2;
    const SUBSCRIBED_LIMIT = 100;
    const currentLimit = isSubscribed ? SUBSCRIBED_LIMIT : FREE_LIMIT;

    // Проверка лимитов
    if (!isSubscribed && userMessagesCount >= FREE_LIMIT) {
      return NextResponse.json(
        { 
          error: `You've used all ${FREE_LIMIT} free messages. Contact @sun_ansarito or @amiroesh to get ${SUBSCRIBED_LIMIT} messages.`,
          limitReached: true
        },
        { status: 403 }
      );
    }

    // Если подписка есть, но достигнут лимит подписки
    if (isSubscribed && userMessagesCount >= SUBSCRIBED_LIMIT) {
      return NextResponse.json(
        { 
          error: `You've used all ${SUBSCRIBED_LIMIT} monthly messages. Contact @sun_ansarito or @amiroesh to renew.`,
          limitReached: true 
        },
        { status: 403 }
      );
    }

    // Запрос к OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
        user: userId // Передаем ID пользователя в OpenAI для мониторинга
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error('OpenAI Error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'AI service error' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      result: data.choices[0]?.message?.content,
      usageCount: userMessagesCount + 1 // Возвращаем обновленный счетчик
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
