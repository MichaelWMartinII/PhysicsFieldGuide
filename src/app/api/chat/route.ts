import { NextRequest } from 'next/server';

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:8b';

const SYSTEM = (topic: string) => `You are a concise, clear physics and mathematics tutor.
The student is currently studying: ${topic}.
Give focused, accurate explanations. Use math notation when helpful (write it inline, e.g. F = ma).
Keep responses under 200 words unless the question requires more depth.
Be encouraging but efficient.`;

export async function POST(req: NextRequest) {
  const { messages, topic } = await req.json();

  const ollamaMessages = [
    { role: 'system', content: SYSTEM(topic ?? 'physics') },
    ...messages,
  ];

  const ollamaRes = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: ollamaMessages,
      stream: true,
      options: { temperature: 0.7, num_predict: 512 },
    }),
  });

  if (!ollamaRes.ok || !ollamaRes.body) {
    return new Response('Ollama error', { status: 502 });
  }

  // Transform Ollama's NDJSON stream into SSE
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
              if (json.done) {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              }
            } catch {}
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
