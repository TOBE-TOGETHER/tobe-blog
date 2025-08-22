import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgentConversation } from '../AgentStorage';
import { useCommonUtils } from '../../../../commons';

interface ConversationListProps {
  conversations: AgentConversation[];
  currentConversationId: string;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
}) => {
  const { t } = useCommonUtils();

  const getConversationTitle = (conversation: AgentConversation) => {
    const firstUserMessage = conversation.messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      const content = firstUserMessage.content;
      return content.length > 30 ? content.substring(0, 30) + '...' : content;
    }
    return t('agent-page.new-conversation');
  };

  const getMessageCount = (conversation: AgentConversation) => {
    return conversation.messages.length;
  };

  if (conversations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {t('agent-page.no-conversations')}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {t('agent-page.no-conversations-subtitle')}
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {conversations.map((conversation, index) => (
        <React.Fragment key={conversation.id}>
          <ListItem
            disablePadding
            sx={{
              bgcolor: conversation.id === currentConversationId ? 'action.selected' : 'transparent',
              borderRadius: 1,
              mb: 0.5,
            }}
          >
            <ListItemButton
              onClick={() => onSelectConversation(conversation.id)}
              sx={{
                borderRadius: 1,
                pr: 6, // Add right padding to make room for delete button
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: conversation.id === currentConversationId ? 600 : 400,
                        flex: 1,
                        minWidth: 0, // Allow text to shrink
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {getConversationTitle(conversation)}
                    </Typography>
                    <Chip
                      label={getMessageCount(conversation)}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        fontSize: '0.75rem', 
                        height: 20,
                        minWidth: 'auto',
                        flexShrink: 0, // Prevent chip from shrinking
                      }}
                    />
                  </Box>
                }
              />
            </ListItemButton>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label={t('agent-page.delete')}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                size="small"
                sx={{ 
                  color: 'error.main',
                  mr: 0.5, // Add margin to separate from edge
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < conversations.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ConversationList; 