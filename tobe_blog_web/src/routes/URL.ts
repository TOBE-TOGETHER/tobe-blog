export const URL = {
  HOME: '/',
  PERSONAL_PORTAL: '/personal-portal/:id',
  SIGN_IN: '/sign-in',
  SIGN_OUT: '/sign-out',
  SIGN_UP: '/sign-up',
  ARTICLE: '/article',
  ABOUT: '/about',
  NEWS_PLAN_DETAIL: '/news/plans/:id',
  NEWS_ARTICLE_DETAIL: '/news/articles/:id',
  NEWS_VOCABULARY_DETAIL: '/news/vocabularies/:id',
  NEWS_COLLECTION_DETAIL: '/news/collections/:id',

  TOOLS_PAGE: '/tools',
  TOOL_POMODORO: '/tools/pomodoro',
  TOOL_TIME_CONVERTER: '/tools/time-coverter',

  ANALYTICS: '/my/analytics',
  PROFILE: '/my/profile',
  USERS: '/my/users',
  ADMIN: '/my/admin',

  CREATE_PLAN: '/my/plans/create-plan',
  PLAN_DETAIL: '/my/plans/:id',
  PLANS: '/my/plans',

  CREATE_ARTICLE: '/my/articles/create-article',
  ARTICLE_DETAIL: '/my/articles/:id',
  ARTICLES: '/my/articles',

  CREATE_COLLECTION: '/my/collections/create-collection',
  COLLECTION_DETAIL: '/my/collections/:id',
  COLLECTIONS: '/my/collections',

  CREATE_VOCABULARY: '/my/vocabularies/create-vocabularies',
  VOCABULARY_DETAIL: '/my/vocabularies/:id',
  VOCABULARIES: '/my/vocabularies',
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) >= 0;
}
