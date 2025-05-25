import Abc from '@mui/icons-material/Abc';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import Groups from '@mui/icons-material/Groups';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import { EAuthority, EFeatureCode } from '../../../global/enums';
import { IPageItem } from '../../../global/types';
import { URL } from '../../../routes/URL';

export const basicPageItems: IPageItem[] = [
  {
    label: 'dashboard-nav.pages.analytics',
    icon: <DashboardIcon />,
    url: URL.ANALYTICS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
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
    label: 'dashboard-nav.pages.plans',
    icon: <FlagIcon />,
    url: URL.PLANS,
    secondaryUrl: URL.CREATE_PLAN,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.PLAN_MODULE,
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

export const adminPageItems: IPageItem[] = [
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
