import BaseContentService from './BaseContentService';

const ARTICLE_URI = 'v1/articles';
export const ArticleService: BaseContentService = new BaseContentService(ARTICLE_URI);

const COLLECTION_URI = 'v1/collections';
export const CollectionService: BaseContentService = new BaseContentService(COLLECTION_URI);

const PLAN_URI = 'v1/plans';
export const PlanService: BaseContentService = new BaseContentService(PLAN_URI);

const BASE_URI = 'v1/vocabularies';
export const VocabularyService: BaseContentService = new BaseContentService(BASE_URI);
