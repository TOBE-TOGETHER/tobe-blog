import BaseContentService from './BaseContentService';

export const ArticleService: BaseContentService = new BaseContentService('v1/articles');
export const CollectionService: BaseContentService = new BaseContentService('v1/collections');
export const PlanService: BaseContentService = new BaseContentService('v1/plans');
export const VocabularyService: BaseContentService = new BaseContentService('v1/vocabularies');
