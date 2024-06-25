import Abc from '@mui/icons-material/Abc';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FirstPage from '@mui/icons-material/FirstPage';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import Groups from '@mui/icons-material/Groups';
import { Drawer, IconButton, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import plan from '../../../../package.json';
import { EAuthority, EFeatureCode } from '../../../global/enums.ts';
import { PageItem } from '../../../global/types';
import theme from '../../../theme';
import { URL } from '../../URL';
import { NavItems } from './NavItems';

const basicPageItems: PageItem[] = [
  {
    label: 'dashboard-nav.pages.analytics',
    icon: <DashboardIcon />,
    url: URL.ANALYTICS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  {
    label: 'dashboard-nav.pages.plans',
    icon: <FlagIcon />,
    url: URL.PLANS,
    secondaryUrl: URL.CREATE_PLAN,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.PLAN_MODULE,
  },
  {
    label: 'dashboard-nav.pages.articles',
    icon: <ArticleIcon />,
    url: URL.ARTICLES,
    secondaryUrl: URL.CREATE_ARTICLE,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.ARTICLE_MODULE,
  },
  {
    label: 'dashboard-nav.pages.vocabularies',
    icon: <Abc />,
    url: URL.VOCABULARIES,
    secondaryUrl: URL.CREATE_VOCABULARY,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.VOCABULARY_MODULE,
  },
  {
    label: 'dashboard-nav.pages.collections',
    icon: <FolderIcon />,
    url: URL.COLLECTIONS,
    secondaryUrl: URL.CREATE_COLLECTION,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
];

const adminPageItems: PageItem[] = [
  {
    label: 'dashboard-nav.pages.users',
    icon: <Groups />,
    url: URL.USERS,
    requiredRoles: [EAuthority.ROLE_ADMIN],
  },
];

interface SideNavProps {
  setOpenDrawer: (newValue: boolean) => void;
  openDrawer: boolean;
  drawerWidth: number;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function SideNav(props: SideNavProps) {
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
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate('/')}
          sx={{
            ml: 2,
            display: { xs: 'flex' },
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            cursor: 'pointer',
            color: theme.palette.primary.main,
          }}
        >
          {plan.name.toUpperCase()}
        </Typography>
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
