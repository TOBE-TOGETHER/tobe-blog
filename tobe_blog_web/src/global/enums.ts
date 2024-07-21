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

export enum EContentType {
  Article = 'ARTICLE',
  Plan = 'PLAN',
  Vocabulary = 'VOCABULARY',
  Collection = 'COLLECTION',
}

export enum EFeatureCode {
  ARTICLE_MODULE = 'articleModule',
  PLAN_MODULE = 'planModule',
  VOCABULARY_MODULE = 'vocabularyModule',
  COLLECTION_MODULE = 'collectionModule',
}

export enum ELocalStorageKeys {
  CURRENT_USER = 'currentUser',
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  AUTHORITIES = 'authorities',
  LIKED_CONTENTS = 'likedContents',
}

export enum EOperationName {
  ACTIVE = 'active',
  CLOSE = 'close',
  DELETE = 'delete',
  DETAIL = 'detail',
  RELEASE = 'release',
  BAN = 'ban',
  RECOMMEND = 'recommend',
}
