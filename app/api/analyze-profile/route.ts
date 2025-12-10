import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // pdf-parse requires Node environment

const SYSTEM_PROMPT = `
You are MyFolio's AI Analyzer for international students.

Your tasks:
1) Read the student's profile (text from PDF or user input).
2) Identify strengths, weaknesses/gaps, and give 3–7 actionable recommendations tailored to international applicants.
3) Rate profile from 0–10 (Profile Score).
4) Recommend 3–8 relevant programs (research, summer, pre-college, online/extracurricular). Only pick from the provided metadata; prefer programs that accept international students. Justify briefly.
5) Be concise and structured.

Output strict JSON with keys:
{
  "summary": "2-4 sentences",
  "strengths": ["bullet", ...],
  "weaknesses": ["bullet", ...],
  "recommendations": ["bullet", ...],
  "profile_score": number (0-10),
  "suggested_programs": [
    { "name": "string", "type": "research|summer|precollege|extracurricular", "reason": "1-2 sentences" }
  ]
}

If info is missing, say so briefly. Do NOT include any text outside JSON.
`;

async function loadActivitiesMeta() {
  const activitiesPath = path.join(process.cwd(), 'app', 'data', 'activities.json');
  try {
    const raw = await fs.readFile(activitiesPath, 'utf-8');
    const data = JSON.parse(raw);
    return data.slice(0, 30).map((item: any) => ({
      name: item.title || item.name || 'Activity',
      type: 'extracurricular',
      accepts_international: true,
      difficulty: item.financialRating?.toLowerCase().includes('paid') ? 'medium' : 'medium',
    }));
  } catch {
    return [];
  }
}

async function buildProgramMetadata() {
  const extracurriculars = await loadActivitiesMeta();
  // Placeholders for other tables if not present
  const research_programs: any[] = [
    { name: 'Pioneer Academics', type: 'research', accepts_international: true, difficulty: 'high' },
    { name: 'Lumiere Research Scholar Program', type: 'research', accepts_international: true, difficulty: 'high' },
  ];
  const summer_programs: any[] = [
    { name: 'MITES (online tracks)', type: 'summer', accepts_international: true, difficulty: 'high' },
    { name: 'YYGS', type: 'summer', accepts_international: true, difficulty: 'high' },
  ];
  const precollege_programs: any[] = [
    { name: 'Harvard Pre-College (online)', type: 'precollege', accepts_international: true, difficulty: 'high' },
    { name: 'Stanford Summer (online)', type: 'precollege', accepts_international: true, difficulty: 'high' },
  ];

  return {
    extracurriculars,
    research_programs,
    summer_programs,
    precollege_programs,
  };
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Use multipart/form-data with file or text' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const textInput = (formData.get('text') as string | null)?.toString().trim();

    let userText = '';

    if (file && file.size > 0) {
      if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'PDF too large (max 5MB)' }, { status: 400 });
      }
      const pdf: any = (await import('pdf-parse')).default || (await import('pdf-parse'));
      const buffer = Buffer.from(await file.arrayBuffer());
      const parsed = await pdf(buffer);
      userText = parsed.text.trim();
    } else if (textInput) {
      userText = textInput;
    }

    if (!userText) {
      return NextResponse.json({ error: 'Provide a PDF or text input' }, { status: 400 });
    }

    // Limit text length to avoid excessive tokens
    if (userText.length > 12000) {
      userText = userText.slice(0, 12000);
    }

    const programMetadata = await buildProgramMetadata();

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: JSON.stringify({
              profile_text: userText,
              programs: programMetadata,
            }),
          },
        ],
        temperature: 0.3,
        max_tokens: 900,
      }),
    });

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      console.error('OpenAI error', data);
      return NextResponse.json({ error: data.error?.message || 'AI service error' }, { status: 500 });
    }

    const raw = data.choices?.[0]?.message?.content;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = null;
    }

    return NextResponse.json({
      ok: true,
      result: parsed || { raw },
    });
  } catch (error) {
    console.error('Analyze-profile error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

