
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

  SUBJECTS_PAGE: '/collections',
  SUBJECT_READING_PAGE: '/collections/:id',

  TOOLS_PAGE: '/tools',
  TOOL_POMODORO: '/tools/pomodoro',
  TOOL_TIME_CONVERTER: '/tools/time-coverter',
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) >= 0;
}