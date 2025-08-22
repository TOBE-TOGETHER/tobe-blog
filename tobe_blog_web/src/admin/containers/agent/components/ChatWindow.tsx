import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

interface ChatWindowProps {
  readonly messages: readonly ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
      {messages.map((msg) => (
        <Grid
          container
          key={msg.id}
          justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
          sx={{ marginBottom: 1, px: 1, lineHeight: 1.5}}
          
          
        >
          <Grid item>
            <Box
              sx={{
                maxWidth: '100%',
                background: msg.role === 'user' ? '#1976d2' : '#f1f1f1',
                color: msg.role === 'user' ? '#fff' : '#222',
                borderRadius: 4,
                padding: '8px 12px',
                fontSize: '1rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              {msg.role === 'agent' ? (
                <ReactMarkdown
                  children={msg.content}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }: { children?: React.ReactNode }) => (
                      <Typography component="p" sx={{ margin: '0 0 8px 0', lineHeight: 1.3 }}>
                        {children}
                      </Typography>
                    ),
                    li: ({ children }: { children?: React.ReactNode }) => (
                      <Typography component="li" sx={{ marginLeft: 1, marginBottom: 0.125, lineHeight: 1.3 }}>
                        {children}
                      </Typography>
                    ),
                    ul: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="ul" sx={{ margin: '8px 0', paddingLeft: 2 }}>
                        {children}
                      </Box>
                    ),
                    ol: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="ol" sx={{ margin: '8px 0', paddingLeft: 2 }}>
                        {children}
                      </Box>
                    ),
                    h1: ({ children }: { children?: React.ReactNode }) => (
                      <Typography component="h1" variant="h5" sx={{ margin: '8px 0 2px 0', fontWeight: 'bold' }}>
                        {children}
                      </Typography>
                    ),
                    h2: ({ children }: { children?: React.ReactNode }) => (
                      <Typography component="h2" variant="h6" sx={{ margin: '8px 0 2px 0', fontWeight: 'bold' }}>
                        {children}
                      </Typography>
                    ),
                    h3: ({ children }: { children?: React.ReactNode }) => (
                      <Typography component="h3" variant="subtitle1" sx={{ margin: '8px 0 1px 0', fontWeight: 'bold' }}>
                        {children}
                      </Typography>
                    ),
                    strong: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="strong" sx={{ fontWeight: 'bold' }}>
                        {children}
                      </Box>
                    ),
                    em: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="em" sx={{ fontStyle: 'italic' }}>
                        {children}
                      </Box>
                    ),
                    code: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="code"
                        sx={{
                          borderRadius: 2,
                          fontFamily: 'monospace',
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    pre: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="pre"
                        sx={{
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          padding: 1,
                          borderRadius: 2,
                          overflow: 'auto',
                          margin: '8px 0',
                          fontSize: '0.9em',
                          fontFamily: 'monospace',
                          
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    blockquote: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="blockquote"
                        sx={{
                          borderLeft: '4px solid #1976d2',
                          paddingLeft: 1,
                          margin: '8px 0',
                          fontStyle: 'italic',
                          color: '#666',
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    hr: () => (
                      <Box
                        component="hr"
                        sx={{
                          border: 'none',
                          borderTop: '1px solid #ddd',
                          margin: '8px 0',
                        }}
                      />
                    ),
                    table: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="table"
                        sx={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          margin: '8px 0',
                          fontSize: '0.9em',
                          fontFamily: 'monospace',
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    thead: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="thead" sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                        {children}
                      </Box>
                    ),
                    tbody: ({ children }: { children?: React.ReactNode }) => (
                      <Box component="tbody">
                        {children}
                      </Box>
                    ),
                    tr: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="tr"
                        sx={{
                          borderBottom: '1px solid #eee',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.02)',
                          },
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    th: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="th"
                        sx={{
                          padding: '4px 6px',
                          textAlign: 'left',
                          fontWeight: 'bold',
                          borderBottom: '2px solid #ddd',
                          backgroundColor: 'rgba(0,0,0,0.05)',
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    td: ({ children }: { children?: React.ReactNode }) => (
                      <Box
                        component="td"
                        sx={{
                          padding: '4px 6px',
                          borderBottom: '1px solid #eee',
                          verticalAlign: 'top',
                        }}
                      >
                        {children}
                      </Box>
                    ),
                  }}
                />
              ) : (
                msg.content
              )}
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: '#888',
                  marginTop: 0.5,
                  textAlign: 'right',
                  display: 'block',
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ChatWindow; 