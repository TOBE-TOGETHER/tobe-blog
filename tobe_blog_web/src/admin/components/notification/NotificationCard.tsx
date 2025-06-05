import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import { useCallback } from 'react';
import { useCommonUtils } from '../../../commons';
import { INotificationDTO } from '../../../global/types';
import NotificationContent from './NotificationContent';
import { resolveNotificationTitle } from '../../../utils/notificationMetadataUtils';

interface INotificationCardProps {
  readonly notification: INotificationDTO;
  readonly onMarkAsRead: (notificationId: number) => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: INotificationCardProps) {
  const theme = useTheme();
  const { t } = useCommonUtils();

  const handleDetailClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  }, [notification.actionUrl]);

  // Resolve i18n title
  const localizedTitle = resolveNotificationTitle(notification, t);

  return (
    <>
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: notification.isRead 
            ? 'transparent' 
            : theme.palette.action.hover,
          transition: 'background-color 0.2s ease-in-out',
          py: 2,
          px: 3,
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
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
                {localizedTitle}
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