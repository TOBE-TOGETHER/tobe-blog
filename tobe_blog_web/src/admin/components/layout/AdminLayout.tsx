import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import AdminHeader from '../header/AdminHeader';
import SideNav from '../navigator/SideNav.tsx';

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: `${drawerWidth}px`,
    },
  }),
}));

const drawerWidth = 240;

export default function AdminLayout({ children }: Readonly<{ children: any }>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)',
      }}
    >
      <AdminHeader
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerWidth={drawerWidth}
      />
      <Main open={openDrawer}>
        <Stack
          sx={{
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </Stack>
      </Main>
      <SideNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
}
