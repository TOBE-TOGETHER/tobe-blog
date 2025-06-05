import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Container, IconButton, Toolbar, Badge } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { HeaderLanguageMenu, HeaderUserMenu } from '../../../components/layout';
import * as NotificationService from '../../../services/NotificationService';
import theme from '../../../theme';
import { NotificationsDrawer } from '..';

interface IAdminHeaderProps {
  setOpenDrawer: (newValue: boolean) => void;
  openDrawer: boolean;
  drawerWidth: number;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AdminHeader = (props: IAdminHeaderProps) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
      marginLeft: `${props.drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await NotificationService.getUnreadCount();
        setUnreadCount(response.data);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();
    
    // Set up polling for unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      open={props.openDrawer}
      sx={{ background: theme.palette.background.default, opacity: 0.8 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="small"
            aria-label="open dashboard side navigator"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => props.setOpenDrawer(!props.openDrawer)}
            edge="start"
            sx={{ mr: 2, color: theme.palette.primary.main, ...(props.openDrawer && { display: 'none' }) }}
          >
            <MenuIcon
              sx={{
                borderRadius: 2,
                fontSize: '2rem',
              }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="small"
              aria-label="view notifications"
              onClick={handleNotificationClick}
              sx={{ color: theme.palette.primary.main }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon sx={{ fontSize: '1.5rem' }} />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <HeaderLanguageMenu />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <HeaderUserMenu />
          </Box>
        </Toolbar>
      </Container>
      <NotificationsDrawer 
        open={notificationsOpen} 
        onClose={handleNotificationsClose} 
      />
    </AppBar>
  );
};

export default AdminHeader;
