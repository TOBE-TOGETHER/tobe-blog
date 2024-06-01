import { AUTHORITY, AuthorityKey, FEATURE_CODE, FeatureCodeKey } from '../../commons';
import { URL } from '../../routes';

export const pages: Array<{
  label: string;
  url: string;
  requiredRoles?: AuthorityKey[];
  requiredFeature?: FeatureCodeKey;
}> = [
  {
    label: 'app-header.settings.profile',
    url: URL.PROFILE,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: 'app-header.settings.my-zone',
    url: URL.MY_ZONE,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: 'app-header.settings.projects',
    url: URL.PROJECTS,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
    requiredFeature: FEATURE_CODE.PROJECT_MODULE,
  },
  {
    label: 'app-header.settings.articles',
    url: URL.ARTICLES,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
    requiredFeature: FEATURE_CODE.ARTICLE_MODULE,
  },
  {
    label: 'app-header.settings.vocabularies',
    url: URL.VOCABULARIES,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
    requiredFeature: FEATURE_CODE.VOCABULARY_MODULE,
  },
  {
    label: 'app-header.settings.subjects',
    url: URL.SUBJECTS,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  { label: 'app-header.settings.sign-out', url: URL.SIGN_OUT },
];

export const publicPages: Array<{ label: string; url: string }> = [
  { label: 'app-header.pages.home', url: URL.HOME },
  { label: 'app-header.pages.subject', url: URL.SUBJECTS_PAGE },
  { label: 'app-header.pages.tool', url: URL.TOOLS_PAGE },
  // { label: "app-header.pages.about", url: URL.ABOUT },
];
