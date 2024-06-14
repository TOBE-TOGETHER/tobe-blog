import Abc from '@mui/icons-material/Abc';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import Groups from '@mui/icons-material/Groups';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import plan from '../../../../package.json';
import {
  EAuthority,
  EFeatureCode,
} from '../../../global/enums.ts';
import { PageItem } from '../../../global/types';
import theme from '../../../theme';
import { URL } from '../../URL';
import { NavItems } from './NavItems';

const basicPageItems: PageItem[] = [
  {
    label: 'dashboard-nav.pages.statistics',
    icon: <DashboardIcon />,
    url: URL.STATISTICS,
    requiredRoles: [
      EAuthority.ROLE_BASIC,
      EAuthority.ROLE_ADMIN,
    ],
  },
  {
    label: 'dashboard-nav.pages.plans',
    icon: <FlagIcon />,
    url: URL.PLANS,
    secondaryUrl: URL.CREATE_PLAN,
    requiredRoles: [
      EAuthority.ROLE_BASIC,
      EAuthority.ROLE_ADMIN,
    ],
    requiredFeature: EFeatureCode.PLAN_MODULE,
  },
  {
    label: 'dashboard-nav.pages.articles',
    icon: <ArticleIcon />,
    url: URL.ARTICLES,
    secondaryUrl: URL.CREATE_ARTICLE,
    requiredRoles: [
      EAuthority.ROLE_BASIC,
      EAuthority.ROLE_ADMIN,
    ],
    requiredFeature: EFeatureCode.ARTICLE_MODULE,
  },
  {
    label: 'dashboard-nav.pages.vocabularies',
    icon: <Abc />,
    url: URL.VOCABULARIES,
    secondaryUrl: URL.CREATE_VOCABULARY,
    requiredRoles: [
      EAuthority.ROLE_BASIC,
      EAuthority.ROLE_ADMIN,
    ],
    requiredFeature: EFeatureCode.VOCABULARY_MODULE,
  },
  {
    label: 'dashboard-nav.pages.subjects',
    icon: <FolderIcon />,
    url: URL.SUBJECTS,
    secondaryUrl: URL.CREATE_SUBJECT,
    requiredRoles: [
      EAuthority.ROLE_BASIC,
      EAuthority.ROLE_ADMIN,
    ],
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
        width: props.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: props.drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant={underSmScreen ? 'temporary' : 'persistent'}
      anchor="left"
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
    >
      <DrawerHeader sx={{ backgroundColor: theme.palette.primary.main }}>
        <IconButton onClick={() => props.setOpenDrawer(!props.openDrawer)}>
          <MenuOpenIcon
            sx={{
              color: '#fff',
              border: '1.5px solid #fff',
              borderRadius: 2,
              fontSize: '2rem',
              p: '3px',
              '&:hover': {
                background: 'grey',
              },
            }}
          />
        </IconButton>
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
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {plan.name.toUpperCase()}
        </Typography>
      </DrawerHeader>
      <NavItems pageItems={basicPageItems} />
      <NavItems pageItems={adminPageItems} />
    </Drawer>
  );
}
