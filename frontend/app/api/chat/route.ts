import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const { messages, documentIds } = json;
    const chatId = json.chatId || 'default-chat-id';

    const userMessage = messages[messages.length - 1];
    
    // Fetch uploaded documents if any
    let documentContext = "";
    if (documentIds && documentIds.length > 0) {
      const docs = await prisma.document.findMany({
        where: { id: { in: documentIds } }
      });
      for (const doc of docs) {
        documentContext += `\n\n--- Document: ${doc.name} ---\n${doc.content}\n--- End of Document ---\n\n`;
      }
    }
    
    // Create combined prompt for backend
    const combinedMessage = documentContext ? `${documentContext}\n\nUser Question:\n${userMessage.content}` : userMessage.content;

    
    // Create chat if it doesn't exist
    const chat = await prisma.chat.upsert({
      where: { id: chatId },
      update: {},
      create: {
        id: chatId,
        userId: session.user.id,
        title: userMessage.content.substring(0, 50) + '...',
      }
    });

    // Save the user message
    await prisma.message.create({
      data: {
        role: 'user',
        content: userMessage.content,
        chatId: chat.id
      }
    });

    // Forward to Python backend
    const chatHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'chatbot' : 'user',
      content: msg.content
    }));

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:5001';
    
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: combinedMessage,
        chat_history: chatHistory
      })
    });

    if (!response.ok) {
      throw new Error(`Python backend failed: ${response.statusText}`);
    }

    const data = await response.json();
    const botReply = data.response;

    // Save the assistant's response
    await prisma.message.create({
      data: {
        role: 'assistant',
        content: botReply,
        chatId: chat.id
      }
    });

    // Return as a standard JSON response (not a stream)
    return new Response(JSON.stringify({ response: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return new Response(error.message || String(error), {
      status: 500,
    });
  }
}
