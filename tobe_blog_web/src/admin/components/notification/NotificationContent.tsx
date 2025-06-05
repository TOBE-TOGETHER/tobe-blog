import {
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import { useCallback } from 'react';
import { useCommonUtils, TimeFormat } from '../../../commons';
import { INotificationDTO } from '../../../global/types';
import { getCommentContent, getOriginalCommentContent, isCommentReply, resolveNotificationMessage } from '../../../utils/notificationMetadataUtils';

interface INotificationContentProps {
  readonly notification: INotificationDTO;
  readonly onMarkAsRead: (notificationId: number) => void;
  readonly onDetailClick: (event: React.MouseEvent) => void;
}

export default function NotificationContent({ 
  notification, 
  onMarkAsRead, 
  onDetailClick 
}: INotificationContentProps) {
  const { t } = useCommonUtils();
  const theme = useTheme();

  // Use utility functions for metadata parsing
  const commentContent = getCommentContent(notification);
  const originalCommentContent = getOriginalCommentContent(notification);

  // Resolve i18n message
  const localizedMessage = resolveNotificationMessage(notification, t);

  const handleMarkAsReadClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onMarkAsRead(notification.id);
  }, [notification.id, onMarkAsRead]);

  // Consistent button styling for both buttons
  const buttonBaseStyles = {
    borderRadius: 1,
    px: 1.5,
    py: 0.5,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'none',
    minWidth: 'auto',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <Box>
      <Typography 
        variant="body2" 
        sx={{ 
          color: theme.palette.text.secondary,
          mb: commentContent ? 1 : 1.5,
          lineHeight: 1.5,
          fontSize: '0.9rem',
        }}
      >
        {localizedMessage}
      </Typography>
      
      {/* Display comment content if available - but hide for deletion notifications */}
      {commentContent && notification.notificationType !== 'COMMENT_DELETED' && notification.notificationType !== 'REPLY_DELETED' && (
        <Box sx={{ 
          mb: 1.5,
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)', // Normal background for regular comments
          borderLeft: `3px solid ${theme.palette.primary.main}`, // Blue border for regular comments
          borderRadius: 1,
        }}>
          {isCommentReply(notification) && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                fontWeight: 600,
                mb: 0.5,
                display: 'block',
                textTransform: 'uppercase',
              }}
            >
              {t('notifications.content.reply-label')}:
            </Typography>
          )}
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.primary, // Normal text color
              fontSize: '0.9rem',
              lineHeight: 1.4,
              fontStyle: 'italic',
              whiteSpace: 'pre-wrap',
            }}
          >
            "{commentContent}"
          </Typography>
        </Box>
      )}
      
      {/* Display original comment content for reply notifications - but hide for deletion types */}
      {originalCommentContent && notification.notificationType !== 'COMMENT_DELETED' && notification.notificationType !== 'REPLY_DELETED' && (
        <Box sx={{ 
          mb: 1.5,
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          borderLeft: `3px solid ${theme.palette.grey[400]}`,
          borderRadius: 1,
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
              fontWeight: 600,
              mb: 0.5,
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            {t('notifications.content.original-comment-label')}:
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontSize: '0.85rem',
              lineHeight: 1.4,
              fontStyle: 'italic',
              whiteSpace: 'pre-wrap',
            }}
          >
            "{originalCommentContent}"
          </Typography>
        </Box>
      )}
      
      {notification.relatedContentTitle && (
        <Box sx={{ 
          mb: 1.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          gap: 2,
        }}>
          {/* Action buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!notification.isRead && (
              <Button
                size="small"
                variant="text"
                onClick={handleMarkAsReadClick}
                sx={{
                  ...buttonBaseStyles,
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    transform: 'scale(1.05)',
                  },
                }}
                title={t('notifications.actions.mark-as-read')}
              >
                {t('notifications.actions.mark-as-read')}
              </Button>
            )}
            
            {notification.actionUrl && (
              <Button
                size="small"
                variant="outlined"
                onClick={onDetailClick}
                sx={buttonBaseStyles}
                title={t('notifications.actions.view-details')}
              >
                {t('notifications.actions.view-details')}
              </Button>
            )}
          </Box>
        </Box>
      )}
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mt: 1,
        pt: 1,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        {notification.senderName && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {t('notifications.content.from-label')}: <span style={{ color: theme.palette.primary.main }}>{notification.senderName}</span>
          </Typography>
        )}
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}
        >
          {TimeFormat.formatCommentDate(notification.createTime, t)}
        </Typography>
      </Box>
    </Box>
  );
} 