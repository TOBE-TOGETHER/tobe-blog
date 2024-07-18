import Abc from '@mui/icons-material/Abc';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FirstPage from '@mui/icons-material/FirstPage';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import Groups from '@mui/icons-material/Groups';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import { Drawer, Grid, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import config from '../../../../customization.json';
import StrokeText from '../../../components/common/StrokeText';
import { EAuthority, EFeatureCode } from '../../../global/enums';
import { IPageItem } from '../../../global/types';
import { URL } from '../../../routes/URL';
import theme from '../../../theme';
import { NavItems } from './NavItems';

const basicPageItems: IPageItem[] = [
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
    requiredFeature: EFeatureCode.COLLECTION_MODULE,
  },
];

const adminPageItems: IPageItem[] = [
  {
    label: 'dashboard-nav.pages.users',
    icon: <Groups />,
    url: URL.USERS,
    requiredRoles: [EAuthority.ROLE_ADMIN],
  },
  {
    label: 'dashboard-nav.pages.admin',
    icon: <RuleOutlinedIcon />,
    url: URL.ADMIN,
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
        <Grid
          onClick={() => navigate('/')}
          sx={{
            width: '180px',
            height: '64px',
            display: { xs: 'flex' },
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: 40,
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
