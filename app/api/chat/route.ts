import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { configs } from '@/constants/configs';
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: configs.groqKey,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, stream } = await req.json();

  const streamFlag = stream !== undefined ? stream : true;

  const response: any = await openai.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    stream: streamFlag,
    messages,
  });

  if (stream !== undefined) {
    return Response.json(response);
  }
  const responseStream = OpenAIStream(response);
  return new StreamingTextResponse(responseStream);
}
