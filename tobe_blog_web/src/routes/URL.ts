export const URL = {
  HOME: "/",
  PERSONAL_PORTAL: "/personal-portal/:id",
  SIGN_IN: "/sign-in",
  SIGN_OUT: "/sign-out",
  SIGN_UP: "/sign-up",
  ARTICLE: "/article",
  ABOUT: "/about",
  NEWS_PROJECT_DETAIL: "/news/projects/:id",
  NEWS_ARTICLE_DETAIL: "/news/articles/:id",
  NEWS_VOCABULARY_DETAIL: "/news/vocabularies/:id",

  SUBJECTS_PAGE: "/subjects",
  SUBJECT_READING_PAGE: "/subjects/:id",

  TOOLS_PAGE: "/tools",
  TOOL_POMODORO: "/tools/pomodoro",
  TOOL_TIME_CONVERTER: "/tools/time-coverter",

  MY_ZONE: "/my/statistics",
  STATISTICS: "/my/statistics",
  PROFILE: "/my/profile",
  USERS: "/my/users",
  PROJECTS: "/my/projects",
  PROJECT_DETAIL: "/my/projects/:id",
  CREATE_PROJECT: "/my/projects/create-project",

  ARTICLES: "/my/articles",
  ARTICLE_DETAIL: "/my/articles/:id",
  CREATE_ARTICLE: "/my/articles/create-article",

  CREATE_SUBJECT: "/my/subjects/create-subject",
  SUBJECT_DETAIL: "/my/subjects/:id",
  SUBJECTS: "/my/subjects",

  CREATE_VOCABULARY: "/my/vocabularies/create-vocabularies",
  VOCABULARY_DETAIL: "/my/vocabularies/:id",
  VOCABULARIES: "/my/vocabularies",
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) >= 0;
}
