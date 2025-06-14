import {
  ListItem,
  ListItemText,
  Typography,
  Box,
  useTheme,
  Divider,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { INotificationDTO } from '../../../global/types';
import NotificationContent from './NotificationContent';

interface INotificationCardProps {
  readonly notification: INotificationDTO;
  readonly onMarkAsRead: (notificationId: number) => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: INotificationCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDetailClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  }, [notification, onMarkAsRead, navigate]);

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: notification.isRead ? 'inherit' : 'rgba(25, 118, 210, 0.03)',
          borderLeft: notification.isRead ? 'none' : `4px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: notification.isRead 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(25, 118, 210, 0.08)',
          },
          py: 2.5,
          px: 3,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <ListItemText
          sx={{ pr: 2 }}
          primary={
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: notification.isRead ? 500 : 700,
                  color: theme.palette.text.primary,
                  fontSize: '1rem',
                  lineHeight: 1.3,
                  flexGrow: 1,
                }}
              >
                {notification.title}
              </Typography>
              {!notification.isRead && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    ml: 2,
                    mt: 0.5,
                    '@keyframes pulse': {
                      '0%': {
                        opacity: 1,
                      },
                      '50%': {
                        opacity: 0.5,
                      },
                      '100%': {
                        opacity: 1,
                      },
                    },
                  }}
                />
              )}
            </Box>
          }
          secondary={
            <NotificationContent
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDetailClick={handleDetailClick}
            />
          }
        />
      </ListItem>
      <Divider 
        variant="fullWidth" 
        component="li" 
        sx={{ 
          opacity: 1,
          width: '100%',
          borderStyle: 'dashed',
          borderWidth: '1px 0 0 0',
          borderColor: theme.palette.divider,
          backgroundColor: 'transparent',
          my: 0,
        }} 
      />
    </>
  );
} 