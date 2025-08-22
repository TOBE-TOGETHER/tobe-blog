import React, { useState, useRef, useEffect } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ChatWindow, { ChatMessage } from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ConversationList from './components/ConversationList';
import BaseDrawer from '../../../components/common/BaseDrawer';
import { sendMessageToDeepSeekStream } from './AgentService';
import { AgentStorage, AgentConversation } from './AgentStorage';
import { useCommonUtils } from '../../../commons';

// Generate a unique conversation ID
const generateConversationId = () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const AgentPage: React.FC = () => {
  const { t } = useCommonUtils();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [conversations, setConversations] = useState<AgentConversation[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const agentStorage = new AgentStorage();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load conversations and set current conversation on mount
  useEffect(() => {
    async function loadConversations() {
      try {
        const allConversations = await agentStorage.getAllConversations();
        setConversations(allConversations);
        
        if (allConversations.length > 0) {
          // Set the most recent conversation as current
          const mostRecent = allConversations.sort((a, b) => b.updatedAt - a.updatedAt)[0];
          setCurrentConversationId(mostRecent.id);
          setMessages(mostRecent.messages);
        } else {
          // Create a new conversation if none exist
          const newConversationId = generateConversationId();
          setCurrentConversationId(newConversationId);
          setMessages([]);
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
        // Create a new conversation on error
        const newConversationId = generateConversationId();
        setCurrentConversationId(newConversationId);
        setMessages([]);
      }
    }
    loadConversations();
  }, []);

  // Save conversation whenever messages change
  useEffect(() => {
    if (currentConversationId && messages.length > 0) {
      const conversation: AgentConversation = {
        id: currentConversationId,
        messages,
        updatedAt: Date.now(),
      };
      
      agentStorage.saveConversation(conversation).catch(error => {
        console.error('Failed to save conversation:', error);
      });
      
      // Update conversations list
      setConversations(prev => {
        const existingIndex = prev.findIndex(c => c.id === currentConversationId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = conversation;
          return updated;
        } else {
          return [...prev, conversation];
        }
      });
    }
  }, [messages, currentConversationId]);

  async function handleSend() {
    if (!input.trim()) return;
    setError(null);
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      let aiContent = '';
      let aiMsgId: string | null = null;
      
      for await (const chunk of sendMessageToDeepSeekStream(
        [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        abortControllerRef.current
      )) {
        aiContent += chunk;
        
        // Only create AI message when we receive the first chunk
        if (!aiMsgId) {
          aiMsgId = `${Date.now()}-agent`;
          setMessages(prev => [
            ...prev,
            {
              id: aiMsgId!,
              role: 'agent',
              content: aiContent,
              timestamp: Date.now(),
            },
          ]);
        } else {
          // Update existing AI message
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMsgId ? { ...msg, content: aiContent } : msg
            )
          );
        }
      }
    } catch (e: any) {
      if (e.message === 'Request was cancelled') {
        // Remove the incomplete AI message if it was created
        setMessages(prev => prev.filter(msg => msg.role === 'user' || msg.content.trim() !== ''));
      } else {
        setError(e.message ?? t('agent-page.ai-error'));
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }

  function handleCancel() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  async function handleClearConversation() {
    if (window.confirm(t('agent-page.clear-confirm'))) {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      setMessages([]);
      setLoading(false);
      setError(null);
      
      try {
        await agentStorage.removeConversation(currentConversationId);
        // Remove from conversations list
        setConversations(prev => prev.filter(c => c.id !== currentConversationId));
      } catch (error) {
        console.error('Failed to clear conversation:', error);
      }
    }
  }

  async function handleCreateNewConversation() {
    const newConversationId = generateConversationId();
    setCurrentConversationId(newConversationId);
    setMessages([]);
    setError(null);
    setDrawerOpen(false);
  }

  async function handleSelectConversation(conversationId: string) {
    try {
      const conversation = await agentStorage.getConversation(conversationId);
      if (conversation) {
        setCurrentConversationId(conversationId);
        setMessages(conversation.messages);
        setError(null);
        setDrawerOpen(false);
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  }

  async function handleDeleteConversation(conversationId: string) {
    if (window.confirm(t('agent-page.delete-confirm'))) {
      try {
        await agentStorage.removeConversation(conversationId);
        setConversations(prev => prev.filter(c => c.id !== conversationId));
        
        // If we're deleting the current conversation, create a new one
        if (conversationId === currentConversationId) {
          const newConversationId = generateConversationId();
          setCurrentConversationId(newConversationId);
          setMessages([]);
          setError(null);
        }
      } catch (error) {
        console.error('Failed to delete conversation:', error);
      }
    }
  }

  return (
    <Grid container direction="column" sx={{ height: '100vh', minHeight: 0 }}>
      <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80%',
            width: '100%',
            margin: '0 auto',
            padding: '24px 16px 0 16px',
            background: '#fafbfc',
            borderRadius: 4,
            boxSizing: 'border-box',
            height: 600,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
            <Grid item>
              <Typography variant="h6" sx={{ margin: 0, color: '#333' }}>
                {t('agent-page.title')}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ListIcon />}
                  onClick={() => setDrawerOpen(true)}
                  sx={{ fontSize: '0.875rem' }}
                >
                  {t('agent-page.conversations')}
                </Button>
                {messages.length > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClearConversation}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {t('agent-page.clear-chat')}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ flex: 1, overflowY: 'auto' }} ref={chatWindowRef}>
            <ChatWindow messages={messages} />
            {loading && (
              <Grid container justifyContent="flex-start" sx={{ marginBottom: 1, px: 1 }}>
                <Grid item>
                  <Box
                    sx={{
                      background: '#f1f1f1',
                      color: '#888',
                      borderRadius: 4,
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {t('agent-page.ai-typing')}
                  </Box>
                </Grid>
              </Grid>
            )}
            {error && (
              <Grid container justifyContent="center" sx={{ marginBottom: 1, px: 1 }}>
                <Grid item>
                  <Typography sx={{ color: 'red', fontSize: '0.875rem' }}>
                    {error}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
          <Box sx={{ padding: '20px 0 20px 0', borderTop: '1px solid #eee', background: '#fafbfc' }}>
            <MessageInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              onCancel={handleCancel}
              loading={loading}
              disabled={loading}
            />
          </Box>
        </Box>
      </Grid>
      
      {/* Conversations Drawer */}
      <BaseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={t('agent-page.conversations')}
        actionButtons={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNewConversation}
            fullWidth
          >
            {t('agent-page.new-conversation')}
          </Button>
        }
      >
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </BaseDrawer>
    </Grid>
  );
};

export default AgentPage; 