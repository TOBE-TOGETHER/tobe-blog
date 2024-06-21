
import DomainService from './DomainService';

const ARTICLE_URI = 'v1/articles';
export const ArticleService: DomainService = new DomainService(ARTICLE_URI);

const COLLECTION_URI = 'v1/collections';
export const CollectionService: DomainService = new DomainService(COLLECTION_URI);

const PLAN_URI = 'v1/plans';
export const PlanService: DomainService = new DomainService(PLAN_URI);

const BASE_URI = 'v1/vocabularies';
export const VocabularyService: DomainService = new DomainService(BASE_URI);