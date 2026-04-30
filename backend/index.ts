import express from 'express';

import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { tavily } from '@tavily/core';
import cors from 'cors';
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from './prompt';
import { middleware } from './middleware';
import { prisma } from './db';
import type { Message } from './generated/prisma/client';

declare module "express-serve-static-core" {
    interface Request {
        userId: string;
    }
}

const client = tavily({ apiKey: process.env.Tavily_API_KEY });
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));



// GET /conversations - list all conversations for the authenticated user
app.get('/conversations', middleware, async (req, res) => {
  const userId = req.userId;

  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      _count: { select: { messages: true } },
    },
  });

  res.json({ conversations });
});

// GET /conversations/:conversationId - get a single conversation with its messages
app.get('/conversations/:conversationId', middleware, async (req, res) => {
  const userId = req.userId;
  const conversationId = req.params.conversationId as string;

  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId },   // userId check prevents accessing other users' convos
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  res.json({ conversation });
});


app.post('/perplexity_ask', middleware, async (req, res) => {
  const userId = req.userId;
  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  const webSearchResponse = await client.search(query, {
    searchDepth: 'advanced',
  });

  const webSearchResults = webSearchResponse.results;

  const prompt = PROMPT_TEMPLATE.replace(
    '{{WEB_SEARCH_RESULTS}}',
    JSON.stringify(webSearchResults),
  ).replace('{{USER_QUERY}}', query);

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system: SYSTEM_PROMPT,
  });

  res.header('Cache-Control', 'no-cache');
  res.header('Content-Type', 'text/event-stream');

  let fullResponse = '';
  for await (const textPart of result.textStream) {
    fullResponse += textPart;
    res.write(textPart);
  }

  const sourcesString = JSON.stringify(webSearchResults.map((item) => ({ url: item.url, title: item.title })));
  const sourcesPart = `\n<SOURCES>\n${sourcesString}\n</SOURCES>\n`;
  res.write(sourcesPart);

  // Persist to DB
  try {
    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title: query.slice(0, 50),
        slug: `${query.slice(0, 50).toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      }
    });

    res.write(`\n<CONVERSATION_ID>\n${conversation.id}\n</CONVERSATION_ID>\n`);

    await prisma.message.createMany({
      data: [
        {
          conversationId: conversation.id,
          content: query,
          role: 'User',
        },
        {
          conversationId: conversation.id,
          content: fullResponse + sourcesPart,
          role: 'Assistant',
        }
      ]
    });
  } catch (e) {
    console.error('Failed to persist conversation:', e);
  }
  res.end();
});

// POST /perplexity_ask/follow_up - follow-up question in an existing conversation
app.post('/perplexity_ask/follow_up', middleware, async (req, res) => {
  const userId = req.userId;
  const { query, conversationId } = req.body;

  if (!query || !conversationId) {
    return res.status(400).json({ message: 'query and conversationId are required' });
  }

  // Verify conversation belongs to this user
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  // Web search for the follow-up query
  const webSearchResponse = await client.search(query, { searchDepth: 'advanced' });
  const webSearchResults = webSearchResponse.results;

  // Build prompt with prior conversation context
  const history = conversation.messages
    .map((m: Message) => `${m.role}: ${m.content}`)
    .join('\n\n');

  const prompt = `Previous conversation:\n${history}\n\n` +
    PROMPT_TEMPLATE
      .replace('{{WEB_SEARCH_RESULTS}}', JSON.stringify(webSearchResults))
      .replace('{{USER_QUERY}}', query);

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system: SYSTEM_PROMPT,
  });

  res.header('Cache-Control', 'no-cache');
  res.header('Content-Type', 'text/event-stream');

  let fullResponse = '';
  for await (const textPart of result.textStream) {
    fullResponse += textPart;
    res.write(textPart);
  }

  const sourcesString = JSON.stringify(
    webSearchResults.map((item) => ({ url: item.url, title: item.title }))
  );
  const sourcesPart = `\n<SOURCES>\n${sourcesString}\n</SOURCES>\n`;
  res.write(sourcesPart);

  // Persist the new messages to the existing conversation
  try {
    await prisma.message.createMany({
      data: [
        { conversationId, content: query, role: 'User' },
        { conversationId, content: fullResponse + sourcesPart, role: 'Assistant' },
      ],
    });
  } catch (e) {
    console.error('Failed to persist follow-up messages:', e);
  }

  res.end();
});

app.listen(3001, () => {
  console.log('server started at http://localhost:' +  3001);
});




