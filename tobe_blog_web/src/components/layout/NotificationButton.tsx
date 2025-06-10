import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, SxProps } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '../../contexts';
import * as NotificationService from '../../services/NotificationService';
import theme from '../../theme';
import NotificationsDrawer from '../notification/NotificationsDrawer';

interface NotificationButtonProps {
  /**
   * Size of the icon button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom styles for the IconButton
   */
  sx?: SxProps;
  /**
   * Whether to show the notification button (if not specified, will show based on auth state)
   */
  show?: boolean;
}

const NotificationButton = ({ 
  size = 'large', 
  sx,
  show 
}: NotificationButtonProps) => {
  const authContext = useAuthState();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Determine if the button should be shown
  const shouldShow = show !== undefined ? show : !!authContext.user;

  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  // Function to fetch and update unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!shouldShow) {
      return;
    }

    try {
      const response = await NotificationService.getUnreadCount();
      setUnreadCount(response.data);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  }, [shouldShow]);

  // Callback function to refresh unread count from drawer
  const handleUnreadCountUpdate = useCallback(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Fetch unread notification count when user is logged in
  useEffect(() => {
    if (!shouldShow) {
      return;
    }

    fetchUnreadCount();
    
    // Set up polling for unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, [shouldShow, fetchUnreadCount]);

  // Don't render anything if not supposed to show
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <IconButton
        size={size}
        aria-label="view notifications"
        onClick={handleNotificationClick}
        sx={{
          color: theme.palette.primary.main,
          ...sx,
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ fontSize: size === 'small' ? '1.5rem' : '1.5rem' }} />
        </Badge>
      </IconButton>
      
      <NotificationsDrawer 
        open={notificationsOpen} 
        onClose={handleNotificationsClose}
        onUnreadCountUpdate={handleUnreadCountUpdate}
      />
    </>
  );
};

export default NotificationButton; 