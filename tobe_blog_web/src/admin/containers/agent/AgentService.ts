import server from '../../../services/server.ts';
import { ELocalStorageKeys } from '../../../global/enums.ts';

export interface AgentMessage {
  role: 'user' | 'agent';
  content: string;
}

interface AgentChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface AgentChatResponse {
  content?: string;
  model?: string;
  usage?: number;
  finishReason?: string;
  error?: string;
}

function mapRole(role: 'user' | 'agent'): 'user' | 'assistant' {
  return role === 'agent' ? 'assistant' : 'user';
}

// Stream version for dynamic output using fetch with streaming
export async function* sendMessageToDeepSeekStream(
  messages: readonly AgentMessage[],
  abortController?: AbortController
): AsyncGenerator<string, void, unknown> {
  const request: AgentChatRequest = {
    messages: messages.map(m => ({ role: mapRole(m.role), content: m.content })),
    model: 'deepseek-chat',
    temperature: 1,
    maxTokens: 4096,
  };

  try {
    // Get the base URL from the server configuration
    const baseURL = server.defaults.baseURL || window.location.origin;
    const url = `${baseURL}/v1/agent/chat/stream`;
    
    // Get the authorization token using the correct key
    const token = localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Authorization': token || '',
      },
      body: JSON.stringify(request),
      signal: abortController?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            
            if (data === '[DONE]') {
              return;
            }

            // Skip empty lines
            if (data.trim() === '') {
              continue;
            }

            // Treat all data as plain text chunks and add newline for proper formatting
            yield data + '\n';
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

  } catch (error: any) {
    console.error('Agent API error:', error);
    
    // Check if the error is due to abort
    if (error.name === 'AbortError' || error.message === 'Request was cancelled') {
      throw new Error('Request was cancelled');
    }
    
    throw new Error(error.message || 'Failed to communicate with AI service');
  }
}

// Fallback method for non-streaming requests (for backward compatibility)
export async function sendMessageToDeepSeek(messages: readonly AgentMessage[]): Promise<string> {
  const request: AgentChatRequest = {
    messages: messages.map(m => ({ role: mapRole(m.role), content: m.content })),
    model: 'deepseek-chat',
    temperature: 1,
    maxTokens: 4096,
  };

  try {
    const response = await server.post('/v1/agent/chat', request);
    const data: AgentChatResponse = response.data;
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.content || '';
  } catch (error: any) {
    console.error('Agent API error:', error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || 'Failed to communicate with AI service');
  }
} 