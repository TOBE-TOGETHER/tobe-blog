export enum EAuthority {
  ROLE_BASIC = 'ROLE_BASIC',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_GUEST = 'ROLE_GUEST',
}

export enum EColumnPosition {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum EDomain {
  Article = 'ARTICLE',
  Plan = 'Plan',
  Vocabulary = 'VOCABULARY',
}

export enum EFeatureCode {
  ARTICLE_MODULE = 'articleModule',
  PLAN_MODULE = 'planModule',
  VOCABULARY_MODULE = 'vocabularyModule',
}

export enum ELocalStorageKeys {
  CURRENT_USER = 'currentUser',
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  AUTHORITIES = 'authorities',
}

export enum EOperationName {
  ACTIVE = 'active',
  CLOSE = 'close',
  DELETE = 'delete',
  DETAIL = 'detail',
  RELEASE = 'release',
}
