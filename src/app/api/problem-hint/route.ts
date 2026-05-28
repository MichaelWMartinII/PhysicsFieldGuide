import { NextRequest } from 'next/server';

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:8b';

export async function POST(req: NextRequest) {
  const { problem, attempt, unit, correct, messages = [] } = await req.json();

  const system = `You are a physics tutor helping a student work through a specific problem.

Problem: ${problem}
${attempt !== null && attempt !== '' ? `Student's current answer: ${attempt} ${unit}` : 'Student has not attempted yet.'}
${correct !== undefined ? `(The correct answer is approximately ${correct} ${unit} — do NOT reveal this directly. Guide the student to find it themselves.)` : ''}

Rules:
- Give hints and guiding questions, not the final answer
- Point out where the student's reasoning might be going wrong if they gave an attempt
- Use small steps — one concept at a time
- Be encouraging but honest
- Keep responses under 150 words unless the student needs a multi-step walkthrough
- If they explicitly ask for the answer after multiple failed attempts, you may reveal it`;

  const ollamaMessages = [
    { role: 'system', content: system },
    ...messages,
  ];

  const ollamaRes = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: ollamaMessages,
      stream: true,
      options: { temperature: 0.6, num_predict: 300 },
    }),
  });

  if (!ollamaRes.ok || !ollamaRes.body) {
    return new Response('Ollama error', { status: 502 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = ollamaRes.body!.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value, { stream: true }).split('\n').filter(Boolean);
          for (const line of lines) {
            try {
              const json = JSON.parse(line);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(json)}\n\n`));
              if (json.done) controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            } catch {}
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}
