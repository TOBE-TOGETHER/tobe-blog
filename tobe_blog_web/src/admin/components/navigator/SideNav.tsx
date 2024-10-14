import FirstPage from '@mui/icons-material/FirstPage';
import { Drawer, Grid, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import config from '../../../../customization.json';
import StrokeText from '../../../components/common/StrokeText';
import theme from '../../../theme';
import { adminPageItems, basicPageItems } from './NavConfigs';
import { NavItems } from './NavItems';

interface ISideNavProps {
  setOpenDrawer: (newValue: boolean) => void;
  openDrawer: boolean;
  drawerWidth: number;
}

export default function SideNav(props: Readonly<ISideNavProps>) {
  const navigate = useNavigate();
  const underSmScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Drawer
      sx={{
        'width': props.drawerWidth,
        'flexShrink': 0,
        '& .MuiDrawer-paper': {
          width: props.drawerWidth,
          boxSizing: 'border-box',
          borderRadius: 0,
          borderColor: theme.palette.divider,
          boxShadow: 'none',
        },
      }}
      variant={underSmScreen ? 'temporary' : 'persistent'}
      anchor="left"
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
    >
      <DrawerHeader sx={{ background: 'transparent' }}>
        <Grid
          onClick={() => navigate('/')}
          sx={{
            width: '150px',
            height: '64px',
            ml: 3,
            display: { xs: 'flex' },
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: 34,
            fontFamily: 'Times New Roman, San Francisco, sans-serif',
          }}
        >
          <StrokeText text={config.projectName} />
        </Grid>

        <IconButton
          size="large"
          sx={{ color: theme.palette.primary.main }}
          onClick={() => props.setOpenDrawer(!props.openDrawer)}
        >
          <FirstPage />
        </IconButton>
      </DrawerHeader>
      <NavItems pageItems={basicPageItems} />
      <NavItems pageItems={adminPageItems} />
    </Drawer>
  );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
