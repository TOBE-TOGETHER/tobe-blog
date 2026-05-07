#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { TobeBlogApiClient } from './api-client.js';
import { createContentTools } from './tools.js';
import { ToolHandlers } from './tool-handlers.js';

const SERVER_NAME = 'tobe-blog-content-mcp-server';
const SERVER_VERSION = '1.0.0';

// Configuration
const DEFAULT_BASE_URL = 'http://localhost:8081';
const DEFAULT_TIMEOUT = 30000;

interface ServerConfig {
  baseURL?: string;
  timeout?: number;
  authToken?: string;
}

function getServerConfig(): ServerConfig {
  return {
    baseURL: process.env.TOBE_BLOG_BASE_URL || DEFAULT_BASE_URL,
    timeout: process.env.TOBE_BLOG_TIMEOUT ? parseInt(process.env.TOBE_BLOG_TIMEOUT) : DEFAULT_TIMEOUT,
    authToken: process.env.TOBE_BLOG_AUTH_TOKEN
  };
}

async function main() {
  const config = getServerConfig();
  
  // Initialize API client
  const apiClient = new TobeBlogApiClient({
    baseURL: config.baseURL || DEFAULT_BASE_URL,
    timeout: config.timeout,
    headers: config.authToken ? {
      'Authorization': `Bearer ${config.authToken}`
    } : {}
  });

  // Initialize tool handlers
  const toolHandlers = new ToolHandlers(apiClient);

  // Create and configure the server
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Get the tools
  const tools = createContentTools(apiClient);

  // Set up tool list handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: tools
    };
  });

  // Set up tool call handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return await toolHandlers.handleToolCall(request);
  });

  // Connect server to transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`Tobe Blog Content MCP Server running on ${config.baseURL}`);
  console.error(`Available tools: ${tools.length}`);
  console.error('Server ready to handle requests...');
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.error('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 