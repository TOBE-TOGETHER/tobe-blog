import { EAuthority, EFeatureCode } from '../../global/enums.ts';
import { URL } from '../../routes';

export const pages: Array<{
  label: string;
  url: string;
  requiredRoles?: EAuthority[];
  requiredFeature?: EFeatureCode;
}> = [
  {
    label: 'app-header.settings.profile',
    url: URL.PROFILE,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  {
    label: 'app-header.settings.my-zone',
    url: URL.MY_ZONE,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  {
    label: 'app-header.settings.plans',
    url: URL.PLANS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.PLAN_MODULE,
  },
  {
    label: 'app-header.settings.articles',
    url: URL.ARTICLES,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.ARTICLE_MODULE,
  },
  {
    label: 'app-header.settings.vocabularies',
    url: URL.VOCABULARIES,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.VOCABULARY_MODULE,
  },
  {
    label: 'app-header.settings.subjects',
    url: URL.SUBJECTS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  { label: 'app-header.settings.sign-out', url: URL.SIGN_OUT },
];

export const publicPages: Array<{ label: string; url: string }> = [
  { label: 'app-header.pages.home', url: URL.HOME },
  { label: 'app-header.pages.subject', url: URL.SUBJECTS_PAGE },
  { label: 'app-header.pages.tool', url: URL.TOOLS_PAGE },
  // { label: "app-header.pages.about", url: URL.ABOUT },
];
