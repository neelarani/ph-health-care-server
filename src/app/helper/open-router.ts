import env from '@/config/env';
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: env.openRouterApiKey,
});
