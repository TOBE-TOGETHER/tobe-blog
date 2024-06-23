import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, IconButton, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import HeaderLanguageMenu from '../../../portal/components/HeaderLanguageMenu';
import theme from '../../../theme';
import HeaderUserMenu from './HeaderUserMenu';

interface BackendHeaderProps {
  setOpenDrawer: (newValue: boolean) => void;
  openDrawer: boolean;
  drawerWidth: number;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const BackendHeader = (props: BackendHeaderProps) => {
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

  return (
    <AppBar
      position="fixed"
      open={props.openDrawer}
      sx={{ boxShadow: 'none', background: 'none' }}
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
            sx={{ mr: 2, color: theme.palette.secondary.main, ...(props.openDrawer && { display: 'none' }) }}
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
            <HeaderLanguageMenu />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <HeaderUserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BackendHeader;
