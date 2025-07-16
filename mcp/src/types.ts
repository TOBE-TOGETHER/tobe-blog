/**
 * TypeScript interfaces matching the Java DTOs from the Tobe Blog backend service
 */

// Enums
export enum ContentType {
  ARTICLE = 'ARTICLE',
  PLAN = 'PLAN',
  VOCABULARY = 'VOCABULARY',
  COLLECTION = 'COLLECTION'
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export enum Topic {
  READING = 'READING',
  LANGUAGE = 'LANGUAGE',
  TECHNICAL = 'TECHNICAL',
  LIFE = 'LIFE',
  OTHER = 'OTHER'
}

export enum Role {
  BASIC = 'ROLE_BASIC',
  ADMIN = 'ROLE_ADMIN'
}

// Base interfaces
export interface TagInfoDTO {
  id?: number;
  value: string;
  active?: boolean;
}

export interface BaseContentDTO {
  id: string;
  title: string;
  description: string;
  coverImgUrl?: string;
  publicToAll: boolean;
  publishTime?: string;
  viewCount: number;
  likeCount: number;
  ownerId: number;
  ownerName: string;
  avatarUrl?: string;
  contentType: ContentType;
  contentProtected: boolean;
  tags: TagInfoDTO[];
  topic: Topic;
  createTime: string;
  updateTime: string;
  banned: boolean;
  recommended: boolean;
  reason?: string;
}

export interface BaseContentCreationDTO {
  title: string;
  description: string;
  coverImgUrl?: string;
  contentProtected: boolean;
  tags: TagInfoDTO[];
  topic: Topic;
}

export interface BaseContentUpdateDTO {
  id: string;
  title: string;
  description: string;
  coverImgUrl?: string;
  contentProtected: boolean;
  tags: TagInfoDTO[];
  topic: Topic;
}

export interface ContentBasicInfoDTO {
  id: string;
  contentType: ContentType;
  publicToAll: boolean;
  banned: boolean;
}

export interface ContentVisibilityUpdateDTO {
  id: string;
  visibility: Visibility;
}

// Article interfaces
export interface ArticleDTO extends BaseContentDTO {
  subTitle?: string;
  content: string;
}

export interface ArticleCreationDTO extends BaseContentCreationDTO {
  subTitle?: string;
  content: string;
}

export interface ArticleUpdateDTO extends BaseContentUpdateDTO {
  subTitle?: string;
  content: string;
}

// Plan interfaces
export interface PlanDTO extends BaseContentDTO {
  targetStartTime?: string;
  targetEndTime?: string;
}

export interface PlanCreationDTO extends BaseContentCreationDTO {
  targetStartTime?: string;
  targetEndTime?: string;
}

export interface PlanUpdateDTO extends BaseContentUpdateDTO {
  targetStartTime?: string;
  targetEndTime?: string;
}

export interface PlanProgressDTO {
  id: string;
  planId: string;
  title: string;
  description?: string;
  completed: boolean;
  targetDate?: string;
  completedDate?: string;
  createTime: string;
  updateTime: string;
}

export interface PlanProgressCreationDTO {
  planId: string;
  title: string;
  description?: string;
  targetDate?: string;
}

export interface PlanProgressUpdateDTO {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  targetDate?: string;
  completedDate?: string;
}

// Vocabulary interfaces
export interface VOCDTO extends BaseContentDTO {
  language: string;
}

export interface VOCCreationDTO extends BaseContentCreationDTO {
  language: string;
}

export interface VOCUpdateDTO extends BaseContentUpdateDTO {
  language: string;
}

export interface WordDTO {
  id: number;
  vocabularyId: string;
  text: string;
  meaningInChinese?: string;
  meaningInEnglish?: string;
  partOfSpeech?: string;
  createTime: string;
  updateTime: string;
}

export interface WordCreationDTO {
  vocabularyId: string;
  text: string;
  meaningInChinese?: string;
  meaningInEnglish?: string;
  partOfSpeech?: string;
}

export interface WordUpdateDTO {
  id: number;
  text: string;
  meaningInChinese?: string;
  meaningInEnglish?: string;
  partOfSpeech?: string;
}

// Content admin interfaces
export interface ContentAdminDTO {
  contentId: string;
  banned: boolean;
  recommended: boolean;
  reason?: string;
}

// Search and pagination interfaces
export interface BaseSearchFilter {
  status?: string;
  createFrom?: string;
  createTo?: string;
  updateFrom?: string;
  updateTo?: string;
  tags?: string[];
  keyword?: string;
  topic?: Topic;
}

export interface PageResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// API configuration
export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
} 