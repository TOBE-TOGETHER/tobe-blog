import { EAuthority, EFeatureCode } from '../../../global/enums';
import { URL } from '../../../routes/URL';

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
    label: 'app-header.settings.analytics',
    url: URL.ANALYTICS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  {
    label: 'app-header.settings.articles',
    url: URL.ARTICLES,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.ARTICLE_MODULE,
  },
  {
    label: 'app-header.settings.plans',
    url: URL.PLANS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.PLAN_MODULE,
  },
  {
    label: 'app-header.settings.vocabularies',
    url: URL.VOCABULARIES,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
    requiredFeature: EFeatureCode.VOCABULARY_MODULE,
  },
  {
    label: 'app-header.settings.collections',
    url: URL.COLLECTIONS,
    requiredRoles: [EAuthority.ROLE_BASIC, EAuthority.ROLE_ADMIN],
  },
  { label: 'app-header.settings.sign-out', url: URL.SIGN_OUT },
];

export const publicPages: Array<{ label: string; url: string }> = [
  { label: 'app-header.pages.home', url: URL.HOME },
  { label: 'topic.TECHNICAL', url: URL.TOPIC_TECHNICAL },
  { label: 'topic.READING', url: URL.TOPIC_READING },
  { label: 'topic.LIFE', url: URL.TOPIC_LIFE },
  { label: 'topic.LANGUAGE', url: URL.TOPIC_LANGUAGE },
];
